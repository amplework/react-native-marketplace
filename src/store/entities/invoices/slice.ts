import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LIMIT } from 'api';
import {
  CreateInvoiceAction,
  DeleteInvoiceAction,
  DetailedInvoice,
  EditInvoiceAction,
  GetInvoicesRequest,
  GetInvoicesResponse,
  InvoicePreview,
  InvoicesReview,
  InvoiceTab,
  InvoiceValues,
} from 'types/invoices';

import { Invoices } from './types';

const initialState: Invoices = {
  tab: 'open',
  invoices: [],
  totalSum: 0,
  balanceSum: 0,
  loading: false,
  loadingMore: false,
  offset: 0,
  total: LIMIT,
  invoice: null,
  invoiceLoading: true,
  error: null,
  createLoading: false,
  pdf: '',
  previewLoading: false,
  deleteLoading: false,
  reviewLoading: false,
  review: {
    invoices: {
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
  updateInvoicePaymentStatusLoading: false,
};

const invoices = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    switchTab: (state, action: PayloadAction<InvoiceTab>) => {
      state.tab = action.payload;
    },
    resetInvoices: (state) => {
      state.invoices = [];
      state.totalSum = 0;
      state.balanceSum = 0;

      state.offset = 0;
      state.total = LIMIT;
    },
    getInvoices: (state, _action: PayloadAction<GetInvoicesRequest>) => {
      state.loading = true;
    },
    getInvoicesSuccess: (
      state,
      { payload }: PayloadAction<GetInvoicesResponse>,
    ) => {      
      state.loading = false;
      state.invoices = payload.result.sort((a: any, b:any) => a?.number - b?.number).reverse();
      state.totalSum = payload.totalSum;
      state.balanceSum = payload.balanceSum;

      state.offset = payload.meta.offset;
      state.total = payload.meta.totalCount;
    },
    getInvoicesFailure: (state) => {
      state.loading = false;
    },
    loadMoreInvoices: (state, _action: PayloadAction<GetInvoicesRequest>) => {
      state.loadingMore = true;
    },
    loadMoreInvoicesSuccess: (
      state,
      { payload }: PayloadAction<GetInvoicesResponse>,
    ) => {
      state.loadingMore = false;
      state.invoices.push(...payload.result.sort((a: any, b:any) => a?.number - b?.number).reverse());
      state.totalSum = payload.totalSum;
      state.balanceSum = payload.balanceSum;

      state.offset = payload.meta.offset;
      state.total = payload.meta.totalCount;
    },
    loadMoreInvoicesFailure: (state) => {
      state.loadingMore = false;
    },
    getInvoice: (state, _action: PayloadAction<number>) => {
      state.invoiceLoading = true;
      state.error = null;
    },
    getInvoiceSuccess: (state, action: PayloadAction<DetailedInvoice>) => {
      state.invoiceLoading = false;
      state.invoice = action.payload;
    },
    getInvoiceFailure: (state, action: PayloadAction<Error>) => {
      state.invoiceLoading = false;
      state.error = action.payload;
      state.invoice = null;
    },
    createInvoice: (state, _action: PayloadAction<CreateInvoiceAction>) => {
      state.createLoading = true;
    },
    createInvoiceForClient: (state, _action: PayloadAction<CreateInvoiceAction>) => {
      state.createLoading = true;
    },
    createInvoiceSuccess: (state) => {
      state.createLoading = false;
    },
    createInvoiceFailure: (state) => {
      state.createLoading = false;
    },
    deleteInvoice: (state, _action: PayloadAction<DeleteInvoiceAction>) => {
      state.deleteLoading = true;
    },
    deleteInvoiceSuccess: (state) => {
      state.deleteLoading = false;
    },
    deleteInvoiceFailure: (state) => {
      state.deleteLoading = false;
    },
    editInvoice: (state, _action: PayloadAction<EditInvoiceAction>) => {
      state.createLoading = true;
    },
    editInvoiceSuccess: (state) => {
      state.createLoading = false;
    },
    editInvoiceFailure: (state) => {
      state.createLoading = false;
    },
    getInvoicesReview: (state) => {
      state.reviewLoading = true;
    },
    getInvoicesReviewSuccess: (
      state,
      action: PayloadAction<InvoicesReview>,
    ) => {
      state.reviewLoading = false;
      state.review = action.payload;
    },
    getInvoicesReviewFailure: (state) => {
      state.reviewLoading = false;
    },
    searchInvoices: (state, _action: PayloadAction<GetInvoicesRequest>) => {
      state.searchLoading = true;
    },
    searchInvoicesSuccess: (
      state,
      { payload }: PayloadAction<GetInvoicesResponse>,
    ) => {
      state.searchLoading = false;
      state.searchResults = payload.result;
      state.searchTotalSum = payload.totalSum;

      state.searchOffset = payload.meta.offset;
      state.searchTotal = payload.meta.totalCount;
    },
    searchInvoicesFailure: (state) => {
      state.searchLoading = false;
    },
    loadMoreInvoicesSearchResults: (
      state,
      _action: PayloadAction<GetInvoicesRequest>,
    ) => {
      state.searchLoadingMore = true;
    },
    loadMoreInvoicesSearchResultsSuccess: (
      state,
      { payload }: PayloadAction<GetInvoicesResponse>,
    ) => {
      state.searchLoadingMore = false;
      state.searchResults.push(...payload.result);
      state.searchTotalSum = payload.totalSum;

      state.searchOffset = payload.meta.offset;
      state.searchTotal = payload.meta.totalCount;
    },
    loadMoreInvoicesSearchResultsFailure: (state) => {
      state.searchLoadingMore = false;
    },
    resetInvoicesSearchResults: (state) => {
      state.searchResults = [];

      state.searchOffset = 0;
      state.searchTotal = LIMIT;
    },
    shareInvoice: (_state, _action: PayloadAction<any>) => {},
    previewInvoice: (state, _action: PayloadAction<InvoiceValues>) => {
      state.previewLoading = true;
    },
    previewInvoiceSuccess: (state, action: PayloadAction<InvoicePreview>) => {
      state.previewLoading = false;
      state.pdf = action.payload.pdf;
    },
    previewInvoiceFailure: (state) => {
      state.previewLoading = false;
    },
    closeInvoicePreview: (state) => {
      state.pdf = '';
    },
    updateInvoicePaymentStatus: (state, _action: PayloadAction<any>) => {
      state.updateInvoicePaymentStatusLoading = true;
    },
    updateInvoicePaymentStatusSuccess: (state, action: PayloadAction<any>) => {
      state.updateInvoicePaymentStatusLoading = false;
    },
    updateInvoicePaymentStatusFailure: (state) => {
      state.updateInvoicePaymentStatusLoading = false;
    },
  },
});

export const {
  actions: {
    switchTab,
    resetInvoices,
    createInvoice,
    createInvoiceForClient,
    createInvoiceFailure,
    createInvoiceSuccess,
    getInvoices,
    getInvoicesFailure,
    getInvoicesSuccess,
    loadMoreInvoices,
    loadMoreInvoicesFailure,
    loadMoreInvoicesSuccess,
    getInvoice,
    getInvoiceFailure,
    getInvoiceSuccess,
    deleteInvoice,
    deleteInvoiceFailure,
    deleteInvoiceSuccess,
    editInvoice,
    editInvoiceFailure,
    editInvoiceSuccess,
    getInvoicesReview,
    getInvoicesReviewFailure,
    getInvoicesReviewSuccess,
    loadMoreInvoicesSearchResults,
    loadMoreInvoicesSearchResultsFailure,
    loadMoreInvoicesSearchResultsSuccess,
    searchInvoices,
    searchInvoicesFailure,
    searchInvoicesSuccess,
    resetInvoicesSearchResults,
    shareInvoice,
    closeInvoicePreview,
    previewInvoice,
    previewInvoiceSuccess,
    previewInvoiceFailure,
    updateInvoicePaymentStatus,
    updateInvoicePaymentStatusSuccess,
    updateInvoicePaymentStatusFailure,
  },
  reducer: invoicesReducer,
} = invoices;
