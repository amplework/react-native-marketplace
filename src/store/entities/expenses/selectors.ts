import { ExpensesState } from './types';

const all = (state: ExpensesState) => state.expenses;

const expenses = (state: ExpensesState) => all(state).expenses;

const loading = (state: ExpensesState) => all(state).loading;

const loadingMore = (state: ExpensesState) => all(state).loadingMore;

const expense = (state: ExpensesState) => all(state).expense;

const expenseLoading = (state: ExpensesState) => all(state).expenseLoading;

const expenseError = (state: ExpensesState) => all(state).expenseError;

const addEditLoading = (state: ExpensesState) => all(state).addEditLoading;

const fromDate = (state: ExpensesState) => all(state).fromDate;

const toDate = (state: ExpensesState) => all(state).toDate;

const total = (state: ExpensesState) => all(state).total;

const totalSum = (state: ExpensesState) => all(state).totalSum;

const offset = (state: ExpensesState) => all(state).offset;

const searchResults = (state: ExpensesState) => all(state).searchResults;

const searchLoading = (state: ExpensesState) => all(state).searchLoading;

const searchLoadingMore = (state: ExpensesState) =>
  all(state).searchLoadingMore;

const searchOffset = (state: ExpensesState) => all(state).searchOffset;

const searchTotal = (state: ExpensesState) => all(state).searchTotal;

const deleteLoading = (state: ExpensesState) => all(state).deleteLoading;

const expensesReview = (state: ExpensesState) => all(state).review;

const reviewLoading = (state: ExpensesState) => all(state).reviewLoading;

export const expensesSelectors = {
  expenses,
  loading,
  loadingMore,
  expense,
  expenseLoading,
  expenseError,
  addEditLoading,
  fromDate,
  toDate,
  total,
  offset,
  totalSum,
  searchLoading,
  searchLoadingMore,
  searchResults,
  searchOffset,
  searchTotal,
  deleteLoading,
  expensesReview,
  reviewLoading,
};
