import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { SettingsProviderApi } from 'api/settings';
import { t, translations } from 'locales';
import { toast } from 'shared/toast';
import { Reminder, ReminderValues } from 'types/settings';

import {
  closeReminderModal,
  createReminder,
  createReminderFailure,
  createReminderSuccess,
  deleteReminder,
  deleteReminderFailure,
  deleteReminderSuccess,
  editReminder,
  editReminderFailure,
  editReminderSuccess,
  getReminders,
  getRemindersFailure,
  getRemindersSuccess,
} from './slice';

function* handleGetReminders() {
  try {
    const { data } = yield call(SettingsProviderApi.getReminders);

    yield put(getRemindersSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(getRemindersFailure());
  }
}

function* handleCreateReminder({ payload }: PayloadAction<ReminderValues>) {
  try {
    const { data } = yield call(SettingsProviderApi.createReminder, payload);

    toast.info(
      t(translations.common.messages.creation, {
        entity: t(translations.common.entities.reminder),
      }),
    );

    yield put(closeReminderModal());
    yield put(createReminderSuccess(data));
  } catch (error) {
    toast.info(
      t(translations.common.errors.process, {
        process: t(translations.common.processes.create),
        entity: t(translations.common.entities.reminder),
      }),
    );

    yield put(createReminderFailure());
  }
}

function* handleEditReminder({ payload }: PayloadAction<Reminder>) {
  try {
    const { data } = yield call(SettingsProviderApi.editReminder, payload);

    toast.info(
      t(translations.common.messages.edition, {
        entity: t(translations.common.entities.reminder),
      }),
    );

    yield put(closeReminderModal());
    yield put(editReminderSuccess(data));
  } catch (error) {
    toast.info(
      t(translations.common.errors.process, {
        process: t(translations.common.processes.edit),
        entity: t(translations.common.entities.reminder),
      }),
    );

    yield put(editReminderFailure());
  }
}

function* handleDeleteReminder({ payload }: PayloadAction<number>) {
  try {
    yield call(SettingsProviderApi.deleteReminder, payload);

    toast.info(
      t(translations.common.messages.deletion, {
        entity: t(translations.common.entities.reminder),
      }),
    );

    yield put(closeReminderModal());
    yield put(deleteReminderSuccess(payload));
  } catch (error) {
    toast.info(
      t(translations.common.errors.process, {
        process: t(translations.common.processes.delete),
        entity: t(translations.common.entities.reminder),
      }),
    );

    yield put(deleteReminderFailure());
  }
}

function* watchFetchRequests() {
  yield takeEvery(getReminders, handleGetReminders);

  yield takeEvery(createReminder, handleCreateReminder);
  yield takeEvery(editReminder, handleEditReminder);
  yield takeEvery(deleteReminder, handleDeleteReminder);
}

export function* remindersSaga() {
  yield all([fork(watchFetchRequests)]);
}
