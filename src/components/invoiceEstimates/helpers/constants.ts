import { t, translations } from 'locales';
import { EstimateStatus } from 'types/estimates';

export const TABS = [
  {
    name: t(translations.estimates.tabs.open),
    type: 'open',
  },
  {
    name: t(translations.estimates.tabs.overdue),
    type: 'expired',
  },
  {
    name: t(translations.estimates.tabs.month),
    type: 'month',
  },
] as const;

export const MAX_ESTIMATE_IMAGES = 3;

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
  {
    name: t(translations.estimates.status.paid),
    value: 'paid',
  },
];

export const ALL_INVOICE_STATUSES: EstimateStatus[] = [
  'open',
  'expired',
  'paid',
];
