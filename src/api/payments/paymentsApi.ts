import { Api } from 'api/api';
import { SendPaymentRequest } from 'store/entities/payments/types';
import { ApiResponse } from 'types/api';
import {
  CreatePaymentsRequest,
  GetPaymentsRequest,
  Payment,
  PaymentsReview,
  PaymentsSuccess,
} from 'types/payments';

const getPayments = (
  params: GetPaymentsRequest,
): ApiResponse<PaymentsSuccess> => Api.get('/payments', { params });

const createPayment = async (
  payment: CreatePaymentsRequest,
): ApiResponse<Payment> => Api.post('/payment', payment);

const editPayment = async (
  payment: CreatePaymentsRequest,
  id: number,
): ApiResponse<Payment> => Api.put(`/payment/${id}`, payment);

const detailsPayment = async (id: number): ApiResponse<Payment> =>
  Api.get(`/payment/${id}`);

const getPaymentDetailsClient = async (id: number): ApiResponse<Payment> =>
  Api.get(`/payment/getPaymentDetail/${id}`);

const deletePayment = async (id: number): ApiResponse<void> =>
  Api.delete(`/payment/${id}`);

const updatePayment = async (
  payment: CreatePaymentsRequest,
  id: number,
): ApiResponse<Payment> => Api.put(`/payment/${id}`, payment);

const sharePaymentEmailReceipt = async (
  id: number,
  data: { email: string },
): ApiResponse<void> => Api.post(`/payment/${id}/share-receipt`, data);

const paymentPreviewReceipt = async (
  data: CreatePaymentsRequest,
): ApiResponse<any> => Api.post('/payment/preview-receipt', data);

const paymentsReview = async (): ApiResponse<PaymentsReview> =>
  Api.get('/payments/review');

const refundDeclineOnPayment = (id: any): ApiResponse<any> =>
  Api.patch(`/payment/refundRequest/${id}`, {
    isRefundRequest: false,
  });

const refundAcceptOnPayment = (id: any): ApiResponse<any> =>
  Api.patch(`/card/refund/${id}`, {
    isRefundRequest: null,
  });

const resendPaymentRequest = (payload: SendPaymentRequest): ApiResponse<any> =>
  Api.post('/sale/resendPaymentrequest', payload);

export const PaymentsApi = {
  getPayments,
  createPayment,
  editPayment,
  detailsPayment,
  getPaymentDetailsClient,
  deletePayment,
  updatePayment,
  sharePaymentEmailReceipt,
  paymentPreviewReceipt,
  paymentsReview,
  refundDeclineOnPayment,
  refundAcceptOnPayment,
  resendPaymentRequest
};
