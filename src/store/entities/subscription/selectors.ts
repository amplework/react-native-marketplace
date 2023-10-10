import { SubscriptionState } from './types';

const all = (state: SubscriptionState) => state.subscription;

const subscription = (state: SubscriptionState) => all(state).subscription;

const stripeSubscriptions = (state: SubscriptionState) => all(state).stripeSubscriptions;

const loading = (state: SubscriptionState) => all(state).loading;

const verifyLoading = (state: SubscriptionState) => all(state).verifyLoading;

const neverPurchased = (state: SubscriptionState) => all(state).neverPurchasedSubscription;

const isFirstSubscription = (state: SubscriptionState) => all(state).isFirstSubscription;

const actionCount = (state: SubscriptionState) => all(state).actionCount;

export const subscriptionSelectors = {
  subscription,
  loading,
  verifyLoading,
  neverPurchased,
  isFirstSubscription,
  stripeSubscriptions,
  actionCount
};
