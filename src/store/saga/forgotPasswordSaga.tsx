import { ForgotPasswordApi } from 'api/forgotPassword';
import { call, put, takeEvery } from 'redux-saga/effects';
import { toast } from 'shared/toast';

import { UserApi } from '../../api/user';

function* forgotPasswordEmail(action: { email: string }) {
  try {
    yield call(ForgotPasswordApi.sendResetEmail, action.email);
    toast.info('Verification code has been sent to your email');
    yield put({ type: 'CHANGE_STEP_FORGOT_PASSWORD', action: 1 });
  } catch (error) {
    toast.info('The App does not have a User account with the specified email');
    //yield put({type: 'GET_INDUSTRIES_FAILED', message: e.message});
  }
}

function* resetPassword(action: any) {
  try {
    const { email, secureCode, password } = action.action;

    yield call(ForgotPasswordApi.resetPassword, {
      email,
      secureCode,
      password,
    });

    yield put({ type: 'CHANGE_STEP_FORGOT_PASSWORD', action: 3 });
  } catch (error) {
    toast.info('The entered verification code is wrong. Please check your email and try again');
  }
}

function* verifySecureCode(action: {
  action: { code: string; email: string };
}) {
  try {
    const { code, email } = action.action;
    const { status } = yield call(
      UserApi.verifyCode,
      code,
      email,
      'reset password',
    );
    if (status === 200) {
      yield put({ type: 'CHANGE_STEP_FORGOT_PASSWORD', action: 2 });
    }
  } catch (error: any) {
    if (error.statusCode === 400) {
      toast.info(error.message);
    }
  }
}

function* industriesSaga() {
  // @ts-ignore
  yield takeEvery('FORGOT_PASSWORD_EMAIL', forgotPasswordEmail);
  // @ts-ignore
  yield takeEvery('RESET_PASSWORD', resetPassword);
  // @ts-ignore
  yield takeEvery('FORGOT_VERIFY_SECURE_CODE', verifySecureCode);
}

export default industriesSaga;
