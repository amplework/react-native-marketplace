import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import I18n from 'locales';
import { Navigator } from 'service/navigator';
import { toast } from 'shared/toast';
import { ClientRewardApi } from 'api/clientReward';
import {
  getClientReward,
  getClientRewardSuccess,
  getClientRewardFailure,
  addClientReward,
  addClientRewardSuccess,
  addClientRewardFailure,
  updateClientReward,
  updateClientRewardSuccess,
  updateClientRewardFailure,
} from './slice';

function* handleGetClientReward({ payload }: PayloadAction<any>) {
  try {
    const { data } = yield call(ClientRewardApi.getClientReward, payload?.type);

    yield put(getClientRewardSuccess(data));
  } catch (error: any) {
    toast.info(error?.message);

    yield put(getClientRewardFailure());
  }
}

function* handleAddClientReward({ payload }: PayloadAction<any>) {
  try {
    yield call(ClientRewardApi.createClientReward, payload);

    const { data } = yield call(ClientRewardApi.getClientReward, payload?.type);
    yield put(getClientRewardSuccess(data));

    toast.info(I18n.t(payload?.type == 'birthday' ? 'clientBirthdayReward.changedApplied' : 'clientLoyaltyReward.changedApplied'));
    yield put(addClientRewardSuccess());
    Navigator.goBack();
  } catch (error: any) {
    toast.info(error?.message);

    yield put(addClientRewardFailure());
  }
}

function* handleUpdateClientReward({ payload }: PayloadAction<any>) {
  try {
    const { id, type, ...payloads } = payload;
    yield call(ClientRewardApi.updateClientReward, payloads, id);

    const { data } = yield call(ClientRewardApi.getClientReward, type);
    yield put(getClientRewardSuccess(data));

    toast.info(I18n.t(payload?.type == 'birthday' ? 'clientBirthdayReward.changedApplied' : 'clientLoyaltyReward.changedApplied'));
    yield put(updateClientRewardSuccess());
    Navigator.goBack();
  } catch (error: any) {
    toast.info(error?.message);

    yield put(updateClientRewardFailure());
  }
}

function* watchFetchRequests() {
  yield takeEvery(getClientReward, handleGetClientReward);
  yield takeEvery(addClientReward, handleAddClientReward);
  yield takeEvery(updateClientReward, handleUpdateClientReward);
}

export function* clientRewardSaga() {
  yield all([fork(watchFetchRequests)]);
}
