import {
  DetailedEstimate,
  Estimate,
  EstimatesReview,
  EstimateTab,
} from 'types/estimates';

export type EstimatesState = {
  estimates: Estimates;
};

export type Estimates = {
  tab: EstimateTab;
  estimates: Estimate[];
  filteredEstimates?: Estimate[]; 
  totalSum: number;
  balanceSum: number;
  loading: boolean;
  loadingMore: boolean;
  offset: number;
  total: number;
  estimate: DetailedEstimate | null;
  estimateLoading: boolean;
  error: Error | null;
  createLoading: boolean;
  pdf: string;
  previewLoading: boolean;
  deleteLoading: boolean;
  reviewLoading: boolean;
  review: EstimatesReview | any;
  searchResults: Estimate[];
  searchLoading: boolean;
  searchLoadingMore: boolean;
  searchOffset: number;
  searchTotal: number;
  searchTotalSum: number;
  updateEstimatePaymentStatusLoading?: boolean;
};
