import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  all,
  call,
  debounce,
  fork,
  put,
  select,
  takeEvery,
} from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { ProvidersClientApi, ProvidersProviderApi } from 'api/providers';
import { SubClientsProviderApi } from 'api/subClients';
import I18n, { t, translations } from 'locales';
import { Navigator } from 'service/navigator';
import { toast } from 'shared/toast';
import { IPlace } from 'types/address';
import { PaginationRequest } from 'types/api';
import { IAppointmentsRequest } from 'types/appointments';
import {
  BlockProviderPayload,
  GetProvidersRequest,
  IProvider,
  ISearchProvidersRequest,
} from 'types/users';
import { PREVIOUS_PLACES_KEY } from 'utils/constants';

import { providersSelectors } from './selectors';
import {
  blockProvider,
  blockProviderFailure,
  blockProviderSuccess,
  deletePreviousPlaces,
  getAppointments,
  getAppointmentsFailure,
  getAppointmentsSuccess,
  getBlockedProviders,
  getBlockedProvidersFailure,
  getBlockedProvidersSuccess,
  getEstimates,
  getEstimatesFailure,
  getEstimatesSuccess,
  getInvoices,
  getInvoicesFailure,
  getInvoicesSuccess,
  getPayments,
  getPaymentsFailure,
  getPaymentsSuccess,
  getPreviousPlaces,
  getPreviousPlacesSuccess,
  getProvider,
  getProviderFailure,
  getProviderPlanId,
  getProviderPlanIdFailure,
  getProviderPlanIdSuccess,
  getProviders,
  getProvidersFailure,
  getProvidersSuccess,
  getProviderSuccess,
  getSales,
  getSalesFailure,
  getSalesSpecialsByProviders,
  getSalesSpecialsByProvidersFailure,
  getSalesSpecialsByProvidersSuccess,
  getSalesSuccess,
  getScheduledAppointments,
  getScheduledAppointmentsFailure,
  getScheduledAppointmentsSuccess,
  loadMoreSearchResults,
  loadMoreSearchResultsFailure,
  loadMoreSearchResultsSuccess,
  refreshAppointments,
  refreshAppointmentsFailure,
  refreshAppointmentsSuccess,
  refreshEstimates,
  refreshEstimatesFailure,
  refreshEstimatesSuccess,
  refreshInvoices,
  refreshInvoicesFailure,
  refreshInvoicesSuccess,
  refreshPayments,
  refreshPaymentsFailure,
  refreshPaymentsSuccess,
  refreshProviders,
  refreshProvidersFailure,
  refreshProvidersSuccess,
  refreshSales,
  refreshSalesFailure,
  refreshSalesSuccess,
  refundRequestOnPayment,
  refundRequestOnPaymentFailure,
  refundRequestOnPaymentSuccess,
  searchProviders,
  searchProvidersFailure,
  searchProvidersSuccess,
  selectPlace,
  shortlistProvider,
  shortlistProviderFailure,
  shortlistProviderSuccess,
  unBlockProvider,
  unBlockProviderFailure,
  unBlockProviderSuccess,
  unshortlistProvider,
  unshortlistProviderFailure,
  unshortlistProviderSuccess,
} from './slice';

function* handleGetProviders({ payload }: PayloadAction<GetProvidersRequest>) {
  try {
    const { data } = yield call(ProvidersClientApi.getProviders, payload);

    yield put(getProvidersSuccess(data));
  } catch (error: any) {
    error?.toString() == 'Error: Cannot load an empty url'
      ? toast.info('Connection was Interrupted!')
      : toast.info(error?.message);

    yield put(getProvidersFailure());
  }
}

function* handleGetBlockedProviders({
  payload,
}: PayloadAction<GetProvidersRequest>) {
  try {
    const { data } = yield call(
      ProvidersProviderApi.getBlockedProviders,
      payload,
    );
    yield put(getBlockedProvidersSuccess(data));
  } catch (error: any) {
    toast.info(error?.message);
    yield put(getBlockedProvidersFailure());
  }
}

function* handleRefreshProviders({
  payload,
}: PayloadAction<GetProvidersRequest>) {
  try {
    const { data } = yield call(ProvidersClientApi.getProviders, payload);

    yield put(refreshProvidersSuccess(data));
  } catch (error: any) {
    error?.toString() == 'Error: Cannot load an empty url'
      ? toast.info('Connection was Interrupted!')
      : toast.info(error?.message);

    yield put(refreshProvidersFailure());
  }
}

function* handleGetProvider(action: PayloadAction<number>) {
  try {
    console.log('action.payload=== >> ', action.payload);

    const { data } = yield call(
      ProvidersProviderApi.getProvider,
      action.payload,
    );

    yield put(getProviderSuccess(data));
  } catch (error: any) {
    toast.info(I18n.t('providers.getProviderFailure'));

    yield put(getProviderFailure(error));
  }
}

function* handleBlockProvider({
  payload,
}: PayloadAction<BlockProviderPayload>) {
  try {
    const { id, onSuccess } = payload;
    const { data } = yield call(ProvidersProviderApi.blockProvider, id);

    if (data) {
      toast.info(t(translations.common.messages.blockProvider));
    }

    yield put(blockProviderSuccess());
    Navigator.goBack();
  } catch (error: any) {
    toast.info(error?.message);
    yield put(blockProviderFailure());
  }
}

function* handleUnBlockProvider({ payload }: PayloadAction<any>) {
  try {
    const { data } = yield call(SubClientsProviderApi.unblockUser, payload);
    if (data) {
      yield put(getBlockedProviders({ query: '' }));
      yield put(unBlockProviderSuccess());
    }
  } catch (error: any) {
    toast.info(error?.message);
    yield put(unBlockProviderFailure());
  }
}

function* handleGetAppointments(action: PayloadAction<IAppointmentsRequest>) {
  try {
    const { data } = yield call(
      ProvidersProviderApi.getAppointments,
      action.payload,
    );

    yield put(getAppointmentsSuccess(data));
  } catch (error: any) {
    error?.toString() == 'Error: Cannot load an empty url'
      ? toast.info('Connection was Interrupted!')
      : toast.info(error?.message);

    yield put(getAppointmentsFailure());
  }
}

function* handleScheduledAppointments(
  action: PayloadAction<IAppointmentsRequest>,
) {
  try {
    const { data } = yield call(
      ProvidersProviderApi.getAppointments,
      action.payload,
    );

    yield put(getScheduledAppointmentsSuccess(data));
  } catch (error: any) {
    getAppointmentsFailure();
    toast.info(error.message);
    yield put(getScheduledAppointmentsFailure());
  }
}

function* handleRefreshAppointments(action: PayloadAction<number>) {
  try {
    const { data } = yield call(ProvidersProviderApi.getAppointments, {
      id: action.payload,
      offset: 0,
    });

    yield put(refreshAppointmentsSuccess(data));
  } catch (error: any) {
    error?.toString() == 'Error: Cannot load an empty url'
      ? toast.info('Connection was Interrupted!')
      : toast.info(error?.message);

    yield put(refreshAppointmentsFailure());
  }
}

function* handleGetInvoices({ payload }: PayloadAction<PaginationRequest>) {
  try {
    const { data } = yield call(ProvidersProviderApi.getInvoices, payload);

    yield put(getInvoicesSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(getInvoicesFailure());
  }
}

function* handleGetEstimates({ payload }: PayloadAction<PaginationRequest>) {
  try {
    const { data } = yield call(ProvidersProviderApi.getEstimates, payload);

    yield put(getEstimatesSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(getEstimatesFailure());
  }
}

function* handleRefreshInvoices({ payload }: PayloadAction<number>) {
  try {
    const { data } = yield call(ProvidersProviderApi.getInvoices, {
      id: payload,
      offset: 0,
    });

    yield put(refreshInvoicesSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(refreshInvoicesFailure());
  }
}

function* handleRefreshEstimates({ payload }: PayloadAction<number>) {
  try {
    const { data } = yield call(ProvidersProviderApi.getEstimates, {
      id: payload,
      offset: 0,
    });
    yield put(refreshEstimatesSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(refreshEstimatesFailure());
  }
}

function* handleGetSales({ payload }: PayloadAction<PaginationRequest>) {
  try {
    const { data } = yield call(ProvidersProviderApi.getSales, payload);

    yield put(getSalesSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(getSalesFailure());
  }
}

function* handleRefreshSales({ payload }: PayloadAction<number>) {
  try {
    const { data } = yield call(ProvidersProviderApi.getSales, {
      id: payload,
      offset: 0,
    });

    yield put(refreshSalesSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(refreshSalesFailure());
  }
}

function* handleGetPayments({ payload }: PayloadAction<PaginationRequest>) {
  try {
    const { data } = yield call(ProvidersProviderApi.getPayments, payload);

    yield put(getPaymentsSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(getPaymentsFailure());
  }
}

function* handleRefreshPayments({ payload }: PayloadAction<number>) {
  try {
    const { data } = yield call(ProvidersProviderApi.getPayments, {
      id: payload,
      offset: 0,
    });

    yield put(refreshPaymentsSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(refreshPaymentsFailure());
  }
}

function* handleRefundRequestOnPayment({ payload }: PayloadAction<any>) {
  try {
    const { data } = yield call(
      ProvidersProviderApi.refundRequestOnPayment,
      payload,
    );

    yield put(refundRequestOnPaymentSuccess(data));
    toast.info(
      'Refund requested successfully. It may take 5-10 business days for funds to settle after the approval',
    );

    Navigator.goBack();
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(refundRequestOnPaymentFailure());
  }
}

function* handleSelectPlace() {
  const previousPlaces: IPlace[] = yield select(
    providersSelectors.previousPlaces,
  );
  const data = JSON.stringify(previousPlaces);

  yield call(AsyncStorage.setItem, PREVIOUS_PLACES_KEY, data);
}

function* handleGetPreviousPlaces() {
  const data: string = yield call(AsyncStorage.getItem, PREVIOUS_PLACES_KEY);
  const previousPlaces = JSON.parse(data) || [];

  yield put(getPreviousPlacesSuccess(previousPlaces));
}

function* handleDeletePreviousPlaces() {
  yield call(AsyncStorage.removeItem, PREVIOUS_PLACES_KEY);
}

function* handleSearchProviders(
  action: PayloadAction<ISearchProvidersRequest>,
) {
  try {
    const { data } = yield call(
      ProvidersProviderApi.getProviders,
      action.payload,
    );

    yield put(searchProvidersSuccess(data));
  } catch (error) {
    toast.info(I18n.t('common.errors.load'));

    yield put(searchProvidersFailure());
  }
}

function* handleLoadMoreSearchResults(
  action: PayloadAction<ISearchProvidersRequest>,
) {
  try {
    const { data } = yield call(
      ProvidersProviderApi.getProviders,
      action.payload,
    );

    yield put(loadMoreSearchResultsSuccess(data));
  } catch (error) {
    toast.info(I18n.t('common.errors.load'));

    yield put(loadMoreSearchResultsFailure());
  }
}

function* handleShortlistProvider(action: PayloadAction<IProvider>) {
  try {
    yield call(ProvidersClientApi.shortlistProvider, action.payload.id);

    yield put(shortlistProviderSuccess(action.payload));
  } catch (error: any) {
    error?.toString() == 'Error: Cannot load an empty url'
      ? toast.info('Connection was Interrupted!')
      : toast.info(error?.message);

    yield put(shortlistProviderFailure());
  }
}

function* handleUnshortlistProvider(action: PayloadAction<IProvider>) {
  try {
    yield call(ProvidersClientApi.unshortlistProvider, action.payload.id);

    toast.info(I18n.t('providers.unshortlist'));

    yield put(unshortlistProviderSuccess(action.payload));
  } catch (error: any) {
    error?.toString() == 'Error: Cannot load an empty url'
      ? toast.info('Connection was Interrupted!')
      : toast.info(error?.message);

    yield put(unshortlistProviderFailure());
  }
}

function* handleGetSalesSpecialsByProviders(action: PayloadAction<any>) {
  try {
    const { data } = yield call(
      ProvidersProviderApi.getClientSalesSpecials,
      action.payload,
    );

    yield put(getSalesSpecialsByProvidersSuccess(data));
  } catch (error) {
    toast.info(I18n.t('common.errors.load'));

    yield put(getSalesSpecialsByProvidersFailure());
  }
}

function* handleGetProviderPlanId(action: any) {
  try {
    const { data } = yield call(
      ProvidersProviderApi.getProviderPlanId,
      action.payload.id,
    );

    yield put(getProviderPlanIdSuccess(data));
  } catch (error) {
    toast.info(I18n.t('common.errors.load'));

    yield put(getProviderPlanIdFailure());
  }
}

function* watchFetchRequests() {
  yield takeEvery(getProviders, handleGetProviders);
  yield takeEvery(getBlockedProviders, handleGetBlockedProviders);
  yield takeEvery(refreshProviders, handleRefreshProviders);

  yield takeEvery(getProvider, handleGetProvider);
  yield takeEvery(blockProvider, handleBlockProvider);
  yield takeEvery(unBlockProvider, handleUnBlockProvider);

  yield takeEvery(getAppointments, handleGetAppointments);
  yield takeEvery(getScheduledAppointments, handleScheduledAppointments);
  yield takeEvery(refreshAppointments, handleRefreshAppointments);
  yield takeEvery(getInvoices, handleGetInvoices);
  yield takeEvery(getEstimates, handleGetEstimates);
  yield takeEvery(refreshInvoices, handleRefreshInvoices);
  yield takeEvery(refreshEstimates, handleRefreshEstimates);
  yield takeEvery(getSales, handleGetSales);
  yield takeEvery(refreshSales, handleRefreshSales);
  yield takeEvery(getPayments, handleGetPayments);
  yield takeEvery(refreshPayments, handleRefreshPayments);
  yield takeEvery(refundRequestOnPayment, handleRefundRequestOnPayment);

  yield takeEvery(selectPlace, handleSelectPlace);
  yield takeEvery(getPreviousPlaces, handleGetPreviousPlaces);
  yield takeEvery(deletePreviousPlaces, handleDeletePreviousPlaces);

  yield debounce(200, searchProviders, handleSearchProviders);
  yield takeEvery(loadMoreSearchResults, handleLoadMoreSearchResults);

  yield takeEvery(shortlistProvider, handleShortlistProvider);
  yield takeEvery(unshortlistProvider, handleUnshortlistProvider);

  yield takeEvery(
    getSalesSpecialsByProviders,
    handleGetSalesSpecialsByProviders,
  );

  yield takeEvery(getProviderPlanId, handleGetProviderPlanId);
}

export function* providersSaga() {
  yield all([fork(watchFetchRequests)]);
}
