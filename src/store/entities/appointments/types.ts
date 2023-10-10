import { Meta } from 'types/api';
import {
  Appointment,
  AppointmentsReview,
  CalendarOverview,
  PendingAppointment,
  Slot,
} from 'types/appointments';

export type AppointmentsState = {
  appointments: AppointmentsSlice;
};

export type AppointmentsSlice = {
  appointments: Appointment[];
  clientAppointments: Appointment[],
  scheduledAppointments: any;
  loading: boolean;
  slots: Slot[];
  isClosedDay: boolean;
  isWorkingDay: boolean;
  slotsLoading: boolean;
  appointment: Appointment | null;
  appointmentLoading: boolean;
  addEditLoading: boolean;
  deleteLoading: boolean;
  readyBtnLoading?: boolean;
  pendingAppointments: PendingAppointment[];
  pendingAppointmentsLoading: boolean;
  meta: Meta;
  metaPending: Meta;
  review: AppointmentsReview;
  reviewLoading: boolean;
  error: Error | null;
  overview: CalendarOverview;
  overviewLoading: boolean;
};
