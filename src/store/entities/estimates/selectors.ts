import { EstimatesState } from './types';

const all = (state: EstimatesState) => state.estimates;

const tab = (state: EstimatesState) => all(state).tab;

const estimates = (state: EstimatesState) => all(state).estimates;

const totalSum = (state: EstimatesState) => all(state).totalSum;

const balanceSum = (state: EstimatesState) => all(state).balanceSum;

const loading = (state: EstimatesState) => all(state).loading;

const loadingMore = (state: EstimatesState) => all(state).loadingMore;

const offset = (state: EstimatesState) => all(state).offset;

const total = (state: EstimatesState) => all(state).total;

const estimate = (state: EstimatesState) => all(state).estimate;

const estimateLoading = (state: EstimatesState) => all(state).estimateLoading;

const error = (state: EstimatesState) => all(state).error;

const createLoading = (state: EstimatesState) => all(state).createLoading;

const pdf = (state: EstimatesState) => all(state).pdf;

const previewLoading = (state: EstimatesState) => all(state).previewLoading;

const deleteLoading = (state: EstimatesState) => all(state).deleteLoading;

const review = (state: EstimatesState) => all(state).review;

const filteredEstimates = (state: EstimatesState) => all(state).filteredEstimates;

const reviewLoading = (state: EstimatesState) => all(state).reviewLoading;

const searchResults = (state: EstimatesState) => all(state).searchResults;

const searchLoading = (state: EstimatesState) => all(state).searchLoading;

const searchLoadingMore = (state: EstimatesState) =>
  all(state).searchLoadingMore;

const searchOffset = (state: EstimatesState) => all(state).searchOffset;

const searchTotal = (state: EstimatesState) => all(state).searchTotal;

const searchTotalSum = (state: EstimatesState) => all(state).searchTotalSum;

const updateEstimatePaymentStatusLoading = (state: EstimatesState) => all(state).updateEstimatePaymentStatusLoading;

export const estimatesSelectors = {
  tab,
  estimates,
  totalSum,
  balanceSum,
  loading,
  loadingMore,
  offset,
  total,
  estimate,
  estimateLoading,
  error,
  createLoading,
  pdf,
  previewLoading,
  deleteLoading,
  review,
  reviewLoading,
  searchResults,
  searchLoading,
  searchLoadingMore,
  searchOffset,
  searchTotal,
  searchTotalSum,
  filteredEstimates,
  updateEstimatePaymentStatusLoading,
};
