import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { ReportApi } from 'api/report/reports';
import { t, translations } from 'locales';
import { toast } from 'shared/toast';
import { ReportPayload } from 'types/report';

import {
  generateReport,
  generateReportFailure,
  generateReportSuccess,
} from './slice';

function* handleGenerateReport({
  payload: { isSummary, ...params },
}: PayloadAction<ReportPayload>) {
  try {
    const { data } = isSummary
      ? yield call(ReportApi.generateTransactionSummary, params)
      : yield call(ReportApi.generateTransactionListing, params);

    if (params.email && data?.pdfUrl) {
      toast.info(t(translations.reports.messages.reportSended));
      yield put(generateReportSuccess(null));
    } else {
      yield put(generateReportSuccess(data?.pdfUrl));
    }
  } catch (error) {
    toast.info(t(translations.reports.errors.notFoundParameters));

    yield put(generateReportFailure());
  }
}

function* watchFetchRequests() {
  yield takeEvery(generateReport, handleGenerateReport);
}

export function* reportSaga() {
  yield all([fork(watchFetchRequests)]);
}
