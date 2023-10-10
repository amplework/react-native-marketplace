import { PayloadAction } from '@reduxjs/toolkit';
import { AppointmentsApi, ProviderAppointmentsApi } from 'api/appointments';
import { t, translations } from 'locales';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { Navigator } from 'service/navigator';
import { toast } from 'shared/toast';
import { EditRequest, PaginationListRequest } from 'types/api';
import {
  AppointmentRequest,
  AppointmentsRequest,
  DeleteAppointmentAction,
  ReadyForClientAction,
  ScheduledAppointmentsRequest,
  SlotsRequest,
} from 'types/appointments';

import {
  checkClosedDay,
  checkClosedDayFailure,
  checkClosedDaySuccess,
  createAppointment,
  createAppointmentFailure,
  createAppointmentSuccess,
  deleteAppointment,
  deleteAppointmentFailure,
  deleteAppointmentSuccess,
  editAppointment,
  editAppointmentFailure,
  editAppointmentSuccess,
  getAppointment,
  getAppointmentFailure,
  getAppointments,
  getAppointmentsFailure,
  getAppointmentsReview,
  getAppointmentsReviewFailure,
  getAppointmentsReviewSuccess,
  getAppointmentsSuccess,
  getAppointmentSuccess,
  getCalendarOverview,
  getCalendarOverviewFailure,
  getCalendarOverviewSuccess,
  getClientAppointments,
  getClientAppointmentsFailure,
  getClientAppointmentsSuccess,
  getPendingAppointments,
  getPendingAppointmentsSuccess,
  getScheduledAppointments,
  getScheduledAppointmentsFailure,
  getScheduledAppointmentsSuccess,
  getSlots,
  getSlotsFailure,
  getSlotsSuccess,
  readyForClientMessage,
  readyForClientMessageFailure,
  readyForClientMessageSuccess,
} from './slice';

function* handleGetAppointments({
  payload,
}: PayloadAction<AppointmentsRequest>) {
  try {
    const { data } = yield call(AppointmentsApi.getAppointments, payload);
    yield put(getAppointmentsSuccess(data));
  } catch (error: any) {
    error?.toString() == 'Error: Cannot load an empty url'
      ? toast.info('Connection was Interrupted!')
      : toast.info(error?.message);

    yield put(getAppointmentsFailure());
  }
}

function* handleGetClientAppointments({
  payload,
}: PayloadAction<AppointmentsRequest>) {
  try {
    const { data } = yield call(AppointmentsApi.getAppointments, payload);
    yield put(getClientAppointmentsSuccess(data));
  } catch (error: any) {
    error?.toString() == 'Error: Cannot load an empty url'
      ? toast.info('Connection was Interrupted!')
      : toast.info(error?.message);

    yield put(getAppointmentsFailure());
  }
}

function* handleGetScheduledAppointments({
  payload,
}: PayloadAction<ScheduledAppointmentsRequest>) {
  try {
    const { data } = yield call(
      AppointmentsApi.getScheduledAppointments,
      payload,
    );
    yield put(getScheduledAppointmentsSuccess(data));
  } catch (error: any) {
    error?.toString() == 'Error: Cannot load an empty url'
      ? toast.info('Connection was Interrupted!')
      : toast.info(error?.message);

    yield put(getScheduledAppointmentsFailure());
  }
}

function* handleGetPendingAppointments({
  payload,
}: PayloadAction<PaginationListRequest | undefined>) {
  try {
    const { data } = yield call(
      AppointmentsApi.getAppointmentsPending,
      payload,
    );

    yield put(getPendingAppointmentsSuccess(data));
  } catch (error: any) {
    error?.toString() == 'Error: Cannot load an empty url'
      ? toast.info('Connection was Interrupted!')
      : toast.info(error?.message);

    yield put(getAppointmentsFailure());
  }
}

function* handleCheckClosedDay({ payload }: PayloadAction<any>) {
  try {
    const { data } = yield call(AppointmentsApi.checkClosedDays, payload);
    if (data?.isClosedDay) {
      yield put(checkClosedDaySuccess({ isClosedDay: true }));
    } else {
      yield put(checkClosedDaySuccess({ isClosedDay: false }));
    }
  } catch (error: any) {
    error?.toString() == 'Error: Cannot load an empty url'
      ? toast.info('Connection was Interrupted!')
      : toast.info(error?.message);

    yield put(checkClosedDayFailure());
  }
}

function* handleGetSlots({ payload }: PayloadAction<SlotsRequest>) {
  try {
    const { data } = yield call(AppointmentsApi.getAppointmentSlots, payload);
    yield put(getSlotsSuccess(data));
  } catch (error: any) {
    error?.toString() == 'Error: Cannot load an empty url'
      ? toast.info('Connection was Interrupted!')
      : toast.info(error?.message);

    yield put(getSlotsFailure());
  }
}

function* handleGetAppointmentsReview() {
  try {
    const { data } = yield call(AppointmentsApi.getAppointmentsReview);

    yield put(getAppointmentsReviewSuccess(data));
  } catch (error: any) {
    error?.toString() == 'Error: Cannot load an empty url'
      ? toast.info('Connection was Interrupted!')
      : toast.info(error?.message);

    yield put(getAppointmentsReviewFailure());
  }
}

function* handleGetAppointment({ payload }: PayloadAction<number>) {
  try {
    const { data } = yield call(AppointmentsApi.getAppointment, payload);

    yield put(getAppointmentSuccess(data));
  } catch (error: any) {
    yield put(getAppointmentFailure(new Error(error.message)));
    toast.info(error?.message);
  }
}

function* handleCreateAppointment({
  payload,
}: PayloadAction<AppointmentRequest>) {
  try {
    yield call(AppointmentsApi.createAppointment, payload);

    toast.info('New appointment has been successfully created!');

    yield put(createAppointmentSuccess());
    Navigator.goBack();
  } catch (error: any) {
    toast.info(error?.message);

    yield put(createAppointmentFailure());
  }
}

function* handleEditAppointment({
  payload,
}: PayloadAction<EditRequest<AppointmentRequest>>) {
  try {
    yield call(AppointmentsApi.updateAppointment, payload);

    toast.info('Edits have been successfully applied');

    yield put(editAppointmentSuccess());
    yield put(getAppointment(payload.id));
    Navigator.goBack();
  } catch (error: any) {
    error?.toString() == 'Error: Cannot load an empty url'
      ? toast.info('Connection was Interrupted!')
      : toast.info(error?.message);

    yield put(editAppointmentFailure());
  }
}

function* handleDeleteAppointment({
  payload,
}: PayloadAction<DeleteAppointmentAction>) {
  try {
    const { id, type, shouldGoBack } = payload;

    yield call(AppointmentsApi.deleteAppointment, id);

    yield put(deleteAppointmentSuccess());

    if (type === 'request') {
      toast.info('Appointment request was deleted');

      yield put(getPendingAppointments());
    } else {
      toast.info('Appointment has been successfully deleted!');
      Navigator.goBack();
    }

    if (shouldGoBack) {
      Navigator.goBack();
    }
  } catch (error: any) {
    error?.toString() == 'Error: Cannot load an empty url'
      ? toast.info('Connection was Interrupted!')
      : toast.info(error?.message);

    yield put(deleteAppointmentFailure());
  }
}

function* handleReadyForClient({
  payload,
}: PayloadAction<ReadyForClientAction>) {
  try {
    const { id } = payload;
    console.log('id in payload ++ > ', id);

    yield call(AppointmentsApi.readyForClient, payload);

    yield put(readyForClientMessageSuccess());

    toast.info('Client is invited.');
  } catch (error: any) {
    error?.toString() == 'Error: Cannot load an empty url'
      ? toast.info('Connection was Interrupted!')
      : toast.info(error?.message);

    yield put(readyForClientMessageFailure());
  }
}

function* handleGetCalendarOverview(action: PayloadAction<string>) {
  try {
    const { data } = yield call(
      ProviderAppointmentsApi.getCalendarOverview,
      action.payload,
    );

    yield put(getCalendarOverviewSuccess(data));
  } catch (error: any) {
    toast.info(t(translations.common.errors.load));

    yield put(getCalendarOverviewFailure());
  }
}

function* watchFetchRequests() {
  yield takeEvery(getAppointments, handleGetAppointments);
  yield takeEvery(getClientAppointments, handleGetClientAppointments);
  yield takeEvery(getScheduledAppointments, handleGetScheduledAppointments);
  yield takeEvery(getPendingAppointments, handleGetPendingAppointments);
  yield takeEvery(getAppointmentsReview, handleGetAppointmentsReview);
  yield takeEvery(getSlots, handleGetSlots);
  yield takeEvery(checkClosedDay, handleCheckClosedDay);
  yield takeEvery(getAppointment, handleGetAppointment);
  yield takeEvery(createAppointment, handleCreateAppointment);
  yield takeEvery(editAppointment, handleEditAppointment);
  yield takeEvery(deleteAppointment, handleDeleteAppointment);
  yield takeEvery(readyForClientMessage, handleReadyForClient);
  yield takeEvery(getCalendarOverview, handleGetCalendarOverview);
}

export function* appointmentsSaga() {
  yield all([fork(watchFetchRequests)]);
}
