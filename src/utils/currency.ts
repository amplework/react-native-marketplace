import 'intl';
import 'intl/locale-data/jsonp/en';

import { isString } from './strings';

export const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatCurrency = (currency: string, value: number | string) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(isString(value) ? parseFloat(value) : value);