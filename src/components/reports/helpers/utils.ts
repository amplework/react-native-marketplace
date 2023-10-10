import { t, translations } from 'locales';
import { NavigationLink } from 'shared/navigationList/types';
import { ReportValues } from 'types/report';
import {
  formatApiDate,
  getEndOfMonth,
  getEndOfWeek,
  getEndOfYear,
  getStartOfMonth,
  getStartOfWeek,
  getStartOfYear,
  parseDate,
  years,
} from 'utils/dates';

export const REPORTS_LINKS: NavigationLink[] = [
  {
    title: t(translations.reports.transactionListing),
    route: 'TransactionListing',
  },
  {
    title: t(translations.reports.transactionSummary),
    route: 'TransactionSummary',
  },
];

export const getDateRange = ({ period, fromDate, toDate }: ReportValues) => {
  switch (period) {
    case 'week':
      return {
        fromDate: formatApiDate(getStartOfWeek()),
        toDate: formatApiDate(getEndOfWeek()),
      };
    case 'month':
      return {
        fromDate: formatApiDate(getStartOfMonth()),
        toDate: formatApiDate(getEndOfMonth()),
      };
    case 'year':
      return {
        fromDate: formatApiDate(getStartOfYear()),
        toDate: formatApiDate(getEndOfYear()),
      };
    case 'lastYear': {
      const lastYear = years.decrement(parseDate());

      return {
        fromDate: formatApiDate(getStartOfYear(lastYear)),
        toDate: formatApiDate(getEndOfYear(lastYear)),
      };
    }
    default:
      return {
        fromDate: formatApiDate(fromDate),
        toDate: formatApiDate(toDate),
      };
  }
};

export const formatReport = (values: ReportValues) => ({
  ...getDateRange(values),
  typeOfTransaction: values.typeOfTransaction,
  email: values?.email,
});
