import { PayloadAction } from '@reduxjs/toolkit';
import { ExpensesApi } from 'api/expenses';
import I18n from 'locales';
import moment from 'moment';
import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { Navigator } from 'service/navigator';
import { toast } from 'shared/toast';
import {
  DeleteExpensePayload,
  DetailedExpense,
  EditExpensePayload,
  ExpenseValues,
  GetExpensesRequest,
} from 'types/expenses';
import { getEndOfWeek, getStartOfWeek } from 'utils/dates';
import { capitalize } from 'utils/strings';

import { expensesSelectors } from './selectors';
import {
  createExpense,
  createExpenseFailure,
  createExpenseSuccess,
  deleteExpense,
  deleteExpenseFailure,
  deleteExpenseSuccess,
  editExpense,
  editExpenseFailure,
  editExpenseSuccess,
  getExpense,
  getExpenseFailure,
  getExpenses,
  getExpensesFailure,
  getExpensesReview,
  getExpensesReviewFailure,
  getExpensesReviewSuccess,
  getExpensesSuccess,
  getExpenseSuccess,
  loadMoreExpenses,
  loadMoreExpensesFailure,
  loadMoreExpensesSearchResults,
  loadMoreExpensesSearchResultsFailure,
  loadMoreExpensesSearchResultsSuccess,
  loadMoreExpensesSuccess,
  resetExpenses,
  searchExpenses,
  searchExpensesFailure,
  searchExpensesSuccess,
} from './slice';

function* handleGetExpenses({ payload }: PayloadAction<GetExpensesRequest>) {
  try {
    yield put(resetExpenses());
    const { data } = yield call(ExpensesApi.getExpenses, payload);

    yield put(getExpensesSuccess(data));
  } catch (error) {
    toast.info(I18n.t('common.errors.load'));

    yield put(getExpensesFailure());
  }
}

function* handleLoadMoreExpenses({
  payload,
}: PayloadAction<GetExpensesRequest>) {
  try {
    const { data } = yield call(ExpensesApi.getExpenses, payload);

    yield put(loadMoreExpensesSuccess(data));
  } catch (error) {
    toast.info(I18n.t('common.errors.load'));

    yield put(loadMoreExpensesFailure());
  }
}

function* handleCreateExpense({ payload }: PayloadAction<ExpenseValues>) {
  try {
    const fromDate = getStartOfWeek();
    const toDate = getEndOfWeek();

    yield call(ExpensesApi.createExpense, { 
      ...payload,
      date: payload.date,
      total: parseFloat(payload.total),
    });

    toast.info(
      I18n.t('common.messages.creation', {
        entity: I18n.t('common.entities.expense'),
      }),
    );

    yield put(createExpenseSuccess());
    Navigator.goBack();

    yield put(
      getExpenses({
        fromDate: moment(fromDate).format('YYYY-MM-DD'),
        toDate: moment(toDate).format('YYYY-MM-DD'),
      }),
    );
  } catch (error) {
    toast.info(
      I18n.t('common.errors.process', {
        process: I18n.t('common.processes.create'),
        entity: I18n.t('common.entities.expense'),
      }),
    );

    yield put(createExpenseFailure());
  }
}

function* handleEditExpense({ payload }: PayloadAction<EditExpensePayload>) {
  try {
    const { id }: DetailedExpense = yield select(expensesSelectors.expense);
    const fromDate: Date = yield select(expensesSelectors.fromDate);
    const toDate: Date = yield select(expensesSelectors.toDate);

    const { values, onSuccess } = payload;

    yield call(ExpensesApi.editExpense, {
      ...values,
      id,
      date: moment(values.date, 'YYYY-MM-DD').format('YYYY-MM-DD'),
      total: parseFloat(values.total),
    });

    toast.info(
      I18n.t('common.messages.edition', {
        entity: capitalize(I18n.t('common.entities.expense')),
      }),
    );

    yield put(editExpenseSuccess());

    if (onSuccess) {
      yield onSuccess();
    }

    yield put(
      getExpenses({
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
      }),
    );
  } catch (error) {
    toast.info(
      I18n.t('common.errors.process', {
        process: I18n.t('common.processes.edit'),
        entity: I18n.t('common.entities.expense'),
      }),
    );

    yield put(editExpenseFailure());
  }
}

function* handleDeleteExpense({
  payload,
}: PayloadAction<DeleteExpensePayload>) {
  try {
    const { id, onSuccess } = payload;
    const fromDate: Date = yield select(expensesSelectors.fromDate);
    const toDate: Date = yield select(expensesSelectors.toDate);

    yield call(ExpensesApi.deleteExpense, id);

    toast.info(
      I18n.t('common.messages.deletion', {
        entity: capitalize(I18n.t('common.entities.expense')),
      }),
    );

    yield put(deleteExpenseSuccess());
    Navigator.goBack();

    if (onSuccess) {
      yield onSuccess();
    }

    yield put(
      getExpenses({
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
      }),
    );
  } catch (error) {
    toast.info(
      I18n.t('common.errors.process', {
        process: I18n.t('common.processes.delete'),
        entity: I18n.t('common.entities.expense'),
      }),
    );

    yield put(deleteExpenseFailure());
  }
}

function* handleSearchExpenses({ payload }: PayloadAction<GetExpensesRequest>) {
  try {
    const { data } = yield call(ExpensesApi.getExpenses, payload);

    yield put(searchExpensesSuccess(data));
  } catch (error) {
    toast.info(I18n.t('common.errors.load'));

    yield put(searchExpensesFailure());
  }
}

function* handleLoadMoreExpensesSearchResults({
  payload,
}: PayloadAction<GetExpensesRequest>) {
  try {
    const { data } = yield call(ExpensesApi.getExpenses, payload);

    yield put(loadMoreExpensesSearchResultsSuccess(data));
  } catch (error) {
    toast.info(I18n.t('common.errors.load'));

    yield put(loadMoreExpensesSearchResultsFailure());
  }
}

function* handleGetExpense(action: PayloadAction<number>) {
  try {
    const { data } = yield call(ExpensesApi.getExpense, action.payload);

    yield put(getExpenseSuccess(data));
  } catch (error) {
    toast.info(I18n.t('common.errors.load'));

    yield put(getExpenseFailure(new Error(error.message)));
  }
}

function* handleGetExpensesReview() {
  try {
    const {
      data: { expenses },
    } = yield call(ExpensesApi.getExpensesReview);

    yield put(getExpensesReviewSuccess(expenses));
  } catch (error) {
    toast.info(I18n.t('common.errors.load'));

    yield put(getExpensesReviewFailure());
  }
}

function* watchFetchRequests() {
  yield takeEvery(getExpenses, handleGetExpenses);
  yield takeEvery(loadMoreExpenses, handleLoadMoreExpenses);
  yield takeEvery(createExpense, handleCreateExpense);
  yield takeEvery(editExpense, handleEditExpense);
  yield takeEvery(searchExpenses, handleSearchExpenses);
  yield takeEvery(
    loadMoreExpensesSearchResults,
    handleLoadMoreExpensesSearchResults,
  );
  yield takeEvery(getExpense, handleGetExpense);
  yield takeEvery(deleteExpense, handleDeleteExpense);
  yield takeEvery(getExpensesReview, handleGetExpensesReview);
}

export function* expensesSaga() {
  yield all([fork(watchFetchRequests)]);
}