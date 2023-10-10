import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReportPayload } from 'types/report';

import { ReportSlice } from './types';

const initialState: ReportSlice = {
  loading: false,
  pdfUrl: null,
};

const report = createSlice({
  name: 'report',
  initialState,
  reducers: {
    generateReport: (state, _action: PayloadAction<ReportPayload>) => {
      state.loading = true;
    },
    generateReportSuccess: (
      state,
      { payload }: PayloadAction<string | null>,
    ) => {
      state.loading = false;
      state.pdfUrl = payload;
    },
    generateReportFailure: (state) => {
      state.loading = false;
      state.pdfUrl = null;
    },
    resetReport: (state) => {
      state.pdfUrl = null;
    },
  },
});

export const {
  actions: {
    generateReportFailure,
    generateReport,
    generateReportSuccess,
    resetReport,
  },
  reducer: reportReducer,
} = report;
