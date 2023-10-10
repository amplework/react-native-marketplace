import { PaymentDynamicLinkData } from "types/payments";
import { getObjectFromURLParams } from "./strings";

export type OnlinePaymentOptions =
  | 'online'
  | 'card'
  | 'gpay'
  | 'apay'
  | 'google pay'
  | 'apple pay';

export const ONLINE_PAYMENT_OPTIONS: OnlinePaymentOptions[] = [
  'online',
  'card',
  'gpay',
  'google pay',
  'apay',
  'apple pay',
];

export const isOnlinePaymentOption = (value: string) =>
  ONLINE_PAYMENT_OPTIONS?.some((e: OnlinePaymentOptions) => value?.trim()?.toLowerCase()?.includes(e));

export type Currency =
  | 'usd';

export type PaymentMethodTypes =
  | 'card';

export type SetupFutureUsage =
  | 'on_session'
  | 'off_session';

type PaymentOptions = {
  merchantDisplayName: string;
  currency: Currency;
  paymentMethodTypes: PaymentMethodTypes[];
  setup_future_usage?: SetupFutureUsage;
};

export const PAYMENT_OPTIONS: PaymentOptions = {
  merchantDisplayName: 'Go Alpha Pro',
  currency: 'usd',
  paymentMethodTypes: ['card'],
  setup_future_usage: 'on_session',
};

export const getConnectAccountStatus = ({ payouts_enabled, charges_enabled }: any) =>
  payouts_enabled && charges_enabled;

export const getPaymentAmount = (amount: number) =>
  Math.round(amount) || 1;

export const getDynamicLinkNavigationParams = (link: any, userId: any) => {
  let paymentParams: PaymentDynamicLinkData = getObjectFromURLParams(link);
  let navigationOptions: any = {
    params: {
      providerId: paymentParams.providerId,
      paymentUsingDynamicLinkData: paymentParams,
    }
  };
  if (userId && paymentParams.providerId && paymentParams.clientId == userId) {
    if (paymentParams.saleId) {
      navigationOptions.route = 'SaleDetails'
      navigationOptions.params.id = paymentParams.saleId
    } else if (paymentParams.invoiceId) {
      navigationOptions.route = 'InvoiceDetails'
      navigationOptions.params.id = paymentParams.invoiceId
    } else {
      return null
    }
  } else {
    return null
  }
  return (navigationOptions)
}

export const getPaymentIcon = (item: any) => {
  switch (item.shortName) {
    case 'Cash':
      return require('assets/global/cash.png')
    case 'Card':
      return require('assets/global/creditCard.png')
    case 'Online':
      return require('assets/global/online.png')
    case 'Check':
      return require('assets/global/cheque.png')
    default:
      return require('assets/global/percent.png')
  }
};