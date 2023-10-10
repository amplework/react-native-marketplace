import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { SettingsProviderApi } from 'api/settings';
import I18n from 'locales';
import { Navigator } from 'service/navigator';
import { toast } from 'shared/toast';
import { CalendarSettingsValues } from 'types/settings';
import { formatApiTime } from 'utils/dates';

import {
  getCalendarSettings,
  getCalendarSettingsFailure,
  getCalendarSettingsSuccess,
  updateCalendarSettings,
  updateCalendarSettingsFailure,
  updateCalendarSettingsSuccess,
} from './slice';

function* handleGetCalendarSettings() {
  try {
    const { data } = yield call(SettingsProviderApi.getCalendarSettings);

    yield put(getCalendarSettingsSuccess(data));
  } catch (error) {
    toast.info(I18n.t('common.errors.load'));

    yield put(getCalendarSettingsFailure());
  }
}

function* handleUpdateCalendarSettings({
  payload,
}: PayloadAction<CalendarSettingsValues>) {
  try {
    const { data } = yield call(SettingsProviderApi.updateCalendarSettings, {
      ...payload,
      dayStart: formatApiTime(payload.dayStart, { utc: true }),
      dayEnd: formatApiTime(payload.dayEnd, { utc: true }),
      lunchStart: formatApiTime(payload.lunchStart, { utc: true }),
      lunchEnd: formatApiTime(payload.lunchEnd, { utc: true }),
    });

    toast.info(I18n.t('calendarSetup.changedApplied'));
    Navigator.goBack();

    yield put(updateCalendarSettingsSuccess(data));
  } catch (error: any) {
    toast.info(error.message);

    yield put(updateCalendarSettingsFailure());
  }
}

function* watchFetchRequests() {
  yield takeEvery(getCalendarSettings, handleGetCalendarSettings);
  yield takeEvery(updateCalendarSettings, handleUpdateCalendarSettings);
}

export function* calendarSetupSaga() {
  yield all([fork(watchFetchRequests)]);
}
