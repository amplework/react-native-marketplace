import { Api } from 'api/api';
import { ApiResponse } from 'types/api';
import {
  Card,
} from 'types/card';

const getConnectAccountDetails = async (): ApiResponse<any> =>
  Api.get('/card/accountDetails');

const deleteConnectAccount = async (): ApiResponse<any> =>
  Api.get('/card/accountDelete');

const getCards = async (): ApiResponse<any> =>
  Api.get('/card/getCardList');

const addCard = async (
  cardDetails: Card,
): ApiResponse<any> => Api.post('card/createCustomer', cardDetails);

const editCard = async (
  cardId: any,
  cardDetails: any,
): ApiResponse<any> => Api.patch(`card/updateCardDetail/${cardId}`, cardDetails);

const deleteCard = async (
  cardId: any,
): ApiResponse<any> => Api.delete(`card/deleteCard/${cardId}`);

const deleteAllCards = async (): ApiResponse<any> =>
  Api.delete(`card/deleteAllCard`);

const createPaymentIntent = async (paymentIntent: any): ApiResponse<any> =>
  Api.post(`/card/createPaymentIntent`, paymentIntent);

const createPayment = async (paymentData: any): ApiResponse<any> =>
  Api.post(`/card/createStripePayment`, paymentData);

const createSubscriptionCharge = async (paymentData: any): ApiResponse<any> =>
  Api.post(`/card/createSubscriptionCharge`, paymentData);

const confirmSubscriptionCharge = async (subscriptionId: any, paymentData: any): ApiResponse<any> =>
  Api.post(`card/confirmSubscriptionCharge/${subscriptionId}`, paymentData);

const validateStripeSubscription= async (): ApiResponse<any> =>
  Api.get(`/card/renewStripeSubscription`);

const cancelStripeSubscription = async (): ApiResponse<any> =>
  Api.get(`/card/cancelSubscription`);

export const CardApi = {
  addCard,
  getCards,
  editCard,
  deleteCard,
  createPayment,
  deleteAllCards,
  createPaymentIntent,
  deleteConnectAccount,
  getConnectAccountDetails,
  createSubscriptionCharge,
  confirmSubscriptionCharge,
  validateStripeSubscription,
  cancelStripeSubscription
};
