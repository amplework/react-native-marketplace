import { ReportState } from './types';

const all = (state: ReportState) => state.report;

const pdfUrl = (state: ReportState) => all(state).pdfUrl;

const loading = (state: ReportState) => all(state).loading;

export const reportSelectors = {
  pdfUrl,
  loading,
};
