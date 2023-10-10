import { Api } from 'api';
import { ApiResponse } from 'types/api';
import {
  SubscriptionDetails,
  VerifySubscriptionPayload,
} from 'types/subscription';
import { isIOS } from 'utils/device';

const verify = (params: VerifySubscriptionPayload): ApiResponse<void> =>
  Api.post('/subscription/validate-receipt', params);

const getSubscription = (): ApiResponse<SubscriptionDetails> =>
  Api.get('/subscription');

const getPopularSubscription = (): ApiResponse<SubscriptionDetails> =>
  Api.get(`/subscription/mostPopularSubscription/${isIOS ? 'apple' : 'google'}`);

const updateGoogleReceipt = (): ApiResponse<any> =>
  Api.get('/subscription/getUpdatedSubscription').then((res: any) => {
    return res;
  }).then((err: any) => {
    return err;
  });

const updateAppleReceipt = (): ApiResponse<any> =>
  Api.get('/subscription/updatedIosSubscription');

const updateStripeReceipt = (): ApiResponse<any> =>
  Api.get('/card/renewStripeSubscription');

const getStripeSubscriptionList = (): ApiResponse<any> =>
  Api.get('/card/productList');

export const SubscriptionApi = {
  verify,
  getSubscription,
  updateAppleReceipt,
  updateStripeReceipt,
  updateGoogleReceipt,
  getPopularSubscription,
  getStripeSubscriptionList,
};
