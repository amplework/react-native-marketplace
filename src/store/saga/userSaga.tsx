import { UserApi } from 'api/user';
import { call, put, takeEvery } from 'redux-saga/effects';
import { toast } from 'shared/toast';

type verifyEmailData = {
  action: {
    email: string;
  };
};

function* verifyEmailClient(action: verifyEmailData) {
  try {
    const { email } = action.action;

    const { status } = yield call(UserApi.checkUser, email);
    
    if (status === 200) {
      toast.info('User with the same email address already exists');
    }
  } catch (error: any) {
    try {
      const { email } = action.action;
      if(error?.status == 409) {
        toast.info('This email was previously used and deleted, please contact customer support.');
        return;
      }
      
      yield call(UserApi.verifyEmail, email);
      toast.info('Verification code has been sent to your email');
      yield put({ type: 'CHANGE_STEP_CLIENT', action: 1 });
      yield put({ type: 'VERIFICATION_EMAIL_CLIENT_SUCCESS' });
    } catch (error) {
    }
  }
}

function* userSagaOld() {
  // @ts-ignore
  yield takeEvery('VERIFICATION_EMAIL_CLIENT', verifyEmailClient);
}

export default userSagaOld;
