import { SubscriptionDetails } from 'types/subscription';

export type SubscriptionState = {
  subscription: Subscription;
};

export type Subscription = {
  subscription: SubscriptionDetails | null;
  loading: boolean;
  verifyLoading: boolean;
  neverPurchasedSubscription: boolean;
  isFirstSubscription: boolean;
  stripeSubscriptions: any;
  mostPopularSubscription: any;
  actionCount: any;
};
