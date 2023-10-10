import { Meta } from 'types/api';
import { Payment, PaymentsReview } from 'types/payments';
export interface PaymentsState {
  payments: Payments;
}

export interface Payments {
  payments: Payment[];
  searchPayment:Payment[];
  totalSum: number;
  meta: Meta;
  payment: Payment | null;
  paymentDetails: Payment | null;
  loading: boolean;
  review: PaymentsReview;
  reviewLoading: boolean;
  refund: any;
}

export type SendPaymentRequest = {
  id: number;
  type: string;
  paymentMethod: string;
};

