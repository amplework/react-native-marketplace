export type ReportRequest = {
  fromDate: string;
  toDate: string;
  typeOfTransaction: string;
  email?: string | null;
};

export type ReportPayload = ReportRequest & {
  isSummary?: boolean;
};

export type Period = 'today' | 'week' | 'year' | 'month' | 'date' | 'lastYear';

export type Transaction =
  | 'all'
  | 'sales'
  | 'invoices'
  | 'payments'
  | 'expenses'
  | 'cashJournal'
  | 'totalIncomeDetails'
  | 'netIncomeDetails';

export type SendOption = 'show' | 'send';

export type ReportValues = {
  fromDate: Date;
  toDate: Date;
  period: Period;
  sendOption: SendOption;
  typeOfTransaction: Transaction;
  email?: string | null;
};
