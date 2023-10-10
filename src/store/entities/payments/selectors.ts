import { PaymentsState } from 'store/entities/payments/types';

const all = (state: PaymentsState) => state.payments;

const payments = (state: PaymentsState) => all(state).payments;

const paymentDetails = (state: PaymentsState) => all(state).paymentDetails;

const searchPayment = (state:PaymentsState) => all(state).searchPayment;

const totalSum = (state: PaymentsState) => all(state).totalSum;

const meta = (state: PaymentsState) => all(state).meta;

const loading = (state: PaymentsState) => all(state).loading;

const payment = (state: PaymentsState) => all(state).payment;

const review = (state: PaymentsState) => all(state).review;

const reviewLoading = (state: PaymentsState) => all(state).reviewLoading;

const declineRefundLoading = (state: PaymentsState) => all(state).refund.declineRefundLoading;

const acceptRefundLoading = (state: PaymentsState) => all(state).refund.acceptRefundLoading;

export const paymentsSelectors = {
  searchPayment,
  payments,
  paymentDetails,
  totalSum,
  meta,
  loading,
  payment,
  review,
  reviewLoading,
  declineRefundLoading,
  acceptRefundLoading,
};
