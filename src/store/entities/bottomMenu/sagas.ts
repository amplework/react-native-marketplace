import AsyncStorage from '@react-native-async-storage/async-storage';
import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { SettingsProviderApi } from 'api/settings';
import { t, translations } from 'locales';
import { toast } from 'shared/toast';
import { getProviderProfile } from 'store/actions/provider';
import { BottomMenu } from 'types/settings';

import {
  editBottomMenuSettings,
  editBottomMenuSettingsFailure,
  editBottomMenuSettingsSuccess,
} from './slice';

function* handleEditBottomMenuSettings({ payload }: PayloadAction<BottomMenu>) {
  console.log("payload setting===>>>>> ", payload);
  
  try {
    yield call(SettingsProviderApi.editBottomMenuSettings, payload);

    toast.info(t(translations.settings.bottomMenu.changed));

    yield put(editBottomMenuSettingsSuccess());
    yield put(getProviderProfile());
  } catch (error: any) {
    toast.info(error.message);

    yield put(editBottomMenuSettingsFailure());
  }
}

function* watchFetchRequests() {
  yield takeEvery(editBottomMenuSettings, handleEditBottomMenuSettings);
}

export function* bottomMenuSaga() {
  yield all([fork(watchFetchRequests)]);
}
