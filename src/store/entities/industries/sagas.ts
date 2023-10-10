import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import { IndustriesApi } from 'api/industries';

import {
  getIndustries,
  getIndustriesFailure,
  getIndustriesSuccess,
} from './slice';

function* handleGetIndustries() {
  try {
    const { data } = yield call(IndustriesApi.getIndustries);

    yield put(getIndustriesSuccess(data));
  } catch (error) {
    yield put(getIndustriesFailure());
  }
}

function* watchFetchRequests() {
  yield takeEvery(getIndustries, handleGetIndustries);
}

export function* industriesSaga() {
  yield all([fork(watchFetchRequests)]);
}
