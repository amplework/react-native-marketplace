import {
  DetailedInvoice,
  Invoice,
  InvoicesReview,
  InvoiceTab,
} from 'types/invoices';

export type InvoicesState = {
  invoices: Invoices;
};

export type Invoices = {
  tab: InvoiceTab;
  invoices: Invoice[];
  totalSum: number;
  balanceSum: number;
  loading: boolean;
  loadingMore: boolean;
  offset: number;
  total: number;
  invoice: DetailedInvoice | null;
  invoiceLoading: boolean;
  error: Error | null;
  createLoading: boolean;
  pdf: string;
  previewLoading: boolean;
  deleteLoading: boolean;
  reviewLoading: boolean;
  review: InvoicesReview;
  searchResults: Invoice[];
  searchLoading: boolean;
  searchLoadingMore: boolean;
  searchOffset: number;
  searchTotal: number;
  searchTotalSum: number;
  updateInvoicePaymentStatusLoading?: boolean;
};
