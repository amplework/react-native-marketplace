import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LIMIT } from 'api';
import {
  CashJournalsReview,
  CashJournalValues,
  DeleteCashJournalAction,
  EditCashJournalAction,
  GetCashJournalsRequest,
  GetCashJournalsResponse,
} from 'types/cashJournals';
import { getEndOfWeek, getStartOfWeek, weeks } from 'utils/dates';

import { CashJournalsInitialState } from './types';

const initialState: CashJournalsInitialState = {
  cashJournals: [],
  loading: false,
  loadingMore: false,
  offset: 0,
  total: LIMIT,
  addEditLoading: false,
  fromDate: getStartOfWeek(),
  toDate: getEndOfWeek(),
  selectedStartDate: getStartOfWeek(),
  selectedEndDate: getStartOfWeek(),
  deleteLoading: false,
  searchResults: [],
  searchLoading: false,
  searchLoadingMore: false,
  searchOffset: 0,
  searchTotal: LIMIT,
  searchTotalSum: 0,
  review: {
    cashJournals: {
      currentMonthCount: 0,
      currentMonthTotal: 0,
      currentWeekTotal: 0,
      currentYearTotal: 0,
    },
  },
  reviewLoading: false,
  reviewCashJournals: [],
  reviewOffset: 0,
  reviewTotal: LIMIT,
  reviewTotalSum: 0,
};

const cashJournals = createSlice({
  name: 'cashJournals',
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
    selectStartDate: (state, action: PayloadAction<Date>) => {
      state.selectedStartDate = action.payload;
    },
    selectEndDate: (state, action: PayloadAction<Date>) => {
      state.selectedEndDate = action.payload;
    },
    getCashJournals: (
      state,
      _action: PayloadAction<GetCashJournalsRequest>,
    ) => {
      state.loading = true;
    },
    getCashJournalsSuccess: (
      state,
      { payload }: PayloadAction<GetCashJournalsResponse>,
    ) => {
      state.loading = false;
      state.cashJournals = payload.result;

      state.offset = payload.meta.offset;
      state.total = payload.meta.totalCount;
    },
    getCashJournalsFailure: (state) => {
      state.loading = false;
    },
    loadMoreCashJournals: (
      state,
      _action: PayloadAction<GetCashJournalsRequest>,
    ) => {
      state.loadingMore = true;
    },
    loadMoreCashJournalsSuccess: (
      state,
      { payload }: PayloadAction<GetCashJournalsResponse>,
    ) => {
      state.loadingMore = false;
      state.cashJournals.push(...payload.result);

      state.offset = payload.meta.offset;
      state.total = payload.meta.totalCount;
    },
    loadMoreCashJournalsFailure: (state) => {
      state.loadingMore = false;
    },
    createCashJournal: (state, _action: PayloadAction<CashJournalValues>) => {
      state.addEditLoading = true;
    },
    createCashJournalSuccess: (state) => {
      state.addEditLoading = false;
    },
    createCashJournalFailure: (state) => {
      state.addEditLoading = false;
    },
    editCashJournal: (state, _action: PayloadAction<EditCashJournalAction>) => {
      state.addEditLoading = true;
    },
    editCashJournalSuccess: (state) => {
      state.addEditLoading = false;
    },
    editCashJournalFailure: (state) => {
      state.addEditLoading = false;
    },
    deleteCashJournal: (
      state,
      _action: PayloadAction<DeleteCashJournalAction>,
    ) => {
      state.deleteLoading = true;
    },
    deleteCashJournalSuccess: (state) => {
      state.deleteLoading = false;
    },
    deleteCashJournalFailure: (state) => {
      state.deleteLoading = false;
    },
    searchCashJournals: (
      state,
      _action: PayloadAction<GetCashJournalsRequest>,
    ) => {
      state.searchLoading = true;
    },
    searchCashJournalsSuccess: (
      state,
      { payload }: PayloadAction<GetCashJournalsResponse>,
    ) => {
      state.searchLoading = false;
      state.searchResults = payload.result;
      state.searchTotalSum = payload.totalSum;

      state.searchOffset = payload.meta.offset;
      state.searchTotal = payload.meta.totalCount;
    },
    searchCashJournalsFailure: (state) => {
      state.searchLoading = false;
    },
    loadMoreCashJournalsSearchResults: (
      state,
      _action: PayloadAction<GetCashJournalsRequest>,
    ) => {
      state.searchLoadingMore = true;
    },
    loadMoreCashJournalsSearchResultsSuccess: (
      state,
      { payload }: PayloadAction<GetCashJournalsResponse>,
    ) => {
      state.searchLoadingMore = false;
      state.searchResults.push(...payload.result);
      state.searchTotalSum = payload.totalSum;

      state.searchOffset = payload.meta.offset;
      state.searchTotal = payload.meta.totalCount;
    },
    loadMoreCashJournalsSearchResultsFailure: (state) => {
      state.searchLoadingMore = false;
    },
    resetCashJournalsSearchResults: (state) => {
      state.searchResults = [];

      state.searchOffset = 0;
      state.searchTotal = LIMIT;
    },
    getCashJournalsReview: (state) => {
      state.reviewLoading = true;
    },
    getCashJournalsReviewSuccess: (
      state,
      action: PayloadAction<CashJournalsReview>,
    ) => {
      state.reviewLoading = false;
      state.review = action.payload;
    },
    getCashJournalsReviewFailure: (state) => {
      state.reviewLoading = false;
    },
    getReviewCashJournals: (
      state,
      _action: PayloadAction<GetCashJournalsRequest>,
    ) => {
      state.loading = true;
    },
    getReviewCashJournalsSuccess: (
      state,
      { payload }: PayloadAction<GetCashJournalsResponse>,
    ) => {
      state.loading = false;
      state.reviewCashJournals = payload.result;
      state.reviewTotalSum = payload.totalSum;

      state.reviewOffset = payload.meta.offset;
      state.reviewTotal = payload.meta.totalCount;
    },
    getReviewCashJournalsFailure: (state) => {
      state.loading = false;
    },
    loadMoreReviewCashJournals: (
      state,
      _action: PayloadAction<GetCashJournalsRequest>,
    ) => {
      state.loadingMore = true;
    },
    loadMoreReviewCashJournalsSuccess: (
      state,
      { payload }: PayloadAction<GetCashJournalsResponse>,
    ) => {
      state.loadingMore = false;
      state.reviewCashJournals.push(...payload.result);
      state.reviewTotalSum = payload.totalSum;

      state.reviewOffset = payload.meta.offset;
      state.reviewTotal = payload.meta.totalCount;
    },
    loadMoreReviewCashJournalsFailure: (state) => {
      state.loadingMore = false;
    },
  },
});

export const {
  actions: {
    nextWeek,
    previousWeek,
    selectEndDate,
    selectStartDate,
    getCashJournals,
    getCashJournalsFailure,
    getCashJournalsSuccess,
    loadMoreCashJournals,
    loadMoreCashJournalsFailure,
    loadMoreCashJournalsSuccess,
    createCashJournal,
    createCashJournalFailure,
    createCashJournalSuccess,
    editCashJournal,
    editCashJournalFailure,
    editCashJournalSuccess,
    deleteCashJournal,
    deleteCashJournalFailure,
    deleteCashJournalSuccess,
    loadMoreCashJournalsSearchResults,
    loadMoreCashJournalsSearchResultsFailure,
    loadMoreCashJournalsSearchResultsSuccess,
    searchCashJournals,
    searchCashJournalsFailure,
    searchCashJournalsSuccess,
    resetCashJournalsSearchResults,
    getCashJournalsReview,
    getCashJournalsReviewFailure,
    getCashJournalsReviewSuccess,
    getReviewCashJournals,
    getReviewCashJournalsFailure,
    getReviewCashJournalsSuccess,
    loadMoreReviewCashJournals,
    loadMoreReviewCashJournalsFailure,
    loadMoreReviewCashJournalsSuccess,
  },
  reducer: cashJournalsReducer,
} = cashJournals;
