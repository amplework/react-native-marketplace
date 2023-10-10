import AsyncStorage from '@react-native-async-storage/async-storage';
import { PayloadAction } from '@reduxjs/toolkit';
import { AuthApi, AuthProviderApi } from 'api/auth';
// import { SubscriptionApi } from 'api/subscription';
import { UserApi } from 'api/user';
import { t, translations } from 'locales';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { Navigator } from 'service/navigator';
import { toast } from 'shared/toast';
import { getProviderProfile } from 'store/actions/provider';
import { IRequestAppleSignup, IRequestSocialSignup, IRequestTokenApple, SecureCodePayload } from 'types/auth';
import { SignUpProviderRequest } from 'types/signUpFlow';
import { DEFAULT_NOTIFICATION_SERVICES } from 'utils/constants';
import { saveUserTokens } from 'utils/store';
import { updateNotificationSettings } from '../notificationSettings';

import { getUser } from '../user';
import {
  changeStepProvider,
  signUpProviderAction,
  signUpProviderFacebook,
  signUpProviderFailure,
  signUpProviderGoogle,
  signUpProviderApple,
  signUpProviderSuccess,
  verifyEmail,
  verifySecureCode,
} from './slice';

function* handleSignUpProviderFacebook({
  payload,
}: PayloadAction<IRequestSocialSignup>) {
  try {
    const { status, data } = yield call(AuthApi.facebook, { accessToken: payload.accessToken });

    if (status === 201) {
      yield saveUserTokens(data);
      yield put(getUser());
    }
  } catch (e: any) {
    if (e?.statusCode == 403) {
      toast.info('This email was previously used and deleted, please contact customer support.');
      return;
    }
    try {
      const { data } = yield call(AuthProviderApi.signUp, payload?.formData);
      if (data?.accessToken && data?.refreshToken) {
        yield AsyncStorage.setItem('userToken', data.accessToken);
        yield AsyncStorage.setItem('refreshToken', data.refreshToken);
        // toast.info(t(translations.signup.success));
      }

      yield put(signUpProviderSuccess());
      yield put(getUser());
      yield put(getProviderProfile());
      Navigator.navigate('Home');
      yield put(updateNotificationSettings(DEFAULT_NOTIFICATION_SERVICES));
    } catch (error: any) {
      console.log("error response === > ", { ...error });

      toast.info(error?.message);

      yield put(signUpProviderFailure());
    }
  }
}

function* handleSignUpProviderGoogle({
  payload,
}: PayloadAction<IRequestSocialSignup>) {
  try {
    const { status, data } = yield call(AuthApi.google, { accessToken: payload.accessToken });

    if (status === 201) {
      yield saveUserTokens(data);
      yield put(getUser());
    }
  } catch (error: any) {
    if (error?.statusCode == 403) {
      toast.info('This email was previously used and deleted, please contact customer support.');
      return;
    }
    try {
      const { data } = yield call(AuthProviderApi.signUp, payload?.formData);
      if (data?.accessToken && data?.refreshToken) {
        yield AsyncStorage.setItem('userToken', data.accessToken);
        yield AsyncStorage.setItem('refreshToken', data.refreshToken);
        // toast.info(t(translations.signup.success));
      }

      yield put(signUpProviderSuccess());
      yield put(getUser());
      yield put(getProviderProfile());
      Navigator.navigate('Home');
      yield put(updateNotificationSettings(DEFAULT_NOTIFICATION_SERVICES));
    } catch (error: any) {
      console.log("error response === > ", { ...error });

      toast.info(error?.message);

      yield put(signUpProviderFailure());
    }
  }
}

function* handleSignUpProviderApple({
  payload,
}: PayloadAction<IRequestAppleSignup>) {
  try {
    const { status, data } = yield call(AuthApi.apple, {
      email: payload?.email,
      appleId: payload?.appleId
    });
    if (status === 201) {
      yield saveUserTokens(data);
      yield put(getUser());
    }
  } catch (e: any) {
    if (e?.statusCode == 403) {
      toast.info('This email was previously used and deleted, please contact customer support.');
      return;
    }
    try {
      const { data } = yield call(AuthProviderApi.signUp, payload?.formData);
      if (data?.accessToken && data?.refreshToken) {
        yield AsyncStorage.setItem('userToken', data.accessToken);
        yield AsyncStorage.setItem('refreshToken', data.refreshToken);
        // toast.info(t(translations.signup.success));
      }

      yield put(signUpProviderSuccess());
      yield put(getUser());
      yield put(getProviderProfile());
      Navigator.navigate('Home');
      yield put(updateNotificationSettings(DEFAULT_NOTIFICATION_SERVICES));
    } catch (error: any) {
      console.log("error response === > ", { ...error });

      toast.info(error?.message);

      yield put(signUpProviderFailure());
    }
  }
}

function* handleSignUpProvider({
  payload,
}: PayloadAction<SignUpProviderRequest>) {
  try {
    const { data } = yield call(AuthProviderApi.signUp, payload);

    if (data?.accessToken && data?.refreshToken) {
      yield AsyncStorage.setItem('userToken', data.accessToken);
      yield AsyncStorage.setItem('refreshToken', data.refreshToken);
      // toast.info(t(translations.signup.success));
    }

    yield put(signUpProviderSuccess());
    yield put(getUser());
    yield put(getProviderProfile());
    Navigator.navigate('Home');
    yield put(updateNotificationSettings(DEFAULT_NOTIFICATION_SERVICES));
  } catch (error: any) {
    toast.info(error?.message);

    yield put(signUpProviderFailure());
  }
}


function* handleVerifyEmail({ payload }: PayloadAction<string>) {
  try {
    const { status } = yield call(UserApi.checkUser, payload);
    if (status === 200) {
      yield put(changeStepProvider(0));
      toast.info('User with the same email address already exists');
    }
  } catch (error: any) {
    if (error?.status == 409) {
      toast.info('This email was previously used and deleted, please contact customer support.');
      return;
    }
    yield call(UserApi.verifyEmail, payload);
    toast.info('Verification code has been sent to your email');
    yield put(changeStepProvider(1));
  }
}

function* handleVerifySecureCode({
  payload,
}: PayloadAction<SecureCodePayload>) {
  try {
    const { code, email, onSuccess } = payload;
    const { status } = yield call(UserApi.verifyCode, code, email);

    if (status === 200) {
      yield onSuccess();
    }
  } catch (error: any) {
    if (error.statusCode === 400) {
      toast.info('The entered verification code is wrong. Please check your email and try again');
    }
  }
}

function* watchFetchRequests() {
  yield takeEvery(signUpProviderFacebook, handleSignUpProviderFacebook);
  yield takeEvery(signUpProviderGoogle, handleSignUpProviderGoogle);
  yield takeEvery(signUpProviderApple, handleSignUpProviderApple);
  yield takeEvery(signUpProviderAction, handleSignUpProvider);
  yield takeEvery(verifyEmail, handleVerifyEmail);
  yield takeEvery(verifySecureCode, handleVerifySecureCode);
}

export function* signUpProviderSaga() {
  yield all([fork(watchFetchRequests)]);
}
