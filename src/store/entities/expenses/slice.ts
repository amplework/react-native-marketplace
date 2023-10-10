import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LIMIT } from 'api';
import {
  DeleteExpensePayload,
  DetailedExpense,
  EditExpensePayload,
  ExpensesReview,
  ExpenseValues,
  GetExpensesRequest,
  GetExpensesSuccess,
} from 'types/Expenses';
import {
  DateRange,
  getEndOfWeek,
  getStartOfWeek,
  months,
  weeks,
} from 'utils/dates';

import { ExpensesInitialState } from './types';

const initialState: ExpensesInitialState = {
  expenses: [],
  loading: false,
  loadingMore: false,
  expense: null,
  expenseLoading: true,
  expenseError: null,
  addEditLoading: false,
  deleteLoading: false,
  total: 0,
  offset: 0,
  totalSum: 0,
  fromDate: getStartOfWeek(),
  toDate: getEndOfWeek(),
  searchResults: [],
  searchLoading: false,
  searchLoadingMore: false,
  searchOffset: 0,
  searchTotal: 0,
  review: {
    currentMonthCount: 0,
    currentMonthTotal: 0,
    currentYearTotal: 0,
    currentWeekCount: 0,
    currentWeekTotal: 0,
  },
  reviewLoading: false,
};

const expenses = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    nextWeek: (state) => {
      state.fromDate = weeks.increment(state.fromDate);
      state.toDate = weeks.increment(state.toDate);
    },
    previousWeek: (state) => {
      state.fromDate = weeks.decrement(state.fromDate);
      state.toDate = weeks.decrement(state.toDate);
    },
    nextMonth: (state) => {
      state.fromDate = months.increment(state.fromDate);
      state.toDate = months.increment(state.toDate);
    },
    previousMonth: (state) => {
      state.fromDate = months.decrement(state.fromDate);
      state.toDate = months.decrement(state.toDate);
    },
    setRangeDates: (state, { payload }: PayloadAction<DateRange>) => {
      state.fromDate = payload.fromDate;
      state.toDate = payload.toDate;
    },
    getExpenses: (state, _action: PayloadAction<GetExpensesRequest>) => {
      state.loading = true;
    },
    getExpensesSuccess: (
      state,
      { payload }: PayloadAction<GetExpensesSuccess>,
    ) => {
      state.loading = false;
      state.expenses = payload.result;
      state.total = payload.meta.totalCount;
      state.offset = payload.meta.offset;
      state.totalSum = payload.totalSum;
    },
    getExpensesFailure: (state) => {
      state.loading = false;
    },
    resetExpenses: (state) => {
      state.expenses = [];
      state.total = 0;
      state.offset = 0;
      state.totalSum = 0;
    },
    loadMoreExpenses: (state, _action: PayloadAction<GetExpensesRequest>) => {
      state.loadingMore = true;
    },
    loadMoreExpensesSuccess: (
      state,
      { payload }: PayloadAction<GetExpensesSuccess>,
    ) => {
      state.loadingMore = false;
      state.expenses.push(...payload.result);
      state.total = payload.meta.totalCount;
      state.offset = payload.meta.offset;
    },
    loadMoreExpensesFailure: (state) => {
      state.loadingMore = false;
    },
    createExpense: (state, _action: PayloadAction<ExpenseValues>) => {
      state.addEditLoading = true;
    },
    createExpenseSuccess: (state) => {
      state.addEditLoading = false;
    },
    createExpenseFailure: (state) => {
      state.addEditLoading = false;
    },
    editExpense: (state, _action: PayloadAction<EditExpensePayload>) => {
      state.addEditLoading = true;
    },
    editExpenseSuccess: (state) => {
      state.addEditLoading = false;
    },
    editExpenseFailure: (state) => {
      state.addEditLoading = false;
    },
    searchExpenses: (state, _action: PayloadAction<GetExpensesRequest>) => {
      state.searchLoading = true;
    },
    searchExpensesSuccess: (
      state,
      { payload }: PayloadAction<GetExpensesSuccess>,
    ) => {
      state.searchLoading = false;
      state.searchResults = payload.result;
      state.searchOffset = payload.meta.offset;
      state.totalSum = payload.totalSum;
      state.searchTotal = payload.meta.totalCount;
    },
    searchExpensesFailure: (state) => {
      state.searchLoading = false;
    },
    loadMoreExpensesSearchResults: (
      state,
      _action: PayloadAction<GetExpensesRequest>,
    ) => {
      state.searchLoadingMore = true;
    },
    loadMoreExpensesSearchResultsSuccess: (
      state,
      { payload }: PayloadAction<GetExpensesSuccess>,
    ) => {
      state.searchLoadingMore = false;
      state.searchResults.push(...payload.result);
      state.searchOffset = payload.meta.offset;
      state.searchTotal = payload.meta.totalCount;
    },
    loadMoreExpensesSearchResultsFailure: (state) => {
      state.searchLoadingMore = false;
    },
    resetExpensesSearchResults: (state) => {
      state.searchResults = [];
      state.searchOffset = 0;
      state.searchTotal = LIMIT;
    },
    resetQueryParameters: (state) => {
      state.fromDate = getStartOfWeek();
      state.toDate = getEndOfWeek();
    },
    getExpense: (state, _action: PayloadAction<number>) => {
      state.expenseLoading = true;
      state.expenseError = null;
    },
    getExpenseSuccess: (state, { payload }: PayloadAction<DetailedExpense>) => {
      state.expenseLoading = false;
      state.expense = payload;
    },
    getExpenseFailure: (state, { payload }: PayloadAction<Error>) => {
      state.expenseLoading = false;
      state.expenseError = payload;
    },
    deleteExpense: (state, _action: PayloadAction<DeleteExpensePayload>) => {
      state.deleteLoading = true;
    },
    deleteExpenseSuccess: (state) => {
      state.deleteLoading = false;
    },
    deleteExpenseFailure: (state) => {
      state.deleteLoading = false;
    },
    getExpensesReview: (state) => {
      state.reviewLoading = true;
    },
    getExpensesReviewSuccess: (
      state,
      { payload }: PayloadAction<ExpensesReview>,
    ) => {
      state.reviewLoading = false;
      state.review = payload;
    },
    getExpensesReviewFailure: (state) => {
      state.reviewLoading = false;
    },
  },
});

export const {
  actions: {
    nextMonth,
    nextWeek,
    previousMonth,
    previousWeek,
    getExpenses,
    getExpensesFailure,
    getExpensesSuccess,
    createExpense,
    createExpenseFailure,
    createExpenseSuccess,
    editExpense,
    loadMoreExpenses,
    loadMoreExpensesFailure,
    loadMoreExpensesSuccess,
    editExpenseFailure,
    editExpenseSuccess,
    searchExpenses,
    searchExpensesFailure,
    searchExpensesSuccess,
    loadMoreExpensesSearchResults,
    loadMoreExpensesSearchResultsFailure,
    loadMoreExpensesSearchResultsSuccess,
    resetExpensesSearchResults,
    resetQueryParameters,
    getExpense,
    getExpenseFailure,
    getExpenseSuccess,
    deleteExpense,
    deleteExpenseFailure,
    deleteExpenseSuccess,
    getExpensesReview,
    getExpensesReviewFailure,
    getExpensesReviewSuccess,
    setRangeDates,
    resetExpenses,
  },
  reducer: expensesReducer,
} = expenses;
