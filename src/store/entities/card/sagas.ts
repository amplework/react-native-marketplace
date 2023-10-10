import { all, call, fork, put, takeEvery, throttle} from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { CardApi } from 'api/card';
import I18n from 'locales';
import { toast } from 'shared/toast';
import {
  AddCardAction,
} from 'types/card';
import {
  addCard,
  editCard,
  getCards,
  deleteCard,
  createPayment,
  addCardSuccess,
  deleteAllCards,
  addCardFailure,
  getCardsSuccess,
  editCardSuccess,
  getCardsFailure,
  editCardFailure,
  hideAddCardModal,
  hideEditCardModal,
  deleteCardSuccess,
  deleteCardFailure,
  createPaymentIntent,
  deleteConnectAccount,
  createPaymentSuccess,
  createPaymentFailure,
  deleteAllCardsSuccess,
  deleteAllCardsFailure,
  getConnectAccountDetails,
  createStripeSubscription,
  cancelStripeSubscription,
  createPaymentIntentFailure,
  createPaymentIntentSuccess,
  deleteConnectAccountSuccess,
  deleteConnectAccountFailure,
  getConnectAccountDetailsFailure,
  createStripeSubscriptionSuccess,
  createStripeSubscriptionFailure,
  cancelStripeSubscriptionSuccess,
  cancelStripeSubscriptionFailure,
  getConnectAccountDetailsSuccess,
  confirmStripeSubscriptionStatus,
  confirmStripeSubscriptionStatusSuccess,
  confirmStripeSubscriptionStatusFailure,
} from './slice';
import { updateInvoicePaymentStatus } from '../invoices';
import { updateSalePaymentStatus } from '../sales';
import { Navigator } from 'service/navigator';
import { getUserSubscriptionDetails } from '../subscription';
import { getProviderProfile } from 'store/actions/provider';
import { alert } from 'shared/alert';

function* handleGetConnectAccountDetails() {
  try {
    const { data } = yield call(CardApi.getConnectAccountDetails);

    yield put(getConnectAccountDetailsSuccess(data));

  } catch (error: any) {
    toast.info(error?.message);

    yield put(getConnectAccountDetailsFailure());
  }
}

function* handleDeleteConnectAccount() {
  try {
    const { data } = yield call(CardApi.deleteConnectAccount);

    toast.info('Your connect account has been deleted successfully.');
    yield put(deleteConnectAccountSuccess(data));
    yield put(getProviderProfile());

    Navigator.goBack();
  } catch (error: any) {
    console.log("DELE_C_ERROR -> ", {...error});
    
    toast.info(error?.message);

    yield put(deleteConnectAccountFailure());
  }
}

function* handleGetCards() {
  try {
    const { data } = yield call(CardApi.getCards);

    yield put(getCardsSuccess(data));

  } catch (error: any) {
    toast.info(error?.message);

    yield put(getCardsFailure());
  }
}

function* handleAddCard({ payload }: PayloadAction<AddCardAction>) {  
  try {
    const { data } = yield call(CardApi.addCard, payload.card);    
    toast.info(
      I18n.t('common.messages.addition', {
        entity: I18n.t('common.entities.card'),
      }),
    );

    yield put(hideAddCardModal());
    yield put(addCardSuccess());

    if (data) {
      const { data } = yield call(CardApi.getCards);
      yield put(getCardsSuccess(data));
    }

    if (payload.onSuccess) {
      yield payload.onSuccess();
    }

  } catch (error: any) {
    error?.statusCode == 406
      ? toast.info('This card is already in your list of payment methods. Please try another card.')
      : toast.info(error?.message)

    yield put(addCardFailure());
  }
}

function* handleEditCard({ payload }: PayloadAction<any>) {
  try {
    const { cardId, ...card } = payload.card;
    const { data } = yield call(CardApi.editCard, cardId, card);

    toast.info(
      I18n.t('common.messages.edition', {
        entity: I18n.t('common.entities.card'),
      }),
    );

    yield put(hideEditCardModal());
    yield put(editCardSuccess());

    if (data) {
      const { data } = yield call(CardApi.getCards);
      yield put(getCardsSuccess(data));
    }

  } catch (error: any) {
    toast.info(error?.message);

    yield put(editCardFailure());
  }
}

function* handleDeleteCard({ payload }: PayloadAction<any>) {
  try {
    yield call(CardApi.deleteCard, payload);

    toast.info(
      I18n.t('common.messages.deletion', {
        entity: I18n.t('common.entities.card'),
      }),
    );

    yield put(hideEditCardModal());
    yield put(deleteCardSuccess());

    const { data } = yield call(CardApi.getCards);
    yield put(getCardsSuccess(data));

  } catch (error: any) {
    toast.info(error?.message);

    yield put(deleteCardFailure());
  }
}

function* handleDeleteAllCards() {
  try {
    yield call(CardApi.deleteAllCards);

    toast.info(
      I18n.t('common.messages.deletion', {
        entity: I18n.t('common.entities.cards'),
      }),
    );

    yield put(deleteAllCardsSuccess());

    const { data } = yield call(CardApi.getCards);
    yield put(getCardsSuccess(data));

  } catch (error: any) {
    toast.info(error?.message);

    yield put(deleteAllCardsFailure());
  }
}

function* handleCreatePaymentIntent({ payload }: PayloadAction<any>) {
  try {
    console.log("PAYMENT_INTENT_PAYLOAD ", payload);
    const { data } = yield call(CardApi.createPaymentIntent, payload.paymentIntent);
    console.log("PAYMENT_INTENT_DATA ", data);

    yield put(createPaymentIntentSuccess(data));

    if (payload.onSuccess) {
      yield payload.onSuccess(data);
    }

  } catch (error: any) {
    console.log("PAYMENT_INTENT_ERROR ", error);
    alert.info(error?.message ?? error?.raw?.message)

    yield put(createPaymentIntentFailure());
  }
}

function* handleCreatePayment({ payload }: PayloadAction<any>) {
  try {
    console.log("PAYMENT_PAYLOAD -> ", payload);
    const { data } = yield call(CardApi.createPayment, payload);
    console.log("PAYMENT_DATA -> ", data);

    yield put(createPaymentSuccess(data));
    toast.info('The online payment has been completed successfully.')

    if (payload.saleId) {
      yield put(updateSalePaymentStatus(payload?.saleId));
    } else {
      yield put(updateInvoicePaymentStatus(payload?.invoiceId));
    }
  } catch (error: any) {
    console.log("PAYMENT_ERROR -> ", {...error});
    toast.info(error?.message)

    yield put(createPaymentFailure());
  }
}

function* handleCreateStripeSubscription({ payload }: PayloadAction<any>) {
  try {
    console.log("createSubscriptionCharge payload -> ", payload?.data);
    const { data } = yield call(CardApi.createSubscriptionCharge, payload?.data);
    console.log("data  ==============response === == >> ", data);
    
    if(data && payload?.onSuccess) {
      yield payload.onSuccess(data, payload?.data);
      // yield put(getUserSubscriptionDetails());
      // Navigator.navigate('Home')
    }
    yield put(createStripeSubscriptionSuccess());
  } catch (error: any) {
    console.log("createSubscriptionCharge Error -> ", {...error});
    yield put(createStripeSubscriptionFailure());
  }
}

function* handleConfirmStripeSubscription({ payload }: PayloadAction<any>) {
  try {
    console.log("createSubs++++++confirm statu+++++criptionCharge payload -> ", payload);
    const { data } = yield call(CardApi.confirmSubscriptionCharge, payload?.id, payload?.data);    
    if(data) {
      yield put(getUserSubscriptionDetails());
      Navigator.navigate('Home');
    }
    yield put(confirmStripeSubscriptionStatusSuccess());
  } catch (error: any) {
    console.log("confirmSubscriptionCharge confirm status  Error ++++++++-> ", {...error});
    toast.info("Something went wrong please try again")
    yield put(confirmStripeSubscriptionStatusFailure());
  }
}

function* handleCancelStripeSubscription() {
  try {
    const { data } = yield call(CardApi.cancelStripeSubscription);    
    if(data) {
      yield put(getUserSubscriptionDetails());
      Navigator.goBack();
    }
    toast.info('Your Alpha Subscription is cancelled successfully.')
    yield put(cancelStripeSubscriptionSuccess());
  } catch (error: any) {
    console.log("createSubscriptionCharge Error -> ", {...error});
    yield put(cancelStripeSubscriptionFailure());
  }
}

function* watchFetchRequests() {
  yield throttle(1000, addCard, handleAddCard);
  yield takeEvery(getCards, handleGetCards);
  yield takeEvery(editCard, handleEditCard);
  yield takeEvery(deleteCard, handleDeleteCard);
  yield takeEvery(createPayment, handleCreatePayment);
  yield takeEvery(deleteAllCards, handleDeleteAllCards);
  yield takeEvery(createPaymentIntent, handleCreatePaymentIntent);
  yield takeEvery(deleteConnectAccount, handleDeleteConnectAccount);
  yield takeEvery(getConnectAccountDetails, handleGetConnectAccountDetails);
  yield takeEvery(createStripeSubscription, handleCreateStripeSubscription);
  yield takeEvery(confirmStripeSubscriptionStatus, handleConfirmStripeSubscription);
  yield takeEvery(cancelStripeSubscription, handleCancelStripeSubscription);
}

export function* cardSaga() {
  yield all([fork(watchFetchRequests)]);
}