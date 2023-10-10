import { CashJournal, CashJournalsReview } from 'types/cashJournals';

export type CashJournalsState = {
  cashJournals: CashJournalsInitialState;
};

export type CashJournalsInitialState = {
  cashJournals: CashJournal[];
  loading: boolean;
  loadingMore: boolean;
  offset: number;
  total: number;
  addEditLoading: boolean;
  fromDate: Date;
  toDate: Date;
  selectedStartDate: any;
  selectedEndDate: any;
  deleteLoading: boolean;
  searchResults: CashJournal[];
  searchLoading: boolean;
  searchLoadingMore: boolean;
  searchOffset: number;
  searchTotal: number;
  searchTotalSum: number;
  review: CashJournalsReview;
  reviewLoading: boolean;
  reviewCashJournals: CashJournal[];
  reviewOffset: number;
  reviewTotal: number;
  reviewTotalSum: number;
};
