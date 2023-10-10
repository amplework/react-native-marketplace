import { InvoicesState } from './types';

const all = (state: InvoicesState) => state.invoices;

const tab = (state: InvoicesState) => all(state).tab;

const invoices = (state: InvoicesState) => all(state).invoices;

const totalSum = (state: InvoicesState) => all(state).totalSum;

const balanceSum = (state: InvoicesState) => all(state).balanceSum;

const loading = (state: InvoicesState) => all(state).loading;

const loadingMore = (state: InvoicesState) => all(state).loadingMore;

const offset = (state: InvoicesState) => all(state).offset;

const total = (state: InvoicesState) => all(state).total;

const invoice = (state: InvoicesState) => all(state).invoice;

const invoiceLoading = (state: InvoicesState) => all(state).invoiceLoading;

const error = (state: InvoicesState) => all(state).error;

const createLoading = (state: InvoicesState) => all(state).createLoading;

const pdf = (state: InvoicesState) => all(state).pdf;

const previewLoading = (state: InvoicesState) => all(state).previewLoading;

const deleteLoading = (state: InvoicesState) => all(state).deleteLoading;

const review = (state: InvoicesState) => all(state).review;

const reviewLoading = (state: InvoicesState) => all(state).reviewLoading;

const searchResults = (state: InvoicesState) => all(state).searchResults;

const searchLoading = (state: InvoicesState) => all(state).searchLoading;

const searchLoadingMore = (state: InvoicesState) =>
  all(state).searchLoadingMore;

const searchOffset = (state: InvoicesState) => all(state).searchOffset;

const searchTotal = (state: InvoicesState) => all(state).searchTotal;

const searchTotalSum = (state: InvoicesState) => all(state).searchTotalSum;

const updateInvoicePaymentStatusLoading = (state: InvoicesState) => all(state).updateInvoicePaymentStatusLoading;

export const invoicesSelectors = {
  tab,
  invoices,
  totalSum,
  balanceSum,
  loading,
  loadingMore,
  offset,
  total,
  invoice,
  invoiceLoading,
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
  updateInvoicePaymentStatusLoading,
};
