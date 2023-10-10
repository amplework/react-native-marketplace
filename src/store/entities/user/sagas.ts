import AsyncStorage from '@react-native-async-storage/async-storage';
import { PayloadAction } from '@reduxjs/toolkit';
import { AuthApi } from 'api/auth';
import { UserApi } from 'api/user';
import RNIap from 'react-native-iap';
import SplashScreen from 'react-native-splash-screen';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { toast } from 'shared/toast';
import { IRequestToken, IRequestTokenApple } from 'types/auth';
import { SecureCodeWebPayload} from 'types/auth';
import { Credentials } from 'types/users';
import { isIOS } from 'utils/device';
import { saveUserTokens } from 'utils/store';
import { Navigator } from 'service/navigator';

import { handleDeleteNotificationsToken } from '../notifications/sagas';
import {
  authFailure,
  authSuccess,
  getUser,
  getUserFailure,
  getUserSuccess,
  logout,
  logoutFailure,
  logoutSuccess,
  signIn,
  signInFacebook,
  signInApple,
  signInGoogle,
  userPlatformWeb,
  verifyWebUser,
  userPlatformMobile,
  resendCodeWebUser,
  getDeviceInfoSuccess,
  getDeviceInfo,
  deleteAccount,
  deleteAccountSuccess,
  deleteAccountFailure,
} from './slice';

export interface IResponseToken {
  accessToken: string;
}

export const saveTokens = async (accessToken: string, refreshToken: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('userToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
  } catch(e) {
    console.log("e ===> ", e);
  }
};

export const getTokens = async () => {
  let token = await AsyncStorage.getItem('userToken');
};

function* handleSignIn({ payload }: PayloadAction<Credentials>) {  
  try {
    const { data } = yield call(AuthApi.signIn, payload);    
    if(data?.expiredIn) {
      yield userPlatformWeb();
      Navigator.navigate('WebEmailVerification', {email: payload.email});
      toast.info('Your email is not verified. Please enter the code which is sent to your mail to verify this email');
    } else {
      yield userPlatformMobile();
      yield saveUserTokens(data);
      yield put(getUser());
    }

    yield put(authSuccess());
  } catch (error: any) {
    if(error?.message == 'Invalid credentials') {
      toast.info('You have entered an invalid email or password');
    } else {
      toast.info(error?.message)
    }
    yield put(authFailure());
  }
}

function* handleVerifyUserFromWeb({ payload }: PayloadAction<SecureCodeWebPayload>) {
  try {
    const { data } = yield call(UserApi.verifyWebUser, payload);
    saveTokens(data?.accessToken, data?.refreshToken);
    yield put(getUser());
  } catch (error: any) {    
    toast.info(error?.message);
  }
}

function* handleResendCode({ payload }: PayloadAction<Credentials>) {  
  try {
    yield call(AuthApi.signIn, payload);
    toast.info('Code has been sent to your mail, Check again')
  } catch (error) {
    console.log("error ===> ", error);
    yield put(authFailure());
  }
}

function* handleSignInGoogle({ payload }: PayloadAction<IRequestToken>) {
  try {
    const { data } = yield call(AuthApi.google, payload);
    
    if (data.accessToken) {
      yield saveUserTokens(data);
      yield put(getUser());
    }

    yield put(authSuccess());
  } catch (error: any) {
    if(error?.statusCode == 403) {
      toast.info('This email was previously used and deleted, please contact customer support.');
      yield put(authFailure());
      return;
    }    
    toast.info('The App does not have a User account associated with the selected social account');
    //Navigator.navigate('ChooseRole');
    yield put(authFailure());
  }
}

function* handleSignInFacebook({ payload }: PayloadAction<IRequestToken>) {
  try {
    const { data } = yield call(AuthApi.facebook, payload);

    if (data.accessToken) {
      yield saveUserTokens(data);
      yield put(getUser());
    }

    yield put(authSuccess());
  } catch (error: any) {
    if(error?.statusCode == 403) {
      toast.info('This email was previously used and deleted, please contact customer support.');
      yield put(authFailure());
      return;
    }  
    toast.info('The App does not have a User account associated with the selected social account');
    //Navigator.navigate('ChooseRole');
    yield put(authFailure());
  }
}

function* handleSignInApple({ payload }: PayloadAction<IRequestTokenApple>) {
  try {
    const { data } = yield call(AuthApi.apple, payload);

    if (data.accessToken) {
      yield saveUserTokens(data);
      yield put(getUser());
    }

    yield put(authSuccess());
  } catch (error: any) {
    if(error?.statusCode == 403) {
      toast.info('This email was previously used and deleted, please contact customer support.');
      yield put(authFailure());
      return;
    }  
    toast.info('The App does not have a User account associated with the selected social account');
    //Navigator.navigate('ChooseRole');
    yield put(authFailure());
  }
}

function* handleGetUser() {
  try {
    const { data } = yield call(UserApi.getUser); 
    
    yield put(getUserSuccess(data));
    yield AsyncStorage.setItem('visited', 'yes');

    // SplashScreen.hide();    
  } catch (error) {
    yield AsyncStorage.setItem('visited', 'yes');
    // SplashScreen.hide();

    yield put(getUserFailure());
  }
}

function* handleLogout() {
  try {
    yield call(handleDeleteNotificationsToken);
    yield call(AsyncStorage.removeItem, 'userToken');
    yield call(AsyncStorage.removeItem, 'refreshToken');

    // TODO: delete before release
    if (isIOS) {
      yield RNIap.clearTransactionIOS();
    }

    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure());
  }
}

function* handleDeleteAccount() {
  try {
    const { data } = yield call(UserApi.deleteAccount);
    yield call(AsyncStorage.removeItem, 'userToken');
    yield call(AsyncStorage.removeItem, 'refreshToken');
 
    yield put(deleteAccountSuccess());
    toast.info('Your account has been deleted successfully.');
  } catch (error) {
    yield put(deleteAccountFailure());
  }
}

function* handleGetDeviceInfo() {
  try {
    const { data } = yield call(UserApi.getDeviceInfo);
    yield put(getDeviceInfoSuccess(data));

  } catch (error) {
  }
}

function* watchFetchRequests() {
  yield takeEvery(getUser, handleGetUser);
  yield takeEvery(signIn, handleSignIn);
  yield takeEvery(signInGoogle, handleSignInGoogle);
  yield takeEvery(signInFacebook, handleSignInFacebook);
  yield takeEvery(signInApple, handleSignInApple);
  yield takeEvery(verifyWebUser, handleVerifyUserFromWeb);
  yield takeEvery(resendCodeWebUser, handleResendCode);
  yield takeEvery(logout, handleLogout);
  yield takeEvery(getDeviceInfo, handleGetDeviceInfo);
  yield takeEvery(deleteAccount, handleDeleteAccount);
}

export function* userSaga() {
  yield all([fork(watchFetchRequests)]);
}
