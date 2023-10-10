import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment-timezone';
import {
  PerformancePreview,
  PerformanceRequest,
  PerformanceReview,
} from 'types/home';
import { LargeDateRange } from 'utils/dates';

import { HomeSlice } from './types';

const initialState: HomeSlice = {
  showProgressModal: false,
  isModalOpened: false,
  selectedDate: null,
  performancePreview: {
    busySchedule: 0,
    totalIncome: 0,
    wantedToEarn: 0,
  },
  performancePreviewLoading: false,
  period: 'week',
  isPeriodModalOpened: false,
  performanceReview: {
    activeClients: 0,
    appointmentEntered: 0,
    busySchedule: 0,
    goalCompleted: 0,
    netIncome: 0,
    newClients: 0,
    pastDueInvoices: 0,
    totalCashCollected: 0,
    totalExpenses: 0,
    totalIncome: 0,
    wantedToEarn: 0,
    weekAlreadyBooked: 0,
  },
  performanceReviewLoading: false,
  managedSlots: []
};

const home = createSlice({
  name: 'home',
  initialState,
  reducers: {
    openDatepickerModal: (state) => {
      state.isModalOpened = true;
    },
    closeDatepickerModal: (state) => {
      state.isModalOpened = false;
    },
    openProgressModal: (state) => {      
      state.showProgressModal = true;
    },
    closeProgressModal: (state) => {
      state.showProgressModal = false;
    },
    selectHomeDate: (state, action: PayloadAction<moment.Moment>) => {
      state.selectedDate = action.payload;
    },
    getPerformancePreview: (
      state,
      _action: PayloadAction<PerformanceRequest>,
    ) => {
      state.performancePreviewLoading = true;
    },
    getPerformancePreviewSuccess: (
      state,
      action: PayloadAction<PerformancePreview>,
    ) => {
      state.performancePreviewLoading = false;
      state.performancePreview = action.payload;
    },
    getPerformancePreviewFailure: (state) => {
      state.performancePreviewLoading = false;
    },
    selectHomePeriod: (state, action: PayloadAction<LargeDateRange>) => {
      state.period = action.payload;
    },
    openPeriodModal: (state) => {
      state.isPeriodModalOpened = true;
    },
    closePeriodModal: (state) => {
      state.isPeriodModalOpened = false;
    },
    getPerformanceReview: (
      state,
      _action: PayloadAction<PerformanceRequest>,
    ) => {
      state.performanceReviewLoading = true;
    },
    getPerformanceReviewSuccess: (
      state,
      action: PayloadAction<PerformanceReview>,
    ) => {
      state.performanceReviewLoading = false;
      state.performanceReview = action.payload;
    },
    getPerformanceReviewFailure: (state) => {
      state.performanceReviewLoading = false;
    },
    setManagedSlots: (state, action) => {
      state.managedSlots = action.payload;
    }
  },
});

export const {
  actions: {
    closeDatepickerModal,
    openDatepickerModal,
    selectHomeDate,
    getPerformancePreview,
    getPerformancePreviewFailure,
    getPerformancePreviewSuccess,
    selectHomePeriod,
    closePeriodModal,
    openPeriodModal,
    getPerformanceReview,
    openProgressModal,
    closeProgressModal,
    getPerformanceReviewFailure,
    getPerformanceReviewSuccess,
    setManagedSlots
  },
  reducer: homeReducer,
} = home;
