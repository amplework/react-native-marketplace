import {
  all,
  call,
  fork,
  put,
  select,
  takeEvery,
} from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { EstimatesApi } from 'api/estimates';
import { getQueryParams } from 'components/invoiceEstimates/helpers/utils';
import I18n from 'locales';
import { Navigator } from 'service/navigator';
import { toast } from 'shared/toast';
import { ShareEmailRequest } from 'types/api';
import {
  CreateEstimateAction,
  DeleteEstimateAction,
  DetailedEstimate,
  EditEstimateAction,
  EstimateTab,
  EstimateValues,
  GetEstimatesRequest,
  UpdateEstimateStatus,
} from 'types/estimates';
import { capitalize } from 'utils/strings';

import { estimatesSelectors } from './selectors';
import {
  convertEstimateToInvoice,
  convertEstimateToInvoiceFailure,
  convertEstimateToInvoiceSuccess,
  createEstimate,
  createEstimateFailure,
  createEstimateForClient,
  createEstimateSuccess,
  deleteEstimate,
  deleteEstimateFailure,
  deleteEstimateSuccess,
  editEstimate,
  editEstimateFailure,
  editEstimateSuccess,
  getEstimate,
  getEstimateFailure,
  getEstimates,
  getEstimatesFailure,
  getEstimatesReview,
  getEstimatesReviewFailure,
  getEstimatesReviewSuccess,
  getEstimatesSuccess,
  getEstimateSuccess,
  getFilteredEstimates,
  getFilteredEstimatesFailure,
  getFilteredEstimatesSuccess,
  loadMoreEstimates,
  loadMoreEstimatesFailure,
  loadMoreEstimatesSearchResults,
  loadMoreEstimatesSearchResultsFailure,
  loadMoreEstimatesSearchResultsSuccess,
  loadMoreEstimatesSuccess,
  previewEstimate,
  previewEstimateFailure,
  previewEstimateSuccess,
  resetEstimates,
  searchEstimates,
  searchEstimatesFailure,
  searchEstimatesSuccess,
  shareEstimate,
  updateEstimatePaymentStatus,
  updateEstimatePaymentStatusFailure,
  updateEstimatePaymentStatusSuccess,
  updateEstimateStatus,
  updateEstimateStatusFailure,
  updateEstimateStatusSuccess,
} from './slice';

function* handleGetEstimates({ payload }: PayloadAction<GetEstimatesRequest>) {
  try {
    yield put(resetEstimates());
    const { data } = yield call(EstimatesApi.getEstimates, payload);

    yield put(getEstimatesSuccess(data));
  } catch (error) {
    toast.info(I18n.t('common.errors.load'));

    yield put(getEstimatesFailure());
  }
}

function* handleGetFilteredEstimates({
  payload,
}: PayloadAction<GetEstimatesRequest | any>) {
  try {
    // yield put(resetEstimates())
    const { data } = yield call(EstimatesApi.getEstimates, payload);

    yield put(getFilteredEstimatesSuccess(data));
  } catch (error) {
    toast.info(I18n.t('common.errors.load'));

    yield put(getFilteredEstimatesFailure());
  }
}

function* handleLoadMoreEstimates({
  payload,
}: PayloadAction<GetEstimatesRequest>) {
  try {
    const { data } = yield call(EstimatesApi.getEstimates, payload);

    yield put(loadMoreEstimatesSuccess(data));
  } catch (error) {
    toast.info(I18n.t('common.errors.load'));

    yield put(loadMoreEstimatesFailure());
  }
}

function* handleGetEstimate(action: PayloadAction<number>) {
  try {
    const { data } = yield call(EstimatesApi.getEstimate, action.payload);

    yield put(getEstimateSuccess(data));
  } catch (error: any) {
    if (error.statusCode !== 404) {
      toast.info(I18n.t('common.errors.load'));
    }

    yield put(getEstimateFailure(new Error(error.message)));
  }
}

function* handleConvertEstimateToInvoice(action: PayloadAction<number>) {
  try {
    yield call(EstimatesApi.convertEstimate, action.payload);
    yield put(convertEstimateToInvoiceSuccess());
    Navigator.goBack();
  } catch (error: any) {
    toast.info(error?.message);
    yield put(convertEstimateToInvoiceFailure());
  }
}

function* handleCreateEstimate({
  payload,
}: PayloadAction<CreateEstimateAction>) {
  const tab: EstimateTab = yield select(estimatesSelectors.tab);

  try {
    yield call(EstimatesApi.createEstimate, payload.estimate);

    toast.info(
      I18n.t('common.messages.creation', {
        entity: I18n.t('common.entities.estimate'),
      }),
    );

    Navigator.goBack();

    if (payload.onSuccess) {
      yield payload.onSuccess();
    }
    // @ts-ignore
    yield put(getEstimates(getQueryParams(tab)));

    yield put(createEstimateSuccess());
  } catch (error: any) {
    toast.info(error.message);

    yield put(createEstimateFailure());
  }
}

function* handleCreateEstimateForClient({
  payload,
}: PayloadAction<CreateEstimateAction>) {
  try {
    yield call(EstimatesApi.createEstimate, payload.estimate);

    toast.info(
      I18n.t('common.messages.creation', {
        entity: I18n.t('common.entities.estimate'),
      }),
    );

    Navigator.goBack();

    if (payload.onSuccess) {
      yield payload.onSuccess();
    }

    yield put(createEstimateSuccess());
  } catch (error: any) {
    toast.info(error.message);

    yield put(createEstimateFailure());
  }
}

function* handleDeleteEstimate({
  payload,
}: PayloadAction<DeleteEstimateAction>) {
  const tab: EstimateTab = yield select(estimatesSelectors.tab);

  try {
    yield call(EstimatesApi.deleteEstimate, payload.id);

    toast.info(
      I18n.t('common.messages.deletion', {
        entity: capitalize(I18n.t('common.entities.estimate')),
      }),
    );

    yield put(deleteEstimateSuccess());

    Navigator.goBack();

    if (payload.onSuccess) {
      yield payload.onSuccess();
    }
    //@ts-ignore
    yield put(getEstimates(getQueryParams(tab)));
  } catch (error) {
    toast.info(
      I18n.t('common.errors.process', {
        process: I18n.t('common.processes.delete'),
        entity: I18n.t('common.entities.estimate'),
      }),
    );

    yield put(deleteEstimateFailure());
  }
}

function* handleEditEstimate({ payload }: PayloadAction<EditEstimateAction>) {
  const tab: EstimateTab = yield select(estimatesSelectors.tab);
  const estimate: DetailedEstimate = yield select(estimatesSelectors.estimate);

  try {
    yield call(EstimatesApi.editEstimate, payload.id, payload.estimate);

    toast.info(
      I18n.t('common.messages.edition', {
        entity: capitalize(I18n.t('common.entities.estimate')),
      }),
    );

    Navigator.goBack();

    if (payload.onSuccess) {
      yield payload.onSuccess();
    }

    yield put(getEstimate(estimate.id));
    //@ts-ignore
    yield put(getEstimates(getQueryParams(tab)));

    yield put(editEstimateSuccess());
  } catch (error: any) {
    toast.info(error.message);

    yield put(editEstimateFailure());
  }
}

function* handleUpdateEstimateStatus({
  payload,
}: PayloadAction<UpdateEstimateStatus>) {
  try {
    yield call(EstimatesApi.updateEstimateStatus, payload);

    Navigator.goBack();

    yield put(updateEstimateStatusSuccess());
  } catch (error: any) {
    toast.info(error.message);

    yield put(updateEstimateStatusFailure());
  }
}

function* handleGetEstimatesReview() {
  try {
    const { data } = yield call(EstimatesApi.getEstimatesReview);

    yield put(getEstimatesReviewSuccess(data));
  } catch (error) {
    toast.info(I18n.t('common.errors.load'));

    yield put(getEstimatesReviewFailure());
  }
}

function* handleSearchEstimates({
  payload,
}: PayloadAction<GetEstimatesRequest>) {
  try {
    const { data } = yield call(EstimatesApi.getEstimates, payload);

    yield put(searchEstimatesSuccess(data));
  } catch (error) {
    toast.info(I18n.t('common.errors.load'));

    yield put(searchEstimatesFailure());
  }
}

function* handleLoadMoreEstimatesSearchResults({
  payload,
}: PayloadAction<GetEstimatesRequest>) {
  try {
    const { data } = yield call(EstimatesApi.getEstimates, payload);

    yield put(loadMoreEstimatesSearchResultsSuccess(data));
  } catch (error) {
    toast.info(I18n.t('common.errors.load'));

    yield put(loadMoreEstimatesSearchResultsFailure());
  }
}

function* handleShareEstimate(action: PayloadAction<ShareEmailRequest>) {
  try {
    yield call(EstimatesApi.shareEstimate, action.payload);

    toast.info(
      I18n.t('common.messages.sharing', {
        entity: capitalize(I18n.t('common.entities.estimate')),
      }),
    );
  } catch (error) {
    toast.info(I18n.t('common.errors.save'));
  }
}

function* handlePreviewEstimate({ payload }: PayloadAction<EstimateValues>) {
  try {
    const { data } = yield call(EstimatesApi.previewEstimate, payload);

    yield put(previewEstimateSuccess(data));
  } catch (error) {
    toast.info(I18n.t('common.errors.save'));

    yield put(previewEstimateFailure());
  }
}

function* handleUpdateEstimatePaymentStatus({ payload }: PayloadAction<any>) {
  try {
    console.log('INV_PAYLOAD -> ', payload);
    const { data } = yield call(
      EstimatesApi.updateEstimatePaymentStatus,
      payload,
    );
    console.log('INV_DATA -> ', data);

    yield put(updateEstimatePaymentStatusSuccess(data));

    Navigator.goBack();
  } catch (error: any) {
    console.log('INV_ERROR -> ', { ...error });
    toast.info(error?.message);

    yield put(updateEstimatePaymentStatusFailure());
  }
}

function* watchFetchRequests() {
  yield takeEvery(getEstimates, handleGetEstimates);
  yield takeEvery(getFilteredEstimates, handleGetFilteredEstimates);
  yield takeEvery(loadMoreEstimates, handleLoadMoreEstimates);

  yield takeEvery(getEstimate, handleGetEstimate);
  yield takeEvery(convertEstimateToInvoice, handleConvertEstimateToInvoice);
  yield takeEvery(deleteEstimate, handleDeleteEstimate);

  yield takeEvery(createEstimate, handleCreateEstimate);
  yield takeEvery(createEstimateForClient, handleCreateEstimateForClient);
  yield takeEvery(editEstimate, handleEditEstimate);
  yield takeEvery(updateEstimateStatus, handleUpdateEstimateStatus);

  yield takeEvery(getEstimatesReview, handleGetEstimatesReview);

  yield takeEvery(searchEstimates, handleSearchEstimates);
  yield takeEvery(
    loadMoreEstimatesSearchResults,
    handleLoadMoreEstimatesSearchResults,
  );

  yield takeEvery(shareEstimate, handleShareEstimate);
  yield takeEvery(previewEstimate, handlePreviewEstimate);
  yield takeEvery(
    updateEstimatePaymentStatus,
    handleUpdateEstimatePaymentStatus,
  );
}

export function* estimatesSaga() {
  yield all([fork(watchFetchRequests)]);
}
