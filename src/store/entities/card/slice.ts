import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AddCardAction,
} from 'types/card';
import { Cards } from './types';

const initialState: Cards = {
  connectAccountDetails: null,
  cards: [],
  selectedCard: null,
  loading: false,
  addCardModalVisible: false,
  editCardModalVisible: false,
  paymentIntent: {
    loading: false,
    intentData: null,
  },
  createPayment: {
    loading: false,
    paymentData: null,
  },
  loadingConnectAccountDeletion: false,
};

const cards = createSlice({
  name: 'card',
  initialState,
  reducers: {
    getConnectAccountDetails: (state) => {
      state.loading = true;
    },
    getConnectAccountDetailsSuccess: (state, action: PayloadAction<any>) => {
      state.connectAccountDetails = action.payload;
      state.loading = false;
    },
    getConnectAccountDetailsFailure: (state) => {
      state.loading = false;
    },
    deleteConnectAccount: (state) => {
      state.loadingConnectAccountDeletion = true;
    },
    deleteConnectAccountSuccess: (state, action: PayloadAction<any>) => {
      state.loadingConnectAccountDeletion = false;
      state.connectAccountDetails = null
    },
    deleteConnectAccountFailure: (state) => {
      state.loadingConnectAccountDeletion = false;
    },
    getCards: (state) => {
      state.loading = true;
    },
    getCardsSuccess: (state, action: PayloadAction<any>) => {
      if (action.payload.length > 1) {
        let fromIndex = action.payload.findIndex((e: any) => e.isDefault === true);
        let element = action.payload.splice(fromIndex, 1)[0];
        action.payload.splice(0, 0, element);
      }
      state.cards = action.payload;
      state.loading = false;
    },
    getCardsFailure: (state) => {
      state.loading = false;
    },
    addCard: (state, _action: PayloadAction<AddCardAction>) => {
      state.loading = true;
    },
    addCardSuccess: (state) => {
      state.loading = false;
    },
    addCardFailure: (state) => {
      state.loading = false;
    },
    editCard: (state, _action: PayloadAction<any>) => {
      state.loading = true;
    },
    editCardSuccess: (state) => {
      state.loading = false;
    },
    editCardFailure: (state) => {
      state.loading = false;
    },
    deleteCard: (state, _action: PayloadAction<any>) => {
      state.loading = true;
    },
    deleteCardSuccess: (state) => {
      state.loading = false;
    },
    deleteCardFailure: (state) => {
      state.loading = false;
    },
    deleteAllCards: (state) => {
      state.loading = true;
    },
    deleteAllCardsSuccess: (state) => {
      state.loading = false;
    },
    deleteAllCardsFailure: (state) => {
      state.loading = false;
    },
    showAddCardModal: (state) => {
      state.addCardModalVisible = true;
    },
    hideAddCardModal: (state) => {
      state.addCardModalVisible = false;
    },
    showEditCardModal: (state, action: PayloadAction<any>) => {
      state.editCardModalVisible = true;
      state.selectedCard = action.payload;
    },
    hideEditCardModal: (state) => {
      state.editCardModalVisible = false;
    },
    createPaymentIntent: (state, _action: PayloadAction<any>) => {
      state.paymentIntent.loading = true;
    },
    createPaymentIntentSuccess: (state, action: PayloadAction<any>) => {
      state.paymentIntent.loading = false;
      state.paymentIntent.intentData = action.payload;
    },
    createPaymentIntentFailure: (state) => {
      state.paymentIntent.loading = false;
    },
    createPayment: (state, _action: PayloadAction<any>) => {
      state.createPayment.loading = true;
    },
    createPaymentSuccess: (state, action: PayloadAction<any>) => {
      state.createPayment.loading = false;
      state.createPayment.paymentData = action.payload;
    },
    createPaymentFailure: (state) => {
      state.createPayment.loading = false;
    },
    createStripeSubscription: (state, _action: PayloadAction<any>) => {
      state.loading = true;
    },
    createStripeSubscriptionSuccess: (state) => {
      state.loading = false;
    },
    createStripeSubscriptionFailure: (state) => {
      state.loading = false;
    },
    confirmStripeSubscriptionStatus: (state, _action: PayloadAction<any>) => {
      state.loading = true;
    },
    confirmStripeSubscriptionStatusSuccess: (state) => {
      state.loading = false;
    },
    confirmStripeSubscriptionStatusFailure: (state) => {
      state.loading = false;
    },
    cancelStripeSubscription: (state) => {
      state.loading = true;
    },
    cancelStripeSubscriptionSuccess: (state) => {
      state.loading = false;
    },
    cancelStripeSubscriptionFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  actions: {
    getConnectAccountDetails,
    getConnectAccountDetailsSuccess,
    getConnectAccountDetailsFailure,
    deleteConnectAccount,
    deleteConnectAccountSuccess,
    deleteConnectAccountFailure,
    getCards,
    getCardsSuccess,
    getCardsFailure,
    addCard,
    addCardSuccess,
    addCardFailure,
    showAddCardModal,
    hideAddCardModal,
    showEditCardModal,
    hideEditCardModal,
    editCard,
    editCardSuccess,
    editCardFailure,
    deleteCard,
    deleteCardSuccess,
    deleteCardFailure,
    deleteAllCards,
    deleteAllCardsSuccess,
    deleteAllCardsFailure,
    createPaymentIntent,
    createPaymentIntentSuccess,
    createPaymentIntentFailure,
    createPayment,
    createPaymentSuccess,
    createPaymentFailure,
    createStripeSubscription,
    createStripeSubscriptionSuccess,
    createStripeSubscriptionFailure,
    confirmStripeSubscriptionStatus,
    confirmStripeSubscriptionStatusSuccess,
    confirmStripeSubscriptionStatusFailure,
    cancelStripeSubscription,
    cancelStripeSubscriptionSuccess,
    cancelStripeSubscriptionFailure
  },
  reducer: cardReducer,
} = cards;
