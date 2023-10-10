import { ProfileApi, ProfileClientApi } from 'api/profile';
import { t, translations } from 'locales';
import { call, put, takeEvery } from 'redux-saga/effects';
import { toast } from 'shared/toast';
import { updateTimezone } from 'store/entities/user';
import {
  UPDATE_CLIENT_ADDRESS,
  UPDATE_CLIENT_ADDRESS_FAILED,
  UPDATE_CLIENT_ADDRESS_SUCCESS,
} from 'store/types';

function* clientProfile() {
  try {
    const { data } = yield call(ProfileClientApi.getProfile);

    yield put({ type: 'GET_CLIENT_SUCCESS', client: data });
  } catch (error: any) {
    yield put({ type: 'GET_CLIENT_FAILED' });
    toast.info(error.message);
  }
}

function* updateClientProfile(action: any) {
  try {    
    const { data } = yield call(ProfileClientApi.updateProfile, action.action);
    
    yield put(updateTimezone(data?.utcOffset));
    yield put({ type: 'UPDATE_CLIENT_SUCCESS', client: data });
    if(!action?.fromOnlinePayment) {
      toast.info('Profile updated successfully');
    }
  } catch (error: any) {    
    yield put({ type: 'UPDATE_CLIENT_FAILED' });
    toast.info(error.message);
  }
}

function* updateClientPassword(action: any) {
  try {
    const { navigation, data } = action.action;

    const { status } = yield call(ProfileApi.updatePassword, data);

    if (status === 204) {
      toast.info('Password updated successfully');
      navigation.goBack();
    }
    yield put({ type: 'UPDATE_PROVIDER_PASSWORD_SUCCESS' });
  } catch (error: any) {
    yield put({ type: 'UPDATE_PROVIDER_PASSWORD_FAILED' });
    toast.info(error.message);
  }
}

function* handleUpdateAddress(action: any) {
  console.log("payload",action.payload);
  
  try {
    yield call(ProfileClientApi.updateAddress, action.payload);
    
    toast.info(t(translations.dashboard.timezoneUpdated));

    yield put(updateTimezone(action.payload.utcOffset));
    yield put({ type: UPDATE_CLIENT_ADDRESS_SUCCESS });
  } catch (error: any) {
    toast.info(error.message);

    yield put({ type: UPDATE_CLIENT_ADDRESS_FAILED });
  }
}

function* clientSaga() {
  // @ts-ignore
  yield takeEvery('GET_CLIENT', clientProfile);
  yield takeEvery('UPDATE_CLIENT', updateClientProfile);
  yield takeEvery('UPDATE_CLIENT_PASSWORD', updateClientPassword);
  yield takeEvery(UPDATE_CLIENT_ADDRESS, handleUpdateAddress);
}

export default clientSaga;
