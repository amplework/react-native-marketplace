import { t, translations } from 'locales';
import { EstimateStatus } from 'types/estimates';
import { InvoiceStatus } from 'types/invoices';

export const TABS = [
  {
    name: t(translations.invoices.tabs.open),
    type: 'open',
  },
  {
    name: t(translations.invoices.tabs.overdue),
    type: 'overdue',
  },
  {
    name: t(translations.invoices.tabs.month),
    type: 'month',
  },
] as const;

export const MAX_INVOICE_IMAGES = 3;

export const INVOICES_STATUSES = [
  {
    name: t(translations.invoices.allInvoices),
    value: null,
  },
  {
    name: t(translations.invoices.status.open),
    value: 'open',
  },
  {
    name: t(translations.invoices.status.overdue),
    value: 'overdue',
  },
  {
    name: t(translations.invoices.status.paid),
    value: 'paid',
  },
];

export const ESTIMATES_STATUSES = [
  {
    name: t(translations.estimates.allEstimates),
    value: null,
  },
  {
    name: t(translations.estimates.status.open),
    value: 'open',
  },
  {
    name: t(translations.estimates.status.overdue),
    value: 'expired',
  },
];

export const ALL_INVOICE_STATUSES: InvoiceStatus[] = [
  'open',
  'overdue',
  'paid',
];

export const ALL_ESTIMATES_STATUSES: EstimateStatus[] = [
  'open',
  'expired',
  // 'approved',
  // 'rejected'
];
