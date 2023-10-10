import { t, translations } from 'locales';
import { configuredNavigations } from 'navigation/bottomBarConfigured';
import { ImageSourcePropType } from 'react-native';
import { Params } from 'service/navigator/navigator';
import {
  BottomMenuIcon,
  CashJournalsIcon,
  ClientsIcon,
  InvoicesIcon,
  EstimatesIcon,
  SalesIcon,
  SVGComponent,
  ConnectIcon,
} from 'shared/icon/icons';
import { capitalize } from 'utils/strings';

export interface ICategory {
  title: string;
  icon?: ImageSourcePropType;
  Icon?: SVGComponent;
  routePath?: string;
  route?: {
    name: string;
    params?: Params;
  };
}

export const CATEGORIES: ICategory[] = [
  {
    title: capitalize(t(translations.common.entities.sales)),
    Icon: SalesIcon,
    routePath: 'Sales',
  },
  {
    title: t(translations.more.invoices),
    Icon: InvoicesIcon,
    routePath: 'Invoices',
  },
  {
    title: t(translations.more.estimates),
    Icon: EstimatesIcon,
    routePath: 'Estimates',
  },
  {
    title: t(translations.more.clients),
    Icon: ClientsIcon,
    routePath: 'Clients',
  },
  {
    title: t(translations.more.expenses),
    icon: require('assets/bottomBar/expenses.png'),
    routePath: 'Expenses',
  },
  {
    title: t(translations.more.tasklist),
    icon: require('assets/bottomBar/tasks.png'),
    routePath: 'Tasks',
  },
  {
    title: t(translations.more.cash),
    Icon: CashJournalsIcon,
    routePath: 'CashJournals',
  },
  {
    title: t(translations.more.payments),
    icon: require('assets/bottomBar/payments.png'),
    routePath: 'Payments',
  },
  {
    title: t(translations.more.vendors),
    icon: require('assets/bottomBar/vendors.png'),
    routePath: 'Vendors',
  }, 
  {
    title:t(translations.more.checkout),
    icon: require('assets/bottomBar/checkout_icon.png'),
    routePath: 'SaleCheckout'
  },
  {
    title: t(translations.settings.links.bottomMenu),
    Icon: BottomMenuIcon,
    route: { name: 'Settings', params: { screen: 'BottomMenu' } },
  },
  {
    title: t(translations.clientConnect.title),
    Icon: ConnectIcon,
    routePath: 'ClientConnect',
  },
  {
    title: t(translations.more.howDoI),
    icon: require('assets/global/alpha.png'),
    routePath: 'HowDoI',
  },
];

export const CATEGORIES_LITE: ICategory[] = [
  {
    title: t(translations.more.clients),
    Icon: ClientsIcon,
    routePath: 'Clients',
  },
  {
    title: t(translations.more.cash),
    Icon: CashJournalsIcon,
    routePath: 'CashJournals',
  },
  {
    title: t(translations.more.expenses),
    icon: require('assets/bottomBar/expenses.png'),
    routePath: 'Expenses',
  },
  {
    title: t(translations.more.vendors),
    icon: require('assets/bottomBar/vendors.png'),
    routePath: 'Vendors',
  },
  // {
  //   title: t(translations.more.howDoI),
  //   icon: require('assets/global/alpha.png'),
  //   routePath: 'HowDoI',
  // },
];

export const getCategories = (bottomMenu: string) => {
  const bottomMenuItem = configuredNavigations[bottomMenu];

  const formattedCategories = CATEGORIES.filter(
    (category) => category.routePath !== bottomMenuItem.name,
  );

  return formattedCategories;
};

export const getCategoriesLite = (bottomMenu: string) => {
  const bottomMenuItem = configuredNavigations[bottomMenu];

  const formattedCategories = CATEGORIES_LITE.filter(
    (category) => category.routePath !== bottomMenuItem.name,
  );

  return formattedCategories;
};
