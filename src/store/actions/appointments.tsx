import * as type from 'store/types';

export function checkInAppointment(action: any) {
  return {
    type: type.CHECK_IN_APPOINTMENT,
    action,
  };
}

export function confirmRequestNewClient(
  client: any,
  clientId: number,
  appointmentId: number,
  backAction?: boolean,
) {
  return {
    type: type.CONFIRM_REQUEST_NEW_CLIENT,
    action: {
      client,
      clientId,
      appointmentId,
      backAction,
    },
  };
}

export function confirmRequestExistClient(
  info: any,
  appointmentId: number,
  backAction?: boolean,
) {
  return {
    type: type.CONFIRM_REQUEST_EXIST_CLIENT,
    action: {
      info,
      appointmentId,
      backAction,
    },
  };
}

export function confirmConnectedClient(
  appointmentId: number,
  backAction?: boolean,
) {
  return {
    type: type.CONFIRM_CONNECTED_CLIENT,
    action: {
      appointmentId,
      backAction,
    },
  };
}

export function postAppointmentRequest(action: any) {
  return {
    type: type.CREATE_APPOINTMENT_REQUEST,
    action,
  };
}
