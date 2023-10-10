import { t, translations } from 'locales';
import {
  BottomMenuIcon,
  CalendarSetupIcon,
  ClosedDaysIcon,
  ExpensesTypeIcon,
  InvoicesIcon,
  NotificationSettings,
  PaymentMethodIcon,
  OnlinePaymentMethodIcon,
  ReminderIcon,
  ServiceIcon,
  SubscriptionIcon,
  TaxesIcon,
  SpecialOfferIcon,
  LoyaltyProgramIcon,
  ClientRewardIcon,
  BlackListUsers,
  DeleteGray,
  QuickPromo,
  ShareApp,
  AlphaSVG,
  VendorsIcon,
  PackageIcon
} from 'shared/icon/icons';
import { NavigationLink } from 'shared/navigationList/types';

export const SETTINGS_LINKS_PREMIUM: NavigationLink[] = [
  {
    Icon: ServiceIcon,
    title: t(translations.settings.links.servicesOffered),
    route: 'Products',
  },
  {
    Icon: PackageIcon,
    title: t(translations.settings.links.package),
    route: 'AppointmentPackages',
  },
  {
    Icon: TaxesIcon,
    title: t(translations.settings.links.taxesSettings),
    route: 'Taxes',
  },
  {
    Icon: PaymentMethodIcon,
    title: t(translations.settings.links.paymentMethods),
    route: 'PaymentMethods',
  },
  {
    Icon: ExpensesTypeIcon,
    title: t(translations.settings.links.expenseType),
    route: 'ExpenseTypes',
  },
  {
    Icon: VendorsIcon,
    title: t(translations.more.vendors),
    route: 'Vendors',
  },
  {
    Icon: ClosedDaysIcon,
    title: t(translations.settings.links.closedDays),
    route: 'ClosedDays',
  },
  {
    Icon: BottomMenuIcon,
    title: t(translations.settings.links.bottomMenu),
    route: 'BottomMenu',
  },
  {
    Icon: CalendarSetupIcon,
    title: t(translations.settings.links.calendarSetup),
    route: 'CalendarSetup',
  },
  {
    Icon: ReminderIcon,
    title: t(translations.settings.links.reminders),
    route: 'Reminders',
  },
  {
    Icon: NotificationSettings,
    title: t(translations.settings.links.notifications),
    route: 'NotificationSettings',
  },
  {
    Icon: SubscriptionIcon,
    title: t(translations.settings.links.subscription),
    route: 'Subscription',
  },
  {
    Icon: InvoicesIcon,
    title: t(translations.settings.links.invoiceNotes),
    route: 'InvoiceNotes',
  },
  {
    Icon: OnlinePaymentMethodIcon,
    title: t(translations.settings.links.onlinePayments),
    route: 'OnlinePaymentMethods',
  },
  {
    Icon: SpecialOfferIcon,
    title: t(translations.settings.links.salesSpecial),
    route: 'SalesSpecial',
  },
  {
    Icon: QuickPromo,
    title: t(translations.quickPromotion.title),
    route: 'QuickPromotion',
  },
  {
    Icon: LoyaltyProgramIcon,
    title: t(translations.settings.links.loyaltyOptions),
    route: 'LoyaltyOptions',
  },
  {
    Icon: BlackListUsers,
    title: t(translations.settings.links.blackList),
    route: 'BlackList',
  },
  {
    Icon: ServiceIcon,
    title: t(translations.settings.links.socialMedia),
    route: 'SocialMedia',
  },
  {
    Icon: ShareApp,
    title: t(translations.settings.links.shareToClients),
    route: 'InviteToAlpha',
    params: {
      routeName: 'providerInviteClients',
    }
  },
  {
    Icon: AlphaSVG,
    title: t(translations.settings.links.recommendAlpha),
    route: 'InviteToAlpha',
    params: {
      routeName: 'providerInviteProvider',
    }
  },
  {
    Icon: DeleteGray,
    title: t(translations.settings.links.deleteAccount),
    route: 'DeleteAccount',
  },
];

export const SETTINGS_LINKS_STANDARD: NavigationLink[] = [
  {
    Icon: ServiceIcon,
    title: t(translations.settings.links.servicesOffered),
    route: 'Products',
  },
  {
    Icon: TaxesIcon,
    title: t(translations.settings.links.taxesSettings),
    route: 'Taxes',
  },
  {
    Icon: PaymentMethodIcon,
    title: t(translations.settings.links.paymentMethods),
    route: 'PaymentMethods',
  },
  {
    Icon: ExpensesTypeIcon,
    title: t(translations.settings.links.expenseType),
    route: 'ExpenseTypes',
  },
  {
    Icon: ClosedDaysIcon,
    title: t(translations.settings.links.closedDays),
    route: 'ClosedDays',
  },
  {
    Icon: BottomMenuIcon,
    title: t(translations.settings.links.bottomMenu),
    route: 'BottomMenu',
  },
  {
    Icon: CalendarSetupIcon,
    title: t(translations.settings.links.calendarSetup),
    route: 'CalendarSetup',
  },
  {
    Icon: ReminderIcon,
    title: t(translations.settings.links.reminders),
    route: 'Reminders',
  },
  {
    Icon: NotificationSettings,
    title: t(translations.settings.links.notifications),
    route: 'NotificationSettings',
  },
  {
    Icon: SubscriptionIcon,
    title: t(translations.settings.links.subscription),
    route: 'Subscription',
  },
  {
    Icon: InvoicesIcon,
    title: t(translations.settings.links.invoiceNotes),
    route: 'InvoiceNotes',
  },
  {
    Icon: BlackListUsers,
    title: t(translations.settings.links.blackList),
    route: 'BlackList',
  },
  {
    Icon: ShareApp,
    title: t(translations.settings.links.shareToClients),
    route: 'InviteToAlpha',
    params: {
      routeName: 'providerInviteClients',
    }
  },
  {
    Icon: AlphaSVG,
    title: t(translations.settings.links.recommendAlpha),
    route: 'InviteToAlpha',
    params: {
      routeName: 'providerInviteProvider',
    }
  },
  {
    Icon: DeleteGray,
    title: t(translations.settings.links.deleteAccount),
    route: 'DeleteAccount',
  },
];

export const LOYALTY_OPTIONS_LINKS: NavigationLink[] = [
  {
    Icon: ClientRewardIcon,
    title: t(translations.loyaltyOptionsLinks.clientBirthdayReward),
    route: 'ClientBirthdayReward',
  },
  {
    Icon: ClientRewardIcon,
    title: t(translations.loyaltyOptionsLinks.clientLoyaltyReward),
    route: 'ClientLoyaltyReward',
  },
];

export const SETTINGS_LINKS_LITE: NavigationLink[] = [
  {
    Icon: ServiceIcon,
    title: t(translations.settings.links.servicesOffered),
    route: 'Products',
  },
  {
    Icon: PaymentMethodIcon,
    title: t(translations.settings.links.paymentMethods),
    route: 'PaymentMethods',
  },
  {
    Icon: ExpensesTypeIcon,
    title: t(translations.settings.links.expenseType),
    route: 'ExpenseTypes',
  },
  {
    Icon: ClosedDaysIcon,
    title: t(translations.settings.links.closedDays),
    route: 'ClosedDays',
  },
  {
    Icon: BottomMenuIcon,
    title: t(translations.settings.links.bottomMenu),
    route: 'BottomMenu',
  },
  {
    Icon: CalendarSetupIcon,
    title: t(translations.settings.links.calendarSetup),
    route: 'CalendarSetup',
  },
  {
    Icon: NotificationSettings,
    title: t(translations.settings.links.notifications),
    route: 'NotificationSettings',
  },
  {
    Icon: SubscriptionIcon,
    title: t(translations.settings.links.subscription),
    route: 'Subscription',
  },
  {
    Icon: BlackListUsers,
    title: t(translations.settings.links.blackList),
    route: 'BlackList',
  },
  {
    Icon: ShareApp,
    title: t(translations.settings.links.shareToClients),
    route: 'InviteToAlpha',
    params: {
      routeName: 'providerInviteClients',
    }
  },
  {
    Icon: AlphaSVG,
    title: t(translations.settings.links.recommendAlpha),
    route: 'InviteToAlpha',
    params: {
      routeName: 'providerInviteProvider',
    }
  },
  {
    Icon: DeleteGray,
    title: t(translations.settings.links.deleteAccount),
    route: 'DeleteAccount',
  },
];
