import { PayloadAction } from '@reduxjs/toolkit';
import { SubClientsProviderApi } from 'api/subClients';
import I18n, { t, translations } from 'locales';
import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { Navigator } from 'service/navigator';
import { toast } from 'shared/toast';
import {
  BlockSubClientPayload,
  ClientFilter,
  DeleteSubClientPayload,
  GetBlockedSubClientsRequest,
  GetSubClientAppointmentsPayload,
  GetSubClientsRequest,
  InviteSubClientRequest,
  ISearchRequest,
  ISubClient,
} from 'types/subClients';
import { capitalize } from 'utils/strings';

import { getBlockedProviders } from '../providers/slice';
import { subClientsSelectors } from './selectors';
import {
  blockSubClient,
  blockSubClientFailure,
  blockSubClientSuccess,
  blockUser,
  blockUserFailure,
  blockUserSuccess,
  createSubClient,
  createSubClientFailure,
  createSubClientSuccess,
  deleteSubClient,
  deleteSubClientFailure,
  deleteSubClientSuccess,
  disconnectSubClient,
  disconnectSubClientFailure,
  disconnectSubClientSuccess,
  editSubClient,
  editSubClientFailure,
  editSubClientSuccess,
  filterSubClients,
  filterSubClientsFailure,
  filterSubClientsSuccess,
  getBlockedSubClients,
  getBlockedSubClientsFailure,
  getBlockedSubClientsSuccess,
  getConnectedClients,
  getConnectedClientsFailure,
  getConnectedClientsSuccess,
  getNotConnectedClients,
  getNotConnectedClientsFailure,
  getNotConnectedClientsSuccess,
  getSubClient,
  getSubClientAppointments,
  getSubClientAppointmentsFailure,
  getSubClientAppointmentsReview,
  getSubClientAppointmentsReviewFailure,
  getSubClientAppointmentsReviewSuccess,
  getSubClientAppointmentsSuccess,
  getSubClientFailure,
  getSubClients,
  getSubClientSales,
  getSubClientSalesFailure,
  getSubClientSalesSuccess,
  getSubClientsFailure,
  getSubClientsReview,
  getSubClientsReviewFailure,
  getSubClientsReviewSuccess,
  getSubClientsSuccess,
  getSubClientSuccess,
  getSubClientsWithActiveRewards,
  getSubClientsWithActiveRewardsFailure,
  getSubClientsWithActiveRewardsSuccess,
  getSubClientsWithPendingPaymentRequests,
  getSubClientsWithPendingPaymentRequestsFailure,
  getSubClientsWithPendingPaymentRequestsSuccess,
  getSyncClient,
  getSyncClientFailed,
  getSyncClientSuccess,
  inviteClient,
  resetSubClient,
  searchSubClients,
  searchSubClientsFailure,
  searchSubClientsSuccess,
  unblockUser,
  unblockUserFailure,
  unblockUserSuccess,
} from './slice';

function* handleGetSubClients({
  payload,
}: PayloadAction<GetSubClientsRequest>) {
  try {
    const { data } = yield call(SubClientsProviderApi.getSubClients, payload);
    yield put(getSubClientsSuccess(data.result));
  } catch (error) {
    toast.info(t(translations.common.errors.load));
    yield put(getSubClientsFailure());
  }
}

function* handleGetBlockedSubClients({
  payload,
}: PayloadAction<GetBlockedSubClientsRequest>) {
  try {
    const { data } = yield call(
      SubClientsProviderApi.getBlockedSubClients,
      payload,
    );
    yield put(getBlockedSubClientsSuccess(data?.result));
  } catch (error: any) {
    toast?.info(error?.message);

    yield put(getBlockedSubClientsFailure());
  }
}

function* handleSearchSubClients({ payload }: PayloadAction<ISearchRequest>) {
  try {
    const { data } = yield call(SubClientsProviderApi.search, payload);
    yield put(searchSubClientsSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(searchSubClientsFailure());
  }
}

function* handleFilterSubClients(action: PayloadAction<ClientFilter>) {
  try {
    const { data } = yield call(
      SubClientsProviderApi.filterClients,
      action.payload,
    );
    yield put(filterSubClientsSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(filterSubClientsFailure());
  }
}

function* handleGetSubClientsReview() {
  try {
    const { data } = yield call(SubClientsProviderApi.getReview);

    yield put(getSubClientsReviewSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(getSubClientsReviewFailure());
  }
}

function* handleGetSubClientsWithActiveRewards({
  payload,
}: PayloadAction<number>) {
  try {
    const { data } = yield call(
      SubClientsProviderApi.getSubClientsWithActiveRewards,
      payload,
    );
    yield put(getSubClientsWithActiveRewardsSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(getSubClientsWithActiveRewardsFailure());
  }
}

function* handleGetSubClientsWithPaymentRequests({
  payload,
}: PayloadAction<any>) {
  try {
    const { data } = yield call(
      SubClientsProviderApi.getSubClientsWithPaymentRequests,
      payload,
    );
    yield put(getSubClientsWithPendingPaymentRequestsSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(getSubClientsWithPendingPaymentRequestsFailure());
  }
}

function* handleGetConnectedClients({
  payload,
}: PayloadAction<ISearchRequest>) {
  try {
    const { data } = yield call(SubClientsProviderApi.search, {
      ...payload,
      isConnected: true,
    });

    yield put(getConnectedClientsSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(getConnectedClientsFailure());
  }
}

function* handleGetNotConnectedClients({
  payload,
}: PayloadAction<ISearchRequest>) {
  try {
    const { data } = yield call(SubClientsProviderApi.search, {
      ...payload,
      isConnected: false,
    });

    yield put(getNotConnectedClientsSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(getNotConnectedClientsFailure());
  }
}

function* handleCreateSubClient({ payload }: PayloadAction<any>) {
  try {
    yield call(SubClientsProviderApi.createSubClient, payload.formData);

    if (payload.notification) {
      toast.info(
        t(translations.common.messages.creation, {
          entity: t(translations.common.entities.client),
        }),
      );
    } else {
      toast.info(t(translations.common.messages.notification));
    }

    yield put(createSubClientSuccess());
    Navigator.navigate('Clients');

    yield put(getSubClients());
  } catch (error) {
    console.log('error in create sub clients ==> ', error);

    toast.info(
      t(translations.common.errors.process, {
        process: t(translations.common.processes.create),
        entity: t(translations.common.entities.client),
      }),
    );

    yield put(createSubClientFailure());
  }
}

function* handleEditSubClient({ payload }: PayloadAction<any>) {
  try {
    const { id }: ISubClient = yield select(subClientsSelectors.subClient);

    yield call(SubClientsProviderApi.updateSubClient, id, payload);

    toast.info(
      t(translations.common.messages.edition, {
        entity: capitalize(t(translations.common.entities.client)),
      }),
    );

    yield put(editSubClientSuccess());
    Navigator.goBack();

    yield put(getSubClient(id));
  } catch (error: any) {
    console.log('error ++++++>>>>>> ', error?.errors);

    toast.info(
      t(translations.common.errors.process, {
        process: t(translations.common.processes.edit),
        entity: t(translations.common.entities.client),
      }),
    );

    yield put(editSubClientFailure());
  }
}

function* handleDisconnectSubClient({ payload }: PayloadAction<any>) {
  try {
    const { id }: ISubClient = yield select(subClientsSelectors.subClient);

    yield call(SubClientsProviderApi.updateSubClient, id, payload);

    toast.info(t('client has been successfully disconnected'));

    yield put(disconnectSubClientSuccess());

    yield put(getSubClient(id));
  } catch (error: any) {
    toast.info(
      t(translations.common.errors.process, {
        process: t(translations.common.processes.edit),
        entity: t(translations.common.entities.client),
      }),
    );

    yield put(disconnectSubClientFailure());
  }
}

function* handleGetSubClient({ payload }: PayloadAction<number>) {
  try {
    const { data } = yield call(SubClientsProviderApi.getSubClient, payload);

    yield put(getSubClientSuccess(data));
  } catch (error: any) {
    toast.info(t(translations.common.errors.load));

    yield put(getSubClientFailure(new Error(error.message)));
  }
}

function* handleInviteSubClient({
  payload,
}: PayloadAction<InviteSubClientRequest>) {
  try {
    const { data } = yield call(SubClientsProviderApi.invitationLimit, payload);
    if (data) {
      yield call(SubClientsProviderApi.inviteSubClient, payload?.id);
      toast.info('Invitation has been successfully sent');
    }
  } catch (error: any) {
    toast.info(t(error?.message));
  }
}

function* handleGetSubClientAppointments({
  payload,
}: PayloadAction<GetSubClientAppointmentsPayload>) {
  try {
    const { data } = yield call(
      SubClientsProviderApi.getSubClientAppointments,
      payload,
    );
    yield put(getSubClientAppointmentsSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(getSubClientAppointmentsFailure());
  }
}

function* handleGetSubClientAppointmentsReview({
  payload,
}: PayloadAction<any>) {
  try {
    const { data } = yield call(
      SubClientsProviderApi.getSubClientAppointmentsReview,
      payload,
    );
    yield put(getSubClientAppointmentsReviewSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));
    yield put(getSubClientAppointmentsReviewFailure());
  }
}

function* handleGetSubClientSales({
  payload,
}: PayloadAction<GetSubClientAppointmentsPayload>) {
  try {
    const { data } = yield call(SubClientsProviderApi.getSubClientWithSales);
    yield put(getSubClientSalesSuccess(data));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(getSubClientSalesFailure());
  }
}

function* handleDeleteSubClient({
  payload,
}: PayloadAction<DeleteSubClientPayload>) {
  try {
    const { id, onSuccess } = payload;

    yield call(SubClientsProviderApi.deleteSubClient, id);

    toast.info(
      t(translations.common.messages.deletion, {
        entity: capitalize(t(translations.common.entities.client)),
      }),
    );

    yield put(deleteSubClientSuccess());
    Navigator.goBack();

    if (onSuccess) {
      yield onSuccess();
    }
  } catch (error) {
    toast.info(
      t(translations.common.errors.process, {
        process: t(translations.common.processes.delete),
        entity: t(translations.common.entities.client),
      }),
    );

    yield put(deleteSubClientFailure());
  }
}

function* handleBlockSubClient({
  payload,
}: PayloadAction<BlockSubClientPayload>) {
  try {
    const { id, onSuccess } = payload;

    const { data } = yield call(SubClientsProviderApi.blockSubClient, id);

    if (data) {
      toast.info(t(translations.common.messages.block));
    }

    yield put(blockSubClientSuccess());
    Navigator.goBack();
  } catch (error: any) {
    toast.info(error?.message);
    yield put(blockSubClientFailure());
  }
}

function* handleBlockUser({ payload }: PayloadAction<any>) {
  try {
    const { data } = yield call(SubClientsProviderApi.blockUser, payload);

    if (data) {
      toast.info(
        I18n.t('common.messages.block', {
          entity: payload?.isProvider ? 'Client' : 'Provider',
          entity2: payload?.isProvider ? 'client' : 'provider',
        }),
      );
    }

    yield put(blockUserSuccess());
    if (payload?.isFromClientProfile) {
      yield put(getBlockedSubClients({ query: '' }));
      // yield put(getSubClient(payload?.clientProfileId));
    } else if (payload?.isFromProviderProfile) {
      yield put(getBlockedProviders({ query: '' }));
    } else {
      Navigator.goBack();
    }
  } catch (error: any) {
    toast.info(error?.message);
    yield put(blockUserFailure());
  }
}

function* handleUnBlockUser({ payload }: PayloadAction<any>) {
  try {
    const { data } = yield call(SubClientsProviderApi.unblockUser, payload);
    if (data) {
      yield put(getBlockedSubClients({ query: '' }));
      yield put(unblockUserSuccess());
    }
  } catch (error: any) {
    toast.info(error?.message);
    yield put(unblockUserFailure());
  }
}
function* handleSyncClient({ payload }: PayloadAction<any>) {
  try {
    const { data } = yield call(SubClientsProviderApi.syncClientApi, payload);
    yield put(getSyncClientSuccess(data));
    toast.info('Clients details have been synced successfully.');
  } catch (error) {
    yield put(getSyncClientFailed());
  }
}

function* watchFetchRequests() {
  yield takeEvery(blockUser, handleBlockUser);
  yield takeEvery(unblockUser, handleUnBlockUser);
  yield takeEvery(getSyncClient, handleSyncClient);
  yield takeEvery(getSubClient, handleGetSubClient);
  //@ts-ignore
  yield takeEvery(getSubClients, handleGetSubClients);
  yield takeEvery(editSubClient, handleEditSubClient);
  yield takeEvery(inviteClient, handleInviteSubClient);
  yield takeEvery(blockSubClient, handleBlockSubClient);
  yield takeEvery(createSubClient, handleCreateSubClient);
  yield takeEvery(deleteSubClient, handleDeleteSubClient);
  yield takeEvery(searchSubClients, handleSearchSubClients);
  yield takeEvery(filterSubClients, handleFilterSubClients);
  yield takeEvery(getSubClientSales, handleGetSubClientSales);
  yield takeEvery(getConnectedClients, handleGetConnectedClients);
  yield takeEvery(disconnectSubClient, handleDisconnectSubClient);
  yield takeEvery(getSubClientsReview, handleGetSubClientsReview);
  yield takeEvery(getBlockedSubClients, handleGetBlockedSubClients);
  yield takeEvery(getNotConnectedClients, handleGetNotConnectedClients);
  yield takeEvery(getSubClientAppointments, handleGetSubClientAppointments);
  yield takeEvery(
    getSubClientsWithActiveRewards,
    handleGetSubClientsWithActiveRewards,
  );
  yield takeEvery(
    getSubClientAppointmentsReview,
    handleGetSubClientAppointmentsReview,
  );
  yield takeEvery(
    getSubClientsWithPendingPaymentRequests,
    handleGetSubClientsWithPaymentRequests,
  );
}

export function* subClientsSaga() {
  yield all([fork(watchFetchRequests)]);
}
