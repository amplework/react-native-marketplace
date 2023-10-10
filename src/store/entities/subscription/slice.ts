import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  SubscriptionDetails,
  VerifySubscriptionPayload,
} from 'types/subscription';
import { isSubscriptionExpired } from 'utils/dates';

import { Subscription } from './types';

const initialState: Subscription = {
  subscription: null,
  loading: false,
  verifyLoading: false,
  neverPurchasedSubscription: false,
  isFirstSubscription: false,
  stripeSubscriptions: null,
  mostPopularSubscription: null,
  actionCount: 9,
};

const subscription = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    getSubscription: (state) => {
      state.loading = true;
    },
    getStripeSubscriptions: (state) => {
      state.loading = true;
    },
    getStripeSubscriptionsSuccess: (state, action: any) => {
      state.loading = false;
      state.stripeSubscriptions = action?.payload
    },
    getStripeSubscriptionsFailure: (state) => {
      state.loading = false;
    },
    getMostPopularSubscriptions: (state) => {
      state.loading = true;
    },
    getMostPopularSubscriptionsSuccess: (state, action: any) => {
      state.loading = false;
      state.mostPopularSubscription = action?.payload
    },
    getMostPopularSubscriptionsFailure: (state) => {
      state.loading = false;
    },
    checkUserSubscription: (state, _action: PayloadAction<boolean>) => {
      state.neverPurchasedSubscription = _action.payload;
    },
    checkIsFirstSubscription: (_state, _action: PayloadAction<boolean>) => {
      _state.isFirstSubscription = _action.payload;
    },
    getSubscriptionSuccess: (
      state,
      { payload }: PayloadAction<SubscriptionDetails>,
    ) => {
      const premium = payload?.subscriptionPlan?.includes('premium');
      state.loading = false;
      state.subscription = payload;
      state.actionCount = premium ? 11 : 9
    },
    getSubscriptionFailure: (state) => {
      state.loading = false;
      state.subscription = null;
    },
    startVerifySubscription: (state) => {
      state.verifyLoading = true;
    },
    verifySubscription: (
      _state,
      _action: PayloadAction<VerifySubscriptionPayload>,
    ) => {
      _state.verifyLoading = true;
    },
    verifySubscriptionSuccess: (state) => {
      state.verifyLoading = false;
    },
    verifySubscriptionFailure: (state) => {
      state.verifyLoading = false;
    },
    getUserSubscriptionDetails: (state) => {
      state.loading = true;
    },
    getUserSubscriptionDetailsSuccess: (state, action) => {
      const premium = action.payload?.subscriptionPlan?.includes('premium');
      state.loading = false;
      state.subscription = action?.payload;
      state.actionCount = premium ? 11 : 9
    },
    getUserSubscriptionDetailsFailure: (state) => {
      state.loading = false;
    },
    validateFreePlan: (state, action) => {
      const premium = action.payload?.subscriptionPlan?.includes('premium');
      const data = action?.payload;
      state.actionCount = premium ? 11 : 9
      if (!isSubscriptionExpired(data?.expirationDateMs)) {
        state.subscription = data
      }
    },
    validateAdminWebSubscription: (state, action) => {
      const data = action?.payload;
      const premium = action.payload?.subscriptionPlan?.includes('premium');
      state.actionCount = premium ? 11 : 9
      if (!data?.subscriptionPlanId.includes('lite') && !isSubscriptionExpired(data?.expirationDateMs)) {
        state.subscription = data;
      }
    },
    validateWebSubscription: (state, action) => {
      const data = action?.payload;
      const premium = action.payload?.subscriptionPlan?.includes('premium');
      state.actionCount = premium ? 11 : 9
      if (!data?.subscriptionPlanId.includes('lite') && !isSubscriptionExpired(data?.expirationDateMs)) {
        state.subscription = data;
      }
    },
    validateGoogleReceipt: (state) => {
      state.loading = true;
    },
    validateGoogleReceiptSuccess: (state, action) => {
      state.loading = false;
    },
    validateGoogleReceiptFailure: (state) => {
      state.loading = false;
    },
    validateAppleReceipt: (state) => {
      state.loading = true;
    },
    validateAppleReceiptSuccess: (state, action) => {
      state.loading = false;
    },
    validateAppleReceiptFailure: (state) => {
      state.loading = false;
    },
    validateStripeReceipt: (state, _action) => {
      state.loading = true;
    },
    validateStripeReceiptSuccess: (state, action) => {
      state.loading = false;
    },
    validateStripeReceiptFailure: (state) => {
      state.loading = false;
    }
  },
});

export const {
  actions: {
    getSubscription,
    getSubscriptionFailure,
    getSubscriptionSuccess,
    verifySubscription,
    checkUserSubscription,
    verifySubscriptionFailure,
    verifySubscriptionSuccess,
    startVerifySubscription,
    getStripeSubscriptions,
    getStripeSubscriptionsSuccess,
    getStripeSubscriptionsFailure,
    checkIsFirstSubscription,
    getMostPopularSubscriptions,
    getMostPopularSubscriptionsSuccess,
    getMostPopularSubscriptionsFailure,
    getUserSubscriptionDetails,
    getUserSubscriptionDetailsSuccess,
    getUserSubscriptionDetailsFailure,
    validateFreePlan,
    validateAdminWebSubscription,
    validateWebSubscription,
    validateGoogleReceipt,
    validateGoogleReceiptSuccess,
    validateGoogleReceiptFailure,
    validateAppleReceipt,
    validateAppleReceiptSuccess,
    validateAppleReceiptFailure,
    validateStripeReceipt,
    validateStripeReceiptSuccess,
    validateStripeReceiptFailure,
  },
  reducer: subscriptionReducer,
} = subscription;
