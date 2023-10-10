import { AppointmentsApi } from 'api/appointments';
import { SubClientsProviderApi } from 'api/subClients';
import { call, put, takeEvery } from 'redux-saga/effects';
import { Navigator } from 'service/navigator';
import { toast } from 'shared/toast';
import { getAppointment } from 'store/entities/appointments';
import { openModal } from 'store/entities/modal';

function* createAppointmentRequest(action: any) {
  try {
    const { data } = yield call(
      AppointmentsApi.createAppointmentRequest,
      action.action,
    );
    yield put({ type: 'CREATE_APPOINTMENT_REQUEST_SUCCESS' });
    yield put(openModal(data));
  } catch (error: any) {
    console.log("error === >> ", error);

    toast.info(error?.message);
    yield put({ type: 'CREATE_APPOINTMENT_REQUEST_FAILED' });
  }
}

function* confirmRequestNewClient(action: any) {
  try {
    const { client, clientId, appointmentId, backAction } = action.action;
    const { data } = yield call(SubClientsProviderApi.createSubClient, client);

    yield call(SubClientsProviderApi.connectClient, {
      id: data.id,
      clientId,
      shouldCopyData: true,
    });
    yield call(AppointmentsApi.confirmAppointment, appointmentId);
    yield put({ type: 'CONFIRM_REQUEST_NEW_CLIENT_SUCCESS' });
    yield put({ type: 'GET_APPOINTMENTS_PENDING' });
    if (backAction) {
      Navigator.goBack();
    }
    toast.info('Appointment was confirmed');
  } catch (error: any) {
    toast.info(error?.message);
    yield put({ type: 'CONFIRM_REQUEST_NEW_CLIENT_FAILED' });
  }
}

function* confirmRequestExistClient(action: any) {
  try {
    const { info, appointmentId, backAction } = action.action;
    yield call(SubClientsProviderApi.connectClient, info);
    yield call(AppointmentsApi.confirmAppointment, appointmentId);
    yield put({ type: 'CONFIRM_REQUEST_NEW_CLIENT_SUCCESS' });
    yield put({ type: 'GET_APPOINTMENTS_PENDING' });
    if (backAction) {
      Navigator.goBack();
    }
    toast.info('Appointment was confirmed');
  } catch (error: any) {
    toast.info(error?.message);
    yield put({ type: 'CONFIRM_REQUEST_NEW_CLIENT_FAILED' });
  }
}

function* confirmConnectedClient(action: any) {
  try {
    const { appointmentId, backAction } = action.action;
    yield call(AppointmentsApi.confirmAppointment, appointmentId);
    yield put({ type: 'CONFIRM_CONNECTED_CLIENT_SUCCESS' });
    yield put({ type: 'GET_APPOINTMENTS_PENDING' });
    toast.info('Appointment has been successfully confirmed!');
    if (backAction) {
      Navigator.goBack();
    }
  } catch (error: any) {
    toast.info(error?.message);
    yield put({ type: 'CONFIRM_CONNECTED_CLIENT_FAILED' });
  }
}

function* checkInAppointment(action: any) {
  try {
    yield call(AppointmentsApi.checkInAppointment, action.action);
    yield put(getAppointment(action.action));
    toast.info('You have successfully check in');
  } catch (error: any) {
    toast.info(error?.message);
    yield put({ type: 'CHECK_IN_APPOINTMENT_FAILED' });
  }
}

function* productsSaga() {
  yield takeEvery('CHECK_IN_APPOINTMENT', checkInAppointment);
  yield takeEvery('CREATE_APPOINTMENT_REQUEST', createAppointmentRequest);
  yield takeEvery('CONFIRM_REQUEST_NEW_CLIENT', confirmRequestNewClient);
  yield takeEvery('CONFIRM_REQUEST_EXIST_CLIENT', confirmRequestExistClient);
  yield takeEvery('CONFIRM_CONNECTED_CLIENT', confirmConnectedClient);
}

export default productsSaga;
