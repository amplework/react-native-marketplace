import { PayloadAction } from '@reduxjs/toolkit';
import { SubscriptionApi } from 'api/subscription';
import { t, translations } from 'locales';
import { isEmpty } from 'lodash';
import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { Navigator } from 'service/navigator';
import { alert } from 'shared/alert';
import { getProviderProfile } from 'store/actions/provider';
import {
  SubscriptionPlatform,
  VerifySubscriptionPayload,
} from 'types/subscription';
// import { subscriptionSelectors } from './selectors';
import { isSubscriptionExpired } from 'utils/dates';
import { getSubscriptionPlatform } from 'utils/subscription';

import { getUser } from '../user';
import {
  getMostPopularSubscriptions,
  getMostPopularSubscriptionsSuccess,
  getStripeSubscriptions,
  getStripeSubscriptionsFailure,
  getStripeSubscriptionsSuccess,
  getUserSubscriptionDetails,
  getUserSubscriptionDetailsFailure,
  getUserSubscriptionDetailsSuccess,
  validateAdminWebSubscription,
  validateAppleReceipt,
  validateAppleReceiptFailure,
  validateAppleReceiptSuccess,
  validateFreePlan,
  validateGoogleReceipt,
  validateGoogleReceiptFailure,
  validateGoogleReceiptSuccess,
  validateStripeReceipt,
  validateStripeReceiptFailure,
  validateStripeReceiptSuccess,
  validateWebSubscription,
  verifySubscription,
  verifySubscriptionFailure,
  verifySubscriptionSuccess,
} from './slice';

function* handleGetStripeSubscription() {
  try {
    const { data } = yield call(SubscriptionApi.getStripeSubscriptionList);
    if (data) {
      yield put(getStripeSubscriptionsSuccess(data));
    }
  } catch (error) {
    yield put(getStripeSubscriptionsFailure());
  }
}

function* handleGetPopularSubscription() {
  try {
    const { data } = yield call(SubscriptionApi.getPopularSubscription);
    if (data) {
      yield put(getMostPopularSubscriptionsSuccess(data));
    }
  } catch (error) {
    console.log('error ===== subscription List === >> ', error);
    yield put(getStripeSubscriptionsFailure());
  }
}

function* handleUserSubscription() {
  try {
    const { data } = yield call(SubscriptionApi.getSubscription);

    if (isEmpty(data)) {
      console.log('navigate');
      Navigator.navigate('PickSubscription', {
        isSubscriptionExist: false,
      });
      return;
    }

    yield put(getUserSubscriptionDetailsSuccess(data));

    const platform: SubscriptionPlatform = getSubscriptionPlatform(data);

    if (isSubscriptionExpired(data?.expirationDateMs)) {
      console.log('platform ============>>> ', platform);

      switch (platform) {
        case 'Apple':
          yield put(validateAppleReceipt());
          break;
        case 'Google':
          yield put(validateGoogleReceipt());
          break;
        case 'Stripe':
          yield put(validateStripeReceipt(data));
          break;
        case 'Free':
          yield put(validateFreePlan(data));
          break;
        case 'Admin-Web':
          yield put(validateAdminWebSubscription(data));
          break;
        case 'Web':
          yield put(validateWebSubscription(data));
          break;
      }
    } else {
      yield put(getUserSubscriptionDetailsSuccess(data));
    }
  } catch (error: any) {
    // toast.info(error?.message);
    // console.log("handleValidateReceipt catch block error ====>>>> ", error);
    yield put(getUserSubscriptionDetailsFailure());
  }
}

function* handleValidateGoogleReceipt(): any {
  try {
    const { data } = yield call(SubscriptionApi.updateGoogleReceipt);
    if (isSubscriptionExpired(data?.expirationDateMs)) {
      Navigator.navigate('RenewSubscription');
      alert.info(t(translations.subscription.error));
      yield put(validateGoogleReceiptFailure());
    } else {
      yield put(validateGoogleReceiptSuccess(data));
    }
  } catch (error: any) {
    Navigator.navigate('RenewSubscription');
    alert.info(t(translations.subscription.error));
    yield put(validateGoogleReceiptFailure());
  }
}

function* handleValidateAppleReceipt(): any {
  try {
    const { data } = yield call(SubscriptionApi.updateAppleReceipt);
    if (isEmpty(data)) {
      console.log('navigate');
      Navigator.navigate('RenewSubscription', {
        isSubscriptionExist: false,
      });
      return;
    }
    if (isSubscriptionExpired(data?.expirationDateMs)) {
      Navigator.navigate('RenewSubscription');
      alert.info(t(translations.subscription.error));
      yield put(validateAppleReceiptFailure());
    } else {
      yield put(validateAppleReceiptSuccess(data));
    }
  } catch (error: any) {
    Navigator.navigate('RenewSubscription');
    alert.info(t(translations.subscription.error));
    yield put(validateAppleReceiptFailure());
  }
}

function* handleValidateStripeReceipt({ payload }: any): any {
  try {
    if (isSubscriptionExpired(payload?.expirationDateMs)) {
      try {
        const { data } = yield call(SubscriptionApi.updateStripeReceipt);
        if (isSubscriptionExpired(data?.expirationDateMs)) {
          Navigator.navigate('RenewSubscription');
          alert.info(t(translations.subscription.error));
          yield put(validateStripeReceiptFailure());
        } else {
          yield put(validateStripeReceiptSuccess(data));
        }
      } catch (e: any) {
        console.log('SubscriptionApi.updateStripeReceipt error ====>>>> ', e);
        Navigator.navigate('RenewSubscription');
        alert.info(t(translations.subscription.error));
        yield put(validateStripeReceiptFailure());
      }
    } else {
      yield put(validateStripeReceiptSuccess(payload));
    }
  } catch (error: any) {
    Navigator.navigate('RenewSubscription');
    alert.info(t(translations.subscription.error));
    yield put(validateStripeReceiptFailure());
  }
}

function* handleValidateFreePlan({ payload }: any): any {
  try {
    if (isSubscriptionExpired(payload?.expirationDateMs)) {
      Navigator.navigate('RenewSubscription');
      alert.info(t(translations.subscription.error));
    }
  } catch (error: any) {
    Navigator.navigate('RenewSubscription');
    alert.info(t(translations.subscription.error));
  }
}

function* handleValidateWebSubscription({ payload }: any): any {
  try {
    if (
      !payload?.subscriptionPlanId.includes('lite') &&
      isSubscriptionExpired(payload?.expirationDateMs)
    ) {
      Navigator.navigate('RenewSubscription');
      alert.info(t(translations.subscription.error));
    }
  } catch (error: any) {
    Navigator.navigate('RenewSubscription');
    alert.info(t(translations.subscription.error));
  }
}

function* handleVerifySubscription({
  payload,
}: PayloadAction<VerifySubscriptionPayload>) {
  try {
    yield call(SubscriptionApi.verify, payload);

    yield put(getUser());
    yield put(getProviderProfile());
    yield put(getUserSubscriptionDetails());
    Navigator.navigate('Home');

    yield put(verifySubscriptionSuccess());
  } catch (error: any) {
    // toast.info(error?.message);
    yield put(verifySubscriptionFailure());
  }
}

function* watchFetchRequests() {
  yield takeEvery(getStripeSubscriptions, handleGetStripeSubscription);
  yield takeEvery(getMostPopularSubscriptions, handleGetPopularSubscription);
  yield takeEvery(verifySubscription, handleVerifySubscription);
  yield takeLatest(getUserSubscriptionDetails, handleUserSubscription);
  yield takeEvery(validateAppleReceipt, handleValidateAppleReceipt);
  yield takeEvery(validateGoogleReceipt, handleValidateGoogleReceipt);
  yield takeEvery(validateStripeReceipt, handleValidateStripeReceipt);
  yield takeEvery(validateFreePlan, handleValidateFreePlan);
  yield takeEvery(validateWebSubscription, handleValidateWebSubscription);
  yield takeEvery(validateAdminWebSubscription, handleValidateWebSubscription);
}

export function* subscriptionSaga() {
  yield all([fork(watchFetchRequests)]);
}
