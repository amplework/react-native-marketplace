import { PayloadAction } from '@reduxjs/toolkit';
import { SettingsProviderApi } from 'api/settings';
import { t, translations } from 'locales';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { Navigator } from 'service/navigator';
import { toast } from 'shared/toast';
import { NotificationSettingsValues } from 'types/settings';

import {
  getNotificationSettings,
  getNotificationSettingsFailure,
  getNotificationSettingsSuccess,
  updateNotificationSettings,
  updateNotificationSettingsFailure,
  updateNotificationSettingsSuccess,
} from './slice';

function* handleGetNotificationSettings() {
  try {
    const { data } = yield call(SettingsProviderApi.getNotificationSettings);

    yield put(getNotificationSettingsSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(getNotificationSettingsFailure());
  }
}

function* handleUpdateNotificationSettings({
  payload,
}: PayloadAction<NotificationSettingsValues>) {
  try {
    const { data } = yield call(
      SettingsProviderApi.updateNotificationSettings,
      payload,
    );

    if (!payload?.isFromSignup) {
      toast.info(t(translations.notificationSettings.messages.save));
      Navigator.goBack();
    }

    yield put(updateNotificationSettingsSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.action));

    yield put(updateNotificationSettingsFailure());
  }
}

function* watchFetchRequests() {
  yield takeEvery(getNotificationSettings, handleGetNotificationSettings);
  yield takeEvery(updateNotificationSettings, handleUpdateNotificationSettings);
}

export function* notificationSettingsSaga() {
  yield all([fork(watchFetchRequests)]);
}
