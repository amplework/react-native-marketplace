import { AppointmentsState } from './types';

const all = (state: AppointmentsState) => state.appointments;

const appointments = (state: AppointmentsState) => all(state).appointments;

const clientAppointments = (state: AppointmentsState) => all(state).clientAppointments;

const scheduledAppointments = (state: AppointmentsState) => all(state).scheduledAppointments;

const loading = (state: AppointmentsState) => all(state).loading;

const meta = (state: AppointmentsState) => all(state).meta;

const total = (state: AppointmentsState) => meta(state).totalCount;

const appointment = (state: AppointmentsState) => all(state).appointment;

const appointmentLoading = (state: AppointmentsState) =>
  all(state).appointmentLoading;

const addEditLoading = (state: AppointmentsState) => all(state).addEditLoading;

const deleteLoading = (state: AppointmentsState) => all(state).deleteLoading;

const readyBtnLoading = (state: AppointmentsState) => all(state).readyBtnLoading;

const slots = (state: AppointmentsState) => all(state).slots;

const slotsLoading = (state: AppointmentsState) => all(state).slotsLoading;

const isClosedDay = (state: AppointmentsState) => all(state).isClosedDay;

const isWorkingDay = (state: AppointmentsState) => all(state).isWorkingDay;

const pendingAppointments = (state: AppointmentsState) =>
  all(state).pendingAppointments;

const pendingAppointmentsLoading = (state: AppointmentsState) =>
  all(state).pendingAppointmentsLoading;

const metaPending = (state: AppointmentsState) => all(state).metaPending;

const review = (state: AppointmentsState) => all(state).review;

const reviewLoading = (state: AppointmentsState) => all(state).reviewLoading;

const overview = (state: AppointmentsState) => all(state).overview;

const error = (state: AppointmentsState) => all(state).error;

const overviewLoading = (state: AppointmentsState) =>
  all(state).overviewLoading;

export const appointmentsSelector = {
  appointments,
  clientAppointments, 
  loading,
  meta,
  total,
  appointment,
  appointmentLoading,
  pendingAppointments,
  scheduledAppointments,
  pendingAppointmentsLoading,
  metaPending,
  addEditLoading,
  deleteLoading,
  slots,
  slotsLoading,
  isClosedDay,
  isWorkingDay,
  review,
  reviewLoading,
  overview,
  overviewLoading,
  error,
  readyBtnLoading
};
