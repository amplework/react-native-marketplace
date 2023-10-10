import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CreatePaymentAction,
  CreatePaymentsRequest,
  DeletePaymentAction,
  GetPaymentsRequest,
  Payment,
  PaymentsReview,
  PaymentsSuccess,
} from 'types/payments';

import { Payments, SendPaymentRequest } from './types';

const initialState: Payments = {
  payments: [],
  searchPayment:[],
  totalSum: 0,
  meta: {
    count: 0,
    limit: 0,
    offset: 0,
    totalCount: 0,
  },
  payment: null,
  paymentDetails: null,
  loading: false,
  review: {
    payments: {
      currentMonthCount: 0,
      currentWeekCount: 0,
      currentMonthTotal: 0,
      currentWeekTotal: 0,
      currentYearTotal: 0,
    },
  },
  reviewLoading: false,
  refund: {
    declineRefundLoading: false,
    acceptRefundLoading: false,
  }
};

const payments = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    getSearchPayments:(state,_action:PayloadAction<GetPaymentsRequest>) => {
      state.loading = true;
    },
    getSearchPaymentsSuccess:(state,action:PayloadAction<PaymentsSuccess>) => {      
      state.loading = false;
      state.searchPayment = action.payload?.meta?.offset
      ? [...state.searchPayment, ...action.payload?.result]
      : action.payload?.result;
      state.meta = action.payload?.meta;
      state.totalSum = action.payload?.totalSum;
    },
    getSearchPaymentsFailure:(state) => {
      state.loading = false;
    },
    getPayments: (state, _action: PayloadAction<GetPaymentsRequest>) => {
      state.loading = true;
    },
    getPaymentsSuccess: (state, action: PayloadAction<PaymentsSuccess>) => {      
      state.loading = false;
      state.payments = action.payload?.meta?.offset
        ? [...state.payments, ...action.payload?.result]
        : action.payload?.result;
      state.meta = action.payload?.meta;
      state.totalSum = action.payload?.totalSum;
    },
    getPaymentsFailure: (state) => {
      state.loading = false;
    },
    getPaymentDetails: (state, _action: { payload: { id: number } }) => {
      state.loading = true;
    },
    getPaymentDetailsSuccess: (state, action: PayloadAction<Payment>) => {
      state.loading = false;
      state.payment = action.payload;
    },
    getPaymentDetailsFailure: (state) => {
      state.loading = false;
    },
    getPaymentDetailsClient: (state, _action: PayloadAction<any>) => {
      state.loading = true;
    },
    getPaymentDetailsClientSuccess: (state, action: PayloadAction<Payment>) => {
      state.loading = false;
      state.paymentDetails = action.payload;
    },
    getPaymentDetailsClientFailure: (state) => {
      state.loading = false;
    },
    deletePayment: (state, _action: PayloadAction<DeletePaymentAction>) => {
      state.loading = true;
    },
    deletePaymentSuccess: (state) => {
      state.loading = false;
    },
    deletePaymentFailure: (state) => {
      state.loading = false;
    },
    createPayment: (state, _action: PayloadAction<CreatePaymentAction>) => {
      state.loading = true;
    },
    createPaymentSuccess: (state) => {
      state.loading = false;
    },
    createPaymentFailure: (state) => {
      state.loading = false;
    },
    updatePayment: (state, _action: PayloadAction<CreatePaymentsRequest>) => {
      state.loading = true;
    },
    updatePaymentSuccess: (state) => {
      state.loading = false;
    },
    updatePaymentFailure: (state) => {
      state.loading = false;
    },
    getPaymentsReview: (state) => {
      state.reviewLoading = true;
    },
    getPaymentsReviewSuccess: (
      state,
      { payload }: PayloadAction<PaymentsReview>,
    ) => {
      state.reviewLoading = false;
      state.review = payload;
    },
    getPaymentsReviewFailure: (state) => {
      state.reviewLoading = false;
    },
    refundDeclineOnPayment: (state, _action: PayloadAction<any>) => {
      state.refund.declineRefundLoading = true;
    },
    refundDeclineOnPaymentSuccess: (state, action: PayloadAction<any>) => {
      state.refund.declineRefundLoading = false;
    },
    refundDeclineOnPaymentFailure: (state) => {
      state.refund.declineRefundLoading = false;
    },
    refundAcceptOnPayment: (state, _action: PayloadAction<any>) => {
      state.refund.acceptRefundLoading = true;
    },
    refundAcceptOnPaymentSuccess: (state, action: PayloadAction<any>) => {
      state.refund.acceptRefundLoading = false;
    },
    refundAcceptOnPaymentFailure: (state) => {
      state.refund.acceptRefundLoading = false;
    },
    resendPaymentRequest: (state, _action: PayloadAction<SendPaymentRequest>) => {
      state.loading = true;
    },
    resendPaymentRequestSuccess: (state) => {
      state.loading = false;
    },
    resendPaymentRequestFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  actions: {
    getSearchPayments,
    getSearchPaymentsSuccess,
    getSearchPaymentsFailure,
    getPayments,
    getPaymentsFailure,
    getPaymentsSuccess,
    getPaymentDetails,
    getPaymentDetailsFailure,
    getPaymentDetailsSuccess,
    getPaymentDetailsClient,
    getPaymentDetailsClientSuccess,
    getPaymentDetailsClientFailure,
    createPayment,
    createPaymentFailure,
    createPaymentSuccess,
    deletePayment,
    deletePaymentFailure,
    deletePaymentSuccess,
    updatePayment,
    updatePaymentFailure,
    updatePaymentSuccess,
    getPaymentsReview,
    getPaymentsReviewFailure,
    getPaymentsReviewSuccess,
    refundDeclineOnPayment,
    refundDeclineOnPaymentSuccess,
    refundDeclineOnPaymentFailure,
    refundAcceptOnPayment,
    refundAcceptOnPaymentSuccess,
    refundAcceptOnPaymentFailure,
    resendPaymentRequest,
    resendPaymentRequestSuccess,
    resendPaymentRequestFailure
  },
  reducer: paymentsReducer,
} = payments;
