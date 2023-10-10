import { CashJournalsState } from './types';

const all = (state: CashJournalsState) => state.cashJournals;

const cashJournals = (state: CashJournalsState) => all(state).cashJournals;

const loading = (state: CashJournalsState) => all(state).loading;

const selectedStartDate = (state: CashJournalsState) => all(state).selectedStartDate;

const selectedEndDate = (state: CashJournalsState) => all(state).selectedEndDate;

const loadingMore = (state: CashJournalsState) => all(state).loadingMore;

const offset = (state: CashJournalsState) => all(state).offset;

const total = (state: CashJournalsState) => all(state).total;

const addEditLoading = (state: CashJournalsState) => all(state).addEditLoading;

const fromDate = (state: CashJournalsState) => all(state).fromDate;

const toDate = (state: CashJournalsState) => all(state).toDate;

const deleteLoading = (state: CashJournalsState) => all(state).deleteLoading;

const searchResults = (state: CashJournalsState) => all(state).searchResults;

const searchLoading = (state: CashJournalsState) => all(state).searchLoading;

const searchLoadingMore = (state: CashJournalsState) =>
  all(state).searchLoadingMore;

const searchOffset = (state: CashJournalsState) => all(state).searchOffset;

const searchTotal = (state: CashJournalsState) => all(state).searchTotal;

const searchTotalSum = (state: CashJournalsState) => all(state).searchTotalSum;

const review = (state: CashJournalsState) => all(state).review;

const reviewLoading = (state: CashJournalsState) => all(state).reviewLoading;

const reviewCashJournals = (state: CashJournalsState) =>
  all(state).reviewCashJournals;

const reviewOffset = (state: CashJournalsState) => all(state).reviewOffset;

const reviewTotal = (state: CashJournalsState) => all(state).reviewTotal;

const reviewTotalSum = (state: CashJournalsState) => all(state).reviewTotalSum;

export const cashJournalsSelectors = {
  cashJournals,
  loading,
  loadingMore,
  offset,
  total,
  addEditLoading,
  fromDate,
  toDate,
  selectedStartDate,
  selectedEndDate,
  deleteLoading,
  searchResults,
  searchLoading,
  searchLoadingMore,
  searchOffset,
  searchTotal,
  searchTotalSum,
  review,
  reviewLoading,
  reviewCashJournals,
  reviewOffset,
  reviewTotal,
  reviewTotalSum,
};
