import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LIMIT } from 'api';
import {
  CreateEstimateAction,
  DeleteEstimateAction,
  DetailedEstimate,
  EditEstimateAction,
  GetEstimatesRequest,
  GetEstimatesResponse,
  EstimatePreview,
  EstimatesReview,
  EstimateTab,
  EstimateValues,
  UpdateEstimateStatus,
} from 'types/estimates';

import { Estimates } from './types';

const initialState: Estimates = {
  tab: 'open',
  estimates: [],
  filteredEstimates: [],
  totalSum: 0,
  balanceSum: 0,
  loading: false,
  loadingMore: false,
  offset: 0,
  total: LIMIT,
  estimate: null,
  estimateLoading: true,
  error: null,
  createLoading: false,
  pdf: '',
  previewLoading: false,
  deleteLoading: false,
  reviewLoading: false,
  review: {
    estimates: {
      currentMonthCount: 0,
      currentMonthTotal: 0,
      currentYearTotal: 0,
      openBalanceTotal: 0,
      openCount: 0,
      overdueBalanceTotal: 0,
      overdueCount: 0,
    },
  },
  searchResults: [],
  searchLoading: false,
  searchLoadingMore: false,
  searchOffset: 0,
  searchTotal: LIMIT,
  searchTotalSum: 0,
  updateEstimatePaymentStatusLoading: false,
};

const estimates = createSlice({
  name: 'estimates',
  initialState,
  reducers: {
    switchTab: (state, action: PayloadAction<EstimateTab>) => {
      state.tab = action.payload;
    },
    resetEstimates: (state) => {
      state.estimates = [];
      state.totalSum = 0;
      state.balanceSum = 0;

      state.offset = 0;
      state.total = LIMIT;
    },
    getEstimates: (state, _action: PayloadAction<GetEstimatesRequest>) => {
      state.loading = true;
    },
    getEstimatesSuccess: (
      state,
      { payload }: PayloadAction<GetEstimatesResponse>,
    ) => {      
      state.loading = false;
      state.estimates = payload.result;
      state.totalSum = payload.totalSum;
      state.balanceSum = payload.balanceSum;

      state.offset = payload.meta.offset;
      state.total = payload.meta.totalCount;
    },
    getEstimatesFailure: (state) => {
      state.loading = false;
    },
    getFilteredEstimates: (state, _action: PayloadAction<GetEstimatesRequest>) => {
      state.loading = true;
    },
    getFilteredEstimatesSuccess: (
      state,
      { payload }: PayloadAction<GetEstimatesResponse>,
    ) => {      
      state.loading = false;
      state.filteredEstimates = payload.result;
      // state.totalSum = payload.totalSum;
      // state.balanceSum = payload.balanceSum;

      // state.offset = payload.meta.offset;
      // state.total = payload.meta.totalCount;
    },
    getFilteredEstimatesFailure: (state) => {
      state.loading = false;
    },
    loadMoreEstimates: (state, _action: PayloadAction<GetEstimatesRequest>) => {
      state.loadingMore = true;
    },
    loadMoreEstimatesSuccess: (
      state,
      { payload }: PayloadAction<GetEstimatesResponse>,
    ) => {
      state.loadingMore = false;
      state.estimates.push(...payload.result);
      state.totalSum = payload.totalSum;
      state.balanceSum = payload.balanceSum;

      state.offset = payload.meta.offset;
      state.total = payload.meta.totalCount;
    },
    loadMoreEstimatesFailure: (state) => {
      state.loadingMore = false;
    },
    getEstimate: (state, _action: PayloadAction<number>) => {
      state.estimateLoading = true;
      state.error = null;
    },
    getEstimateSuccess: (state, action: PayloadAction<DetailedEstimate>) => {
      state.estimateLoading = false;
      state.estimate = action.payload;
    },
    getEstimateFailure: (state, action: PayloadAction<Error>) => {
      state.estimateLoading = false;
      state.error = action.payload;
      state.estimate = null;
    },
    convertEstimateToInvoice: (state, _action: PayloadAction<number>) => {
      state.estimateLoading = true;
      // state.error = null;
    },
    convertEstimateToInvoiceSuccess: (state) => {
      state.estimateLoading = false;
      // state.estimate = action.payload;
    },
    convertEstimateToInvoiceFailure: (state) => {
      state.estimateLoading = false;
      // state.error = action.payload;
      // state.estimate = null;
    },
    createEstimate: (state, _action: PayloadAction<CreateEstimateAction>) => {
      state.createLoading = true;
    },
    createEstimateForClient: (state, _action: PayloadAction<CreateEstimateAction>) => {
      state.createLoading = true;
    },
    createEstimateSuccess: (state) => {
      state.createLoading = false;
    },
    createEstimateFailure: (state) => {
      state.createLoading = false;
    },
    deleteEstimate: (state, _action: PayloadAction<DeleteEstimateAction>) => {
      state.deleteLoading = true;
    },
    deleteEstimateSuccess: (state) => {
      state.deleteLoading = false;
    },
    deleteEstimateFailure: (state) => {
      state.deleteLoading = false;
    },
    editEstimate: (state, _action: PayloadAction<EditEstimateAction>) => {
      state.createLoading = true;
    },
    editEstimateSuccess: (state) => {
      state.createLoading = false;
    },
    editEstimateFailure: (state) => {
      state.createLoading = false;
    },
    updateEstimateStatus: (state, _action: PayloadAction<UpdateEstimateStatus>) => {
      state.estimateLoading = true;
    },
    updateEstimateStatusSuccess: (state) => {
      state.estimateLoading = false;
    },
    updateEstimateStatusFailure: (state) => {
      state.estimateLoading = false;
    },
    getEstimatesReview: (state) => {
      state.reviewLoading = true;
    },
    getEstimatesReviewSuccess: (
      state,
      action: PayloadAction<EstimatesReview | any>,
    ) => {
      state.reviewLoading = false;
      state.review = action.payload;
    },
    getEstimatesReviewFailure: (state) => {
      state.reviewLoading = false;
    },
    searchEstimates: (state, _action: PayloadAction<GetEstimatesRequest>) => {
      state.searchLoading = true;
    },
    searchEstimatesSuccess: (
      state,
      { payload }: PayloadAction<GetEstimatesResponse>,
    ) => {
      state.searchLoading = false;
      state.searchResults = payload.result;
      state.searchTotalSum = payload.totalSum;

      state.searchOffset = payload.meta.offset;
      state.searchTotal = payload.meta.totalCount;
    },
    searchEstimatesFailure: (state) => {
      state.searchLoading = false;
    },
    loadMoreEstimatesSearchResults: (
      state,
      _action: PayloadAction<GetEstimatesRequest>,
    ) => {
      state.searchLoadingMore = true;
    },
    loadMoreEstimatesSearchResultsSuccess: (
      state,
      { payload }: PayloadAction<GetEstimatesResponse>,
    ) => {
      state.searchLoadingMore = false;
      state.searchResults.push(...payload.result);
      state.searchTotalSum = payload.totalSum;

      state.searchOffset = payload.meta.offset;
      state.searchTotal = payload.meta.totalCount;
    },
    loadMoreEstimatesSearchResultsFailure: (state) => {
      state.searchLoadingMore = false;
    },
    resetEstimatesSearchResults: (state) => {
      state.searchResults = [];

      state.searchOffset = 0;
      state.searchTotal = LIMIT;
    },
    shareEstimate: (_state, _action: PayloadAction<any>) => {},
    previewEstimate: (state, _action: PayloadAction<EstimateValues>) => {
      state.previewLoading = true;
    },
    previewEstimateSuccess: (state, action: PayloadAction<EstimatePreview>) => {
      state.previewLoading = false;
      state.pdf = action.payload.pdf;
    },
    previewEstimateFailure: (state) => {
      state.previewLoading = false;
    },
    closeEstimatePreview: (state) => {
      state.pdf = '';
    },
    updateEstimatePaymentStatus: (state, _action: PayloadAction<any>) => {
      state.updateEstimatePaymentStatusLoading = true;
    },
    updateEstimatePaymentStatusSuccess: (state, action: PayloadAction<any>) => {
      state.updateEstimatePaymentStatusLoading = false;
    },
    updateEstimatePaymentStatusFailure: (state) => {
      state.updateEstimatePaymentStatusLoading = false;
    },
  },
});

export const {
  actions: {
    switchTab,
    resetEstimates,
    createEstimate,
    createEstimateForClient,
    createEstimateFailure,
    createEstimateSuccess,
    getEstimates,
    getEstimatesFailure,
    getEstimatesSuccess,
    getFilteredEstimates,
    getFilteredEstimatesSuccess,
    getFilteredEstimatesFailure,
    loadMoreEstimates,
    loadMoreEstimatesFailure,
    loadMoreEstimatesSuccess,
    getEstimate,
    getEstimateFailure,
    getEstimateSuccess,
    deleteEstimate,
    deleteEstimateFailure,
    deleteEstimateSuccess,
    editEstimate,
    editEstimateFailure,
    editEstimateSuccess,
    getEstimatesReview,
    getEstimatesReviewFailure,
    getEstimatesReviewSuccess,
    loadMoreEstimatesSearchResults,
    loadMoreEstimatesSearchResultsFailure,
    loadMoreEstimatesSearchResultsSuccess,
    searchEstimates,
    searchEstimatesFailure,
    searchEstimatesSuccess,
    resetEstimatesSearchResults,
    shareEstimate,
    closeEstimatePreview,
    previewEstimate,
    previewEstimateSuccess,
    previewEstimateFailure,
    updateEstimateStatus,
    updateEstimateStatusSuccess,
    updateEstimateStatusFailure,
    updateEstimatePaymentStatus,
    convertEstimateToInvoice,
    convertEstimateToInvoiceSuccess,
    convertEstimateToInvoiceFailure,
    updateEstimatePaymentStatusSuccess,
    updateEstimatePaymentStatusFailure,
  },
  reducer: estimatesReducer,
} = estimates;
