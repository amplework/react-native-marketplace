import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LIMIT } from 'api';
import { EditRequest, PaginationListRequest } from 'types/api';
import {
  Appointment,
  AppointmentRequest,
  AppointmentsRequest,
  AppointmentsResponse,
  AppointmentsReview,
  CalendarOverview,
  DeleteAppointmentAction,
  PendingAppointmentResponse,
  ReadyForClientAction,
  ScheduledAppointmentsRequest,
  ScheduledAppointmentsResponse,
  SlotsRequest,
  SlotsResponse,
} from 'types/appointments';

import { AppointmentsSlice } from './types';

const initialState: AppointmentsSlice = {
  appointments: [],
  clientAppointments: [],
  scheduledAppointments: [],
  loading: false,
  slots: [],
  isClosedDay: false,
  isWorkingDay: false,
  slotsLoading: false,
  pendingAppointments: [],
  pendingAppointmentsLoading: false,
  appointment: null,
  appointmentLoading: false,
  addEditLoading: false,
  deleteLoading: false,
  readyBtnLoading: false,
  meta: {
    limit: LIMIT,
    offset: 0,
    count: 0,
    totalCount: 0,
  },
  metaPending: {
    limit: LIMIT,
    offset: 0,
    count: 0,
    totalCount: 0,
  },
  review: {
    appointments: {
      currentMonthCount: 0,
      currentWeekCount: 0,
    },
    products: [],
  },
  reviewLoading: false,
  error: null,
  overview: {
    pendingAppointmentsCount: 0,
    busyScheduleThisWeek: 0,
    busyScheduleToday: 0,
    daysWithoutBooking: 0,
  },
  overviewLoading: false,
};

const appointments = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    getAppointments: (state, _action: PayloadAction<AppointmentsRequest>) => {
      state.loading = true;
    },
    getAppointmentsSuccess: (
      state,
      { payload }: PayloadAction<AppointmentsResponse>,
    ) => {
      state.loading = false;
      state.meta = payload.meta;
      state.appointments = !payload.meta.offset
        ? payload.result
        : [...state.appointments, ...payload.result];
    },
    getAppointmentsFailure: (state) => {
      state.loading = false;
    },
    getClientAppointments: (
      state,
      _action: PayloadAction<AppointmentsRequest>,
    ) => {
      state.loading = true;
    },
    getClientAppointmentsSuccess: (
      state,
      { payload }: PayloadAction<AppointmentsResponse>,
    ) => {
      state.loading = false;
      state.meta = payload.meta;
      state.clientAppointments = !payload.meta.offset
        ? payload.result
        : [...state.appointments, ...payload.result];
    },
    getClientAppointmentsFailure: (state) => {
      state.loading = false;
    },
    getScheduledAppointments: (
      state,
      _action: PayloadAction<ScheduledAppointmentsRequest>,
    ) => {
      state.loading = true;
    },
    getScheduledAppointmentsSuccess: (
      state,
      { payload }: PayloadAction<ScheduledAppointmentsResponse>,
    ) => {
      state.loading = false;
      state.scheduledAppointments = payload;
    },
    getScheduledAppointmentsFailure: (state) => {
      state.loading = false;
    },
    getPendingAppointments: (
      state,
      _action: PayloadAction<PaginationListRequest | undefined>,
    ) => {
      state.pendingAppointmentsLoading = true;
    },
    getPendingAppointmentsSuccess: (
      state,
      { payload }: PayloadAction<PendingAppointmentResponse>,
    ) => {
      state.pendingAppointmentsLoading = false;
      state.metaPending = payload.meta;
      state.pendingAppointments = !payload.meta.offset
        ? payload.result
        : [...state.pendingAppointments, ...payload.result];
    },
    getPendingAppointmentsFailure: (state) => {
      state.pendingAppointmentsLoading = false;
    },
    getSlots: (state, _action: PayloadAction<SlotsRequest>) => {
      state.slotsLoading = true;
      state.slots = [];
      // state.isClosedDay = false;
      state.isWorkingDay = false;
    },
    getSlotsSuccess: (state, { payload }: PayloadAction<SlotsResponse>) => {
      state.slotsLoading = false;
      state.slots = payload.slots;
      // state.isClosedDay = payload.isClosedDay;
      state.isWorkingDay = payload.isWorkingDay;
    },
    getSlotsFailure: (state) => {
      state.slotsLoading = false;
      state.slots = [];
      // state.isClosedDay = false;
      state.isWorkingDay = false;
    },
    checkClosedDay: (state, _action: PayloadAction<SlotsRequest>) => {
      state.isClosedDay = false;
    },
    checkClosedDaySuccess: (state, { payload }: PayloadAction<any>) => {
      state.isClosedDay = payload.isClosedDay;
    },
    checkClosedDayFailure: (state) => {
      state.isClosedDay = false;
    },
    getAppointmentsReview: (state) => {
      state.reviewLoading = true;
    },
    getAppointmentsReviewSuccess: (
      state,
      { payload }: PayloadAction<AppointmentsReview>,
    ) => {
      state.reviewLoading = false;
      state.review = payload;
    },
    getAppointmentsReviewFailure: (state) => {
      state.reviewLoading = false;
    },
    getAppointment: (state, _action: PayloadAction<number>) => {
      state.appointmentLoading = true;
      state.error = null;
    },
    getAppointmentSuccess: (state, { payload }: PayloadAction<Appointment>) => {
      state.appointmentLoading = false;
      state.appointment = payload;
    },
    getAppointmentFailure: (state, action: PayloadAction<Error>) => {
      state.appointmentLoading = false;
      state.error = action.payload;

      state.appointment = null;
    },
    createAppointment: (state, _action: PayloadAction<AppointmentRequest>) => {
      state.addEditLoading = true;
    },
    createAppointmentSuccess: (state) => {
      state.addEditLoading = false;
    },
    createAppointmentFailure: (state) => {
      state.addEditLoading = false;
    },
    editAppointment: (
      state,
      _action: PayloadAction<EditRequest<AppointmentRequest>>,
    ) => {
      state.addEditLoading = true;
    },
    editAppointmentSuccess: (state) => {
      state.addEditLoading = false;
    },
    editAppointmentFailure: (state) => {
      state.addEditLoading = false;
    },
    deleteAppointment: (
      state,
      _action: PayloadAction<DeleteAppointmentAction>,
    ) => {
      state.deleteLoading = true;
    },
    deleteAppointmentSuccess: (state) => {
      state.deleteLoading = false;
    },
    deleteAppointmentFailure: (state) => {
      state.deleteLoading = false;
    },
    readyForClientMessage: (
      state,
      _action: PayloadAction<ReadyForClientAction>,
    ) => {
      state.readyBtnLoading = true;
    },
    readyForClientMessageSuccess: (state) => {
      state.readyBtnLoading = false;
    },
    readyForClientMessageFailure: (state) => {
      state.readyBtnLoading = false;
    },
    getCalendarOverview: (state, _action: PayloadAction<string>) => {
      state.overviewLoading = true;
    },
    getCalendarOverviewSuccess: (
      state,
      action: PayloadAction<CalendarOverview>,
    ) => {
      state.overviewLoading = false;
      state.overview = action.payload;
    },
    getCalendarOverviewFailure: (state) => {
      state.overviewLoading = false;
    },
    clearAppointments: (state) => {
      state.appointments = [];
      state.clientAppointments = [];
    },
  },
});

export const {
  actions: {
    getAppointment,
    clearAppointments,
    getAppointmentFailure,
    getAppointmentSuccess,
    getClientAppointments,
    getClientAppointmentsFailure,
    getClientAppointmentsSuccess,
    getAppointments,
    getAppointmentsFailure,
    getScheduledAppointments,
    getScheduledAppointmentsSuccess,
    getScheduledAppointmentsFailure,
    getAppointmentsReview,
    getAppointmentsReviewFailure,
    getAppointmentsReviewSuccess,
    getAppointmentsSuccess,
    getPendingAppointments,
    getPendingAppointmentsFailure,
    getPendingAppointmentsSuccess,
    getSlots,
    getSlotsFailure,
    getSlotsSuccess,
    checkClosedDay,
    checkClosedDaySuccess,
    checkClosedDayFailure,
    createAppointment,
    createAppointmentSuccess,
    createAppointmentFailure,
    editAppointment,
    editAppointmentFailure,
    editAppointmentSuccess,
    deleteAppointment,
    deleteAppointmentFailure,
    deleteAppointmentSuccess,
    readyForClientMessage,
    readyForClientMessageSuccess,
    readyForClientMessageFailure,
    getCalendarOverview,
    getCalendarOverviewFailure,
    getCalendarOverviewSuccess,
  },
  reducer: appointmentsReducer,
} = appointments;
