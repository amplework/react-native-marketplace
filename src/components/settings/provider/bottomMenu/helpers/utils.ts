import { t, translations } from 'locales';
import {
  CashJournalsIcon,
  ClientsIcon,
  InvoicesIcon,
  SaleCheckout,
  SalesIcon,
} from 'shared/icon/icons';
import { capitalize } from 'utils/strings';

export const MENU_ITEMS = [
  { label: capitalize(t(translations.common.entities.sales)), value: 'sales' },
  {
    label: capitalize(t(translations.common.entities.invoices)),
    value: 'invoices',
  },
  {
    label: capitalize(t(translations.common.entities.cashJournals)),
    value: 'cashJournals',
  },
  {
    label: capitalize(t(translations.common.entities.clients)),
    value: 'clients',
  },
  {
    label: capitalize(t(translations.common.entities.saleCheckout)),
    value: 'saleCheckout',
  },
];

export const MENU_ITEMS_LITE = [
  {
    label: capitalize(t(translations.common.entities.cashJournals)),
    value: 'cashJournals',
  },
  {
    label: capitalize(t(translations.common.entities.clients)),
    value: 'clients',
  },
];

export const getConfiguredIcon = (iconName: string) => {  
  switch (iconName) {
    case 'sales':
      return SalesIcon;
    case 'invoices':
      return InvoicesIcon;
    case 'clients':
      return ClientsIcon;
    case 'cashJournals':
      return CashJournalsIcon;
    case 'saleCheckout':
        return SaleCheckout;
    default:
      return SalesIcon;
  }
};
