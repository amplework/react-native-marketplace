import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { HomeApi } from 'api/home';
import { t, translations } from 'locales';
import { toast } from 'shared/toast';
import { PerformanceRequest } from 'types/home';

import {
  getPerformancePreview,
  getPerformancePreviewFailure,
  getPerformancePreviewSuccess,
  getPerformanceReview,
  getPerformanceReviewFailure,
  getPerformanceReviewSuccess,
} from './slice';

function* handleGetPerformancePreview(
  action: PayloadAction<PerformanceRequest>,
) {
  try {
    const { data } = yield call(HomeApi.getPerformancePreview, action.payload);

    yield put(getPerformancePreviewSuccess(data));
  } catch (error) {    
    toast.info(t(translations.common.errors.load));

    yield put(getPerformancePreviewFailure());
  }
}

function* handleGetPerformanceReview(
  action: PayloadAction<PerformanceRequest>,
) {  
  try {
    const { data } = yield call(HomeApi.getPerformanceReview, action.payload);
    yield put(getPerformanceReviewSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));
    yield put(getPerformanceReviewFailure());
  }
}

function* watchFetchRequests() {
  yield takeEvery(getPerformancePreview, handleGetPerformancePreview);
  yield takeEvery(getPerformanceReview, handleGetPerformanceReview);
}

export function* homeSaga() {
  yield all([fork(watchFetchRequests)]);
}
