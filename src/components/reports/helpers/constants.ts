import { translations } from 'locales';
import { Period, SendOption, Transaction } from 'types/report';

type TransactionType = {
  label: string;
  value: Transaction;
};

type DateOption = {
  label: string;
  value: Period;
};

type SenderOption = {
  label: string;
  value: SendOption;
};

export const TYPE_OF_TRANSACTIONS: TransactionType[] = [
  { label: translations.reports.allTransactions, value: 'all' },
  { label: translations.reports.onlySales, value: 'sales' },
  { label: translations.reports.onlyInvoices, value: 'invoices' },
  { label: translations.reports.onlyPayments, value: 'payments' },
  { label: translations.reports.onlyExpenses, value: 'expenses' },
  { label: translations.reports.onlyCashJournals, value: 'cashJournal' },
  { label: translations.reports.totalIncomeDetails, value: 'totalIncomeDetails' },
  { label: translations.reports.netIncomeDetails, value: 'netIncomeDetails' },
];

export const TYPE_OF_TRANSACTIONS_LITE_USER: TransactionType[] = [
  { label: translations.reports.allTransactions, value: 'all' },
  { label: translations.reports.onlyExpenses, value: 'expenses' },
  { label: translations.reports.onlyCashJournals, value: 'cashJournal' },
];

export const SENDER_OPTIONS: SenderOption[] = [
  { label: translations.reports.displayReport, value: 'show' },
  { label: translations.reports.emailReport, value: 'send' },
];

export const DATE_OPTIONS: DateOption[] = [
  {
    label: translations.common.today,
    value: 'today',
  },
  {
    label: translations.common.thisWeek,
    value: 'week',
  },
  {
    label: translations.common.thisMonth,
    value: 'month',
  },
  {
    label: translations.common.year,
    value: 'year',
  },
  {
    label: translations.common.lastYear,
    value: 'lastYear',
  },
  {
    label: translations.reports.enterDate,
    value: 'date',
  },
];
