import { PayloadAction } from '@reduxjs/toolkit';
import { CashJournalsApi } from 'api/cashJournals';
import { t, translations } from 'locales';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { Navigator } from 'service/navigator';
import { toast } from 'shared/toast';
import {
  CashJournalValues,
  DeleteCashJournalAction,
  EditCashJournalAction,
  GetCashJournalsRequest,
} from 'types/cashJournals';
import { getEndOfWeek, getStartOfWeek } from 'utils/dates';

import { formatCashJournal } from './formatters';
import { cashJournalsSelectors } from './selectors';
import {
  createCashJournal,
  createCashJournalFailure,
  createCashJournalSuccess,
  deleteCashJournal,
  deleteCashJournalFailure,
  deleteCashJournalSuccess,
  editCashJournal,
  editCashJournalFailure,
  editCashJournalSuccess,
  getCashJournals,
  getCashJournalsFailure,
  getCashJournalsReview,
  getCashJournalsReviewFailure,
  getCashJournalsReviewSuccess,
  getCashJournalsSuccess,
  getReviewCashJournals,
  getReviewCashJournalsFailure,
  getReviewCashJournalsSuccess,
  loadMoreCashJournals,
  loadMoreCashJournalsFailure,
  loadMoreCashJournalsSearchResults,
  loadMoreCashJournalsSearchResultsFailure,
  loadMoreCashJournalsSearchResultsSuccess,
  loadMoreCashJournalsSuccess,
  loadMoreReviewCashJournals,
  loadMoreReviewCashJournalsFailure,
  loadMoreReviewCashJournalsSuccess,
  searchCashJournals,
  searchCashJournalsFailure,
  searchCashJournalsSuccess,
} from './slice';

function* handleGetCashJournals({
  payload,
}: PayloadAction<GetCashJournalsRequest>) {
  try {
    const { data } = yield call(CashJournalsApi.getCashJournals, payload);

    yield put(getCashJournalsSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(getCashJournalsFailure());
  }
}

function* handleLoadMoreCashJournals({
  payload,
}: PayloadAction<GetCashJournalsRequest>) {
  try {
    const { data } = yield call(CashJournalsApi.getCashJournals, payload);

    yield put(loadMoreCashJournalsSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(loadMoreCashJournalsFailure());
  }
}

function* handleCreateCashJournal({
  payload,
}: PayloadAction<CashJournalValues>) {
  try {
    const fromDate = yield select(cashJournalsSelectors.selectedStartDate);
    const toDate = yield select(cashJournalsSelectors.selectedEndDate);
    
    yield call(CashJournalsApi.create, formatCashJournal(payload));

    toast.info(
      t(translations.common.messages.creation, {
        entity: t(translations.common.entities.cashJournal),
      }),
    );

    yield put(createCashJournalSuccess());
    Navigator.goBack();

    yield put(
      getCashJournals({
        offset: 0,
        fromDate: moment(fromDate).format('YYYY-MM-DD'),
        toDate: moment(toDate).format('YYYY-MM-DD'),
      }),
    );
  } catch (error) {
    toast.info(
      t(translations.common.errors.process, {
        process: t(translations.common.processes.create),
        entity: t(translations.common.entities.cashJournal),
      }),
    );

    yield put(createCashJournalFailure());
  }
}

function* handleEditCashJournal({
  payload,
}: PayloadAction<EditCashJournalAction>) {
  try {
    const fromDate: Date = yield select(cashJournalsSelectors.fromDate);
    const toDate: Date = yield select(cashJournalsSelectors.toDate);

    const { data } = yield call(
      CashJournalsApi.editCashJournal,
      payload.id,
      formatCashJournal(payload.values),
    );

    toast.info(
      t(translations.common.messages.edition, {
        entity: t(translations.common.entities.cashJournal),
      }),
    );

    yield put(editCashJournalSuccess());

    Navigator.navigate('CashJournalDetails', { journal: data });

    if (payload.onSuccess) {
      yield payload.onSuccess();
    }

    yield put(
      getCashJournals({
        offset: 0,
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
      }),
    );
  } catch (error) {
    toast.info(
      t(translations.common.errors.process, {
        process: t(translations.common.processes.edit),
        entity: t(translations.common.entities.cashJournal),
      }),
    );

    yield put(editCashJournalFailure());
  }
}

function* handleDeleteCashJournal({
  payload,
}: PayloadAction<DeleteCashJournalAction>) {
  const fromDate: Date = yield select(cashJournalsSelectors.fromDate);
  const toDate: Date = yield select(cashJournalsSelectors.toDate);

  try {
    yield call(CashJournalsApi.deleteCashJournal, payload.id);

    toast.info(
      t(translations.common.messages.deletion, {
        entity: t(translations.common.entities.cashJournal),
      }),
    );

    yield put(deleteCashJournalSuccess());

    Navigator.goBack();

    if (payload.onSuccess) {
      yield payload.onSuccess();
    }
  
    yield put(
      getCashJournals({
        offset: 0,
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
      }),
    );
  } catch (error) {
    toast.info(
      t(translations.common.errors.process, {
        process: t(translations.common.processes.delete),
        entity: t(translations.common.entities.cashJournal),
      }),
    );

    yield put(deleteCashJournalFailure());
  }
}

function* handleSearchCashJournals({
  payload,
}: PayloadAction<GetCashJournalsRequest>) {
  try {
    const { data } = yield call(CashJournalsApi.getCashJournals, payload);

    yield put(searchCashJournalsSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(searchCashJournalsFailure());
  }
}

function* handleLoadMoreCashJournalsSearchResults({
  payload,
}: PayloadAction<GetCashJournalsRequest>) {
  try {
    const { data } = yield call(CashJournalsApi.getCashJournals, payload);

    yield put(loadMoreCashJournalsSearchResultsSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(loadMoreCashJournalsSearchResultsFailure());
  }
}

function* handleGetCashJournalsReview() {
  try {
    const { data } = yield call(CashJournalsApi.getCashJournalsReview);

    yield put(getCashJournalsReviewSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(getCashJournalsReviewFailure());
  }
}

function* handleGetReviewCashJournals({
  payload,
}: PayloadAction<GetCashJournalsRequest>) {
  try {
    const { data } = yield call(CashJournalsApi.getCashJournals, payload);

    yield put(getReviewCashJournalsSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(getReviewCashJournalsFailure());
  }
}

function* handleLoadMoreReviewCashJournals({
  payload,
}: PayloadAction<GetCashJournalsRequest>) {
  try {
    const { data } = yield call(CashJournalsApi.getCashJournals, payload);

    yield put(loadMoreReviewCashJournalsSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(loadMoreReviewCashJournalsFailure());
  }
}

function* watchFetchRequests() {
  yield takeEvery(getCashJournals, handleGetCashJournals);
  yield takeEvery(loadMoreCashJournals, handleLoadMoreCashJournals);

  yield takeEvery(createCashJournal, handleCreateCashJournal);
  yield takeEvery(editCashJournal, handleEditCashJournal);
  yield takeEvery(deleteCashJournal, handleDeleteCashJournal);

  yield takeEvery(searchCashJournals, handleSearchCashJournals);
  yield takeEvery(
    loadMoreCashJournalsSearchResults,
    handleLoadMoreCashJournalsSearchResults,
  );

  yield takeEvery(getCashJournalsReview, handleGetCashJournalsReview);
  yield takeEvery(getReviewCashJournals, handleGetReviewCashJournals);
  yield takeEvery(loadMoreReviewCashJournals, handleLoadMoreReviewCashJournals);
}

export function* cashJournalsSaga() {
  yield all([fork(watchFetchRequests)]);
}
