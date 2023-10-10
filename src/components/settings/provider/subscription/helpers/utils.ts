import { t, translations } from 'locales';
import moment from 'moment';
import { Subscription } from 'react-native-iap';
import { SubscriptionDetails } from 'types/subscription';
import { formatCurrency } from 'utils/currency';
import { getDifference } from 'utils/dates';
import { isIOS } from 'utils/device';
import { capitalize } from 'utils/strings';

export const getLeftNumbersOfSubscription = (
  subscription: any | null,
) => {
  if (!subscription) {
    return;
  }

  let diff = getDifference(+subscription.expirationDateMs);
  return (diff == 0) ? diff : -(diff);

  // if (subscription?.subscriptionPlanId == 'free') {    
  //   var currentDate = moment();
  //   var expirationDate = moment(subscription?.createdDate).add(6, 'day');
  //   var totalDayLeftCount = expirationDate.diff(currentDate, 'days');
  //   return totalDayLeftCount;
  // } else {
  //   if (subscription?.subscriptionPlanId.includes('stripe')) {
  //     let expDate = moment.unix(subscription?.expirationDateMs / 1000).format('')
  //     let diff = moment().diff(expDate, 'days');
  //     return diff
  //   } else {
  //     return getDifference(+subscription.expirationDateMs);
  //   }
  // }
};

export const getPaymentMethod = (subscription: SubscriptionDetails | any | null) =>
  subscription?.subscriptionPlanId == 'free' ? 'Free' : capitalize(subscription.platform);

export const getPrice = (
  subscription: SubscriptionDetails | null | any,
) => {
  if(subscription?.refferralPrice) {
    return formatCurrency('USD', Number(subscription?.refferralPrice));
  } else {
    if (subscription?.subscriptionPlanId.includes('premium')) {
      return formatCurrency('USD', 29.99);
    } else if (subscription?.subscriptionPlanId.includes('standard')) {
      return formatCurrency('USD', 19.99);
    } else if (subscription?.subscriptionPlanId.includes('lite')) {
      return formatCurrency('USD', 9.99);
    } else {
      return;
    }
  }
};

export const isMatchSubscriptionPlatform = (
  subscription: SubscriptionDetails | any | null,
) => {
  if (subscription?.subscriptionPlanId == 'free') {
    return false;
  }

  const platform = subscription?.platform.toLowerCase();
  const isApplePlatform = platform === 'apple';
  const isGooglePlatform = platform === 'google';

  return (isIOS && isApplePlatform) || (!isIOS && isGooglePlatform);
};
