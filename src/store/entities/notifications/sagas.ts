import { PayloadAction } from '@reduxjs/toolkit';
import { NotificationsApi } from 'api/notifications';
import { t, translations } from 'locales';
import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { toast } from 'shared/toast';
import { GetNotificationsPayload, Notification } from 'types/notifications';
import { isIOS } from 'utils/device';

import { notificationsSelectors } from './selectors';
import {
  deleteNotificationsToken,
  deleteNotificationsTokenFailure,
  deleteNotificationsTokenSuccess,
  getNotifications,
  getNotificationsFailure,
  getNotificationsStatus,
  getNotificationsStatusFailure,
  getNotificationsStatusSuccess,
  getNotificationsSuccess,
  loadMoreNotifications,
  loadMoreNotificationsFailure,
  loadMoreNotificationsSuccess,
  readNotifications,
  readNotificationsFailure,
  readNotificationsSuccess,
  saveNotificationsToken,
  saveNotificationsTokenFailure,
  saveNotificationsTokenSuccess,
} from './slice';

function* handleGetNotifications({
  payload,
}: PayloadAction<GetNotificationsPayload>) {
  try {
    const { data } = yield call(NotificationsApi.getNotifications, payload);

    yield put(getNotificationsSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(getNotificationsFailure());
  }
}

function* handleLoadMoreNotifications({
  payload,
}: PayloadAction<GetNotificationsPayload>) {
  try {
    const { data } = yield call(NotificationsApi.getNotifications, payload);

    yield put(loadMoreNotificationsSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(loadMoreNotificationsFailure());
  }
}

function* handleReadNotifications() {
  try {
    const notifications: Notification[] = yield select(
      notificationsSelectors.notifications,
    );
    const unreadNotification = notifications.find(
      (notification) => !notification.hasRead,
    );

    if (unreadNotification) {
      yield call(NotificationsApi.readNotification, unreadNotification.id);
      yield put(getNotifications());
    }

    yield put(readNotificationsSuccess());
  } catch (error) {
    toast.info(
      t(translations.common.errors.process, {
        process: t(translations.common.processes.read),
        entity: t(translations.common.entities.notifications),
      }),
    );

    yield put(readNotificationsFailure());
  }
}

function* handleGetNotificationsStatus() {
  try {
    const { data } = yield call(NotificationsApi.getNotificationsStatus);

    yield put(getNotificationsStatusSuccess(data));
  } catch (error) {
    yield put(getNotificationsStatusFailure());
  }
}

function* handleSaveNotificationsToken({ payload }: PayloadAction<string>) {
  try {
    yield call(NotificationsApi.saveToken, payload);

    yield put(saveNotificationsTokenSuccess(payload));
  } catch (error) {
    yield put(saveNotificationsTokenFailure());
  }
}

export function* handleDeleteNotificationsToken() {
  try {
    const deviceToken: string | null = yield select(
      notificationsSelectors.token,
    );

    if (deviceToken) {
      const token = isIOS ? deviceToken.toLowerCase() : deviceToken;

      yield call(NotificationsApi.deleteToken, token);
    }

    yield put(deleteNotificationsTokenSuccess());
  } catch (error) {
    yield put(deleteNotificationsTokenFailure());
  }
}

function* watchFetchRequests() {
  yield takeEvery(getNotifications, handleGetNotifications);
  yield takeEvery(loadMoreNotifications, handleLoadMoreNotifications);
  yield takeEvery(readNotifications, handleReadNotifications);
  yield takeEvery(getNotificationsStatus, handleGetNotificationsStatus);
  yield takeEvery(saveNotificationsToken, handleSaveNotificationsToken);
  yield takeEvery(deleteNotificationsToken, handleDeleteNotificationsToken);
}

export function* notificationsSaga() {
  yield all([fork(watchFetchRequests)]);
}
