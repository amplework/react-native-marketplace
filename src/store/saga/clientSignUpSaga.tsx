import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthApi, AuthClientApi } from 'api/auth';
import { UserApi } from 'api/user';
import { call, put, takeEvery } from 'redux-saga/effects';
import { toast } from 'shared/toast';
import { getClientProfile } from 'store/actions/client';
import { getUser } from 'store/entities/user';
import { saveUserTokens } from 'utils/store';

function* signUpClientFacebook(action: any) {
  try {
    const { token, navigation } = action.action;
    const { status, data } = yield call(AuthApi.facebook, token);

    if (status === 201) {      
      yield saveUserTokens(data);
      yield put(getUser());
    }
  } catch (error: any) {
    if(error?.statusCode == 403) {
      toast.info('This email was previously used and deleted, please contact customer support.');
      return;
    }  
    yield put({
      type: 'SIGN_UP_CLIENT_FACEBOOK_SUCCESS',
      accessToken: action.action.token.accessToken,
    });
    yield put({ type: 'CHANGE_STEP_CLIENT', action: 2 });
  }
}

function* signUpClientGoogle(action: any) {
  try {
    const { token, navigation } = action.action;

    const { status, data } = yield call(AuthApi.google, token);

    if (status === 201) {
      yield AsyncStorage.setItem('userToken', data.accessToken);
      yield AsyncStorage.setItem('refreshToken', data.refreshToken);
      yield put(getUser());
      // yield navigation.push('Login');
    }
  } catch (error: any) {
    if(error?.statusCode == 403) {
      toast.info('This email was previously used and deleted, please contact customer support.');
      return;
    }  
    const { token } = action.action;
    yield put({
      type: 'SIGN_UP_CLIENT_GOOGLE_SUCCESS',
      accessToken: token.accessToken,
    });
    yield put({ type: 'CHANGE_STEP_CLIENT', action: 2 });
  }
}


function* signUpClientApple(action: any) {
  try {
    const { token, navigation } = action.action;
    const { status, data } = yield call(AuthApi.facebook, token);

    if (status === 201) {
      yield AsyncStorage.setItem('userToken', data.accessToken);
      yield AsyncStorage.setItem('refreshToken', data.refreshToken);
      yield put(getUser());
      // yield navigation.push('Login');
    }
  } catch (error: any) {
    if(error?.statusCode == 403) {
      toast.info('This email was previously used and deleted, please contact customer support.');
      return;
    }  
    yield put({
      type: 'SIGN_UP_CLIENT_APPLE_SUCCESS',
      accessToken: action.action.token.appleId,
    });
    yield put({ type: 'CHANGE_STEP_CLIENT', action: 2 });
  }
}

function* signUpClient(action: any) {
  try {
    const { userData, navigation } = action.action;
    const { data } = yield call(AuthClientApi.signUp, userData);

    if (data?.accessToken && data?.refreshToken) {
      yield AsyncStorage.setItem('userToken', data.accessToken);
      yield AsyncStorage.setItem('refreshToken', data.refreshToken);
    }

    yield put({ type: 'SIGN_UP_CLIENT_SUCCESS' });
    // yield put(getUser());
    yield put(getClientProfile());
    toast.info('Congratulations, your account has been successfully created. Proceed next to setup online payments.')
    yield put({ type: 'CHANGE_STEP_CLIENT', action: 5 });
  } catch (error: any) {
    yield put({ type: 'SIGN_UP_CLIENT_FAILED' });
    toast.info(error.message);
  }
}

// function* signUpClient(action: any) {        *--------From feature/alpha-release-2
//   try {
//     const { userData, navigation } = action.action;
//     const { data } = yield call(AuthClientApi.signUp, userData);

    

//     if (data?.accessToken && data?.refreshToken) {
//       yield AsyncStorage.setItem('userToken', data.accessToken);
//       yield AsyncStorage.setItem('refreshToken', data.refreshToken);
//     }

//     yield put({ type: 'SIGN_UP_CLIENT_SUCCESS' });
//     yield put({ type: 'CHANGE_STEP_CLIENT', action: 5 });
//     // yield navigation.push('Login');
//   } catch (error) {
//     console.log("error ==> ", error); 
//     yield put({ type: 'SIGN_UP_CLIENT_FAILED' });
//     toast.info(error.message);                 *--------From feature/alpha-release-2
//   }
// }

function* verifySecureCode(action: {
  action: { code: string; email: string };
}) {
  try {
    const { code, email } = action.action;
    const { status } = yield call(UserApi.verifyCode, code, email);

    if (status === 200) {
      yield put({ type: 'CHANGE_STEP_CLIENT', action: 2 });
    }
  } catch (error: any) {
    if (error.statusCode === 400) {
      toast.info(error.message);
    }
  }
}

function* clientSignUpSaga() {
  // @ts-ignore
  yield takeEvery('SIGN_UP_CLIENT_FACEBOOK', signUpClientFacebook);
  // @ts-ignore
  yield takeEvery('VERIFICATION_SECURE_CODE_CLIENT', verifySecureCode);
  yield takeEvery('SIGN_UP_CLIENT_GOOGLE', signUpClientGoogle);
  yield takeEvery('SIGN_UP_CLIENT_APPLE', signUpClientApple);
  yield takeEvery('SIGN_UP_CLIENT', signUpClient);
}

export default clientSignUpSaga;
