import { PayloadAction } from '@reduxjs/toolkit';
import { SettingsProviderApi } from 'api/settings';
import I18n from 'locales';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { toast } from 'shared/toast';
import {
  ICreateClosedDaysRequest,
  IEditClosedDaysRequest,
} from 'types/settings';

import {
  closeEditModal,
  closeModal,
  createClosedDays,
  createClosedDaysFailure,
  createClosedDaysSuccess,
  deleteClosedDays,
  deleteClosedDaysFailure,
  deleteClosedDaysSuccess,
  editClosedDays,
  editClosedDaysFailure,
  editClosedDaysSuccess,
  getClosedDays,
  getClosedDaysFailure,
  getClosedDaysSuccess,
} from './slice';

function* handleGetClosedDays() {
  try {
    const { data } = yield call(SettingsProviderApi.getClosedDays);

    yield put(getClosedDaysSuccess(data));
  } catch (error) {
    toast.info(I18n.t('common.errors.load'));

    yield put(getClosedDaysFailure());
  }
}

function* handleCreateClosedDays(
  action: PayloadAction<ICreateClosedDaysRequest>,
) {
  
  try {
    const { data } = yield call(
      SettingsProviderApi.createClosedDays,
      action.payload,
    );

    toast.info(I18n.t('closedDays.createSuccess'));

    yield put(createClosedDaysSuccess(data));
    yield put(closeModal());
  } catch (error) {
    toast.info(error.message);

    yield put(createClosedDaysFailure());
  }
}

function* handleEditClosedDays(action: PayloadAction<IEditClosedDaysRequest>) {
  try {
    const { id, ...data } = action.payload;
    
    yield call(SettingsProviderApi.editClosedDays, id, data);

    toast.info(I18n.t('closedDays.editSuccess'));

    yield put(editClosedDaysSuccess(action.payload));
    yield put(closeEditModal());
  } catch (error) {
    toast.info(error.message);

    yield put(editClosedDaysFailure());
  }
}

function* handleDeleteClosedDays(action: PayloadAction<number>) {
  try {
    yield call(SettingsProviderApi.deleteClosedDays, action.payload);

    toast.info(I18n.t('closedDays.deleteSuccess'));

    yield put(deleteClosedDaysSuccess());
    yield put(closeEditModal());
  } catch (error) {
    toast.info(error.message);

    yield put(deleteClosedDaysFailure());
  }
}

function* watchFetchRequests() {
  yield takeEvery(getClosedDays, handleGetClosedDays);
  yield takeEvery(createClosedDays, handleCreateClosedDays);
  yield takeEvery(editClosedDays, handleEditClosedDays);
  yield takeEvery(deleteClosedDays, handleDeleteClosedDays);
}

export function* closedDaysSaga() {
  yield all([fork(watchFetchRequests)]);
}
