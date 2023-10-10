import { PayloadHandlers } from 'utils/store';

import { Pagination } from './api';

export type CashJournalValues = {
  total: string;
  description: string;
  date: any;
  notes: string;
};

export type CashJournalRequest = {
  total: number;
  description: string;
  date: string;
  notes?: string;
};

export type CashJournal = CashJournalRequest & {
  id: number;
};

export type GetCashJournalsRequest = {
  offset: number;
  query?: string;
  fromDate: string;
  toDate: string | null;
};

export type GetCashJournalsResponse = Pagination<CashJournal[]> & {
  totalSum: number;
};

export type EditCashJournalAction = PayloadHandlers & {
  id: number;
  values: CashJournalValues;
};

export type DeleteCashJournalAction = PayloadHandlers & {
  id: number;
};

export type SearchCashJournalsValues = {
  query: string;
  fromDate: Date;
  toDate: Date;
};

export type CashJournalsReview = {
  cashJournals: {
    currentMonthCount: number;
    currentMonthTotal: number;
    currentWeekTotal: number;
    currentYearTotal: number;
  };
};
