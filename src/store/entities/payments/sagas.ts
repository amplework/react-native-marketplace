import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { PaymentsApi } from 'api/payments';
import I18n, { t, translations } from 'locales';
import { Navigator } from 'service/navigator';
import { toast } from 'shared/toast';
import {
  CreatePaymentAction,
  CreatePaymentsRequest,
  DeletePaymentAction,
  GetPaymentsRequest,
} from 'types/payments';
import { capitalize } from 'utils/strings';

import {
  createPayment,
  createPaymentFailure,
  createPaymentSuccess,
  deletePayment,
  deletePaymentFailure,
  deletePaymentSuccess,
  getPaymentDetails,
  getPaymentDetailsClient,
  getPaymentDetailsClientFailure,
  getPaymentDetailsClientSuccess,
  getPaymentDetailsFailure,
  getPaymentDetailsSuccess,
  getPayments,
  getPaymentsFailure,
  getPaymentsReview,
  getPaymentsReviewFailure,
  getPaymentsReviewSuccess,
  getPaymentsSuccess,
  getSearchPayments,
  getSearchPaymentsFailure,
  getSearchPaymentsSuccess,
  refundAcceptOnPayment,
  refundAcceptOnPaymentFailure,
  refundAcceptOnPaymentSuccess,
  refundDeclineOnPayment,
  refundDeclineOnPaymentFailure,
  refundDeclineOnPaymentSuccess,
  resendPaymentRequest,
  resendPaymentRequestFailure,
  resendPaymentRequestSuccess,
  updatePayment,
} from './slice';
import { SendPaymentRequest } from './types';

function* handleGetPayments(action: PayloadAction<GetPaymentsRequest>) {
  try {
    const { data } = yield call(PaymentsApi.getPayments, action.payload);

    yield put(getPaymentsSuccess(data));
  } catch (error: any) {
    toast.info(error?.message);
    yield put(getPaymentsFailure());
  }
}

function* handleGetSearchPayments(action: PayloadAction<GetPaymentsRequest>) {
  try {
    const { data } = yield call(PaymentsApi.getPayments, action.payload);
    yield put(getSearchPaymentsSuccess(data));
  } catch (error: any) {
    toast.info(error?.message);
    yield put(getSearchPaymentsFailure());
  }
}

function* handleGetPaymentsDetails(action: { payload: number }) {
  try {
    const { data } = yield call(PaymentsApi.detailsPayment, action.payload);
    yield put(getPaymentDetailsSuccess(data));
  } catch (error: any) {
    toast.info(error?.message);
    yield put(getPaymentDetailsFailure());
  }
}

function* handleGetPaymentsDetailsClient(action: { payload: number }) {
  try {
    const { data } = yield call(
      PaymentsApi.getPaymentDetailsClient,
      action.payload,
    );
    yield put(getPaymentDetailsClientSuccess(data));
  } catch (error: any) {
    toast.info(error?.message);
    yield put(getPaymentDetailsClientFailure());
  }
}

function* handleGetPaymentsReview() {
  try {
    const { data } = yield call(PaymentsApi.paymentsReview);

    yield put(getPaymentsReviewSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(getPaymentsReviewFailure());
  }
}

function* handleCreatePayment({ payload }: PayloadAction<CreatePaymentAction>) {
  try {
    yield call(PaymentsApi.createPayment, payload.payment);

    toast.info(
      I18n.t('common.messages.creation', {
        entity: I18n.t('common.entities.payment'),
      }),
    );

    yield put(createPaymentSuccess());

    if (payload.onSuccess) {
      yield payload.onSuccess();
    }

    Navigator.goBack();
  } catch (error: any) {
    toast.info(error?.message);
    yield put(createPaymentFailure());
  }
}

function* handleUpdatePayment(action: PayloadAction<CreatePaymentsRequest>) {
  try {
    // @ts-ignore
    const { id, ...payment } = action.payload;
    yield call(PaymentsApi.updatePayment, payment, id);
    yield put(getPaymentDetails(id));

    toast.info(
      I18n.t('common.messages.edition', {
        entity: capitalize(I18n.t('common.entities.payment')),
      }),
    );

    Navigator.goBack();
  } catch (error: any) {
    toast.info(error?.message);
  }
}

function* handleResendPaymentRequest(
  action: PayloadAction<SendPaymentRequest>,
) {
  try {
    // @ts-ignore
    const { data } = yield call(
      PaymentsApi.resendPaymentRequest,
      action?.payload,
    );

    toast.info(
      I18n.t(translations.payments.messages.resendPaymentRequestSuccess),
    );

    yield put(resendPaymentRequestSuccess());
  } catch (error: any) {
    toast.info(error?.message);
    yield put(resendPaymentRequestFailure());
  }
}

function* handlePaymentDelete({ payload }: PayloadAction<DeletePaymentAction>) {
  try {
    yield call(PaymentsApi.deletePayment, payload.id);

    if (payload.onSuccess) {
      yield payload.onSuccess();
    }

    Navigator.goBack();

    yield put(deletePaymentSuccess());
  } catch (error: any) {
    toast.info(error?.message);

    yield put(deletePaymentFailure());
  }
}

function* handleRefundDeclineOnPayment({ payload }: PayloadAction<any>) {
  try {
    const { data } = yield call(PaymentsApi.refundDeclineOnPayment, payload);

    yield put(refundDeclineOnPaymentSuccess(data));

    Navigator.goBack();
  } catch (error: any) {
    toast.info(error?.message);

    yield put(refundDeclineOnPaymentFailure());
  }
}

function* handleRefundAcceptOnPayment({ payload }: PayloadAction<any>) {
  try {
    const { data } = yield call(PaymentsApi.refundAcceptOnPayment, payload);

    yield put(refundAcceptOnPaymentSuccess(data));
    toast.info('The refund has been completed successfully');

    Navigator.goBack();
  } catch (error: any) {
    console.log('REFUND_ACCEPT_ERROR -> ', { ...error });
    toast.info(error?.message);

    yield put(refundAcceptOnPaymentFailure());
  }
}

function* watchFetchRequests() {
  yield takeEvery(getPayments, handleGetPayments);
  yield takeEvery(getSearchPayments, handleGetSearchPayments);
  yield takeEvery(createPayment, handleCreatePayment);
  // @ts-ignore
  yield takeEvery(getPaymentDetails, handleGetPaymentsDetails);
  yield takeEvery(getPaymentDetailsClient, handleGetPaymentsDetailsClient);
  // @ts-ignore
  yield takeEvery(deletePayment, handlePaymentDelete);
  yield takeEvery(updatePayment, handleUpdatePayment);
  yield takeEvery(getPaymentsReview, handleGetPaymentsReview);
  yield takeEvery(resendPaymentRequest, handleResendPaymentRequest);

  yield takeEvery(refundDeclineOnPayment, handleRefundDeclineOnPayment);
  yield takeEvery(refundAcceptOnPayment, handleRefundAcceptOnPayment);
}

export function* paymentsSaga() {
  yield all([fork(watchFetchRequests)]);
}
