import { Api, LIMIT } from 'api';
import { Moment } from 'moment';
import { ApiResponse, PageableApiResponse } from 'types/api';
import {
  ClientFilter,
  ConnectSubClientRequest,
  GetBlockedSubClientsRequest,
  GetSubClientsRequest,
  InviteSubClientRequest,
  ISearchRequest,
  ISubClient,
  ISubClientsReview,
} from 'types/subClients';

const getSubClients = (
  params: GetSubClientsRequest,
): PageableApiResponse<ISubClient[]> =>
  Api.get('/provider/clients', {
    params: {
      offset: 0,
      limit: 100,
      ...params,
    },
    timeout: 40000,
  });

const getBlockedSubClients = (
  params: GetBlockedSubClientsRequest,
): PageableApiResponse<any> =>
  Api.get(`/blocked-provider?query=${params?.query}`);

const inviteSubClient = (id: number | any): ApiResponse<ISubClient[]> =>
  Api.post(`/provider/client/${id}/invite`);

const invitationLimit = (
  params: InviteSubClientRequest,
): ApiResponse<ISubClient[]> =>
  Api.patch(`provider/client/${params?.id}/clientInvitation`, {
    invitationDate: params?.date,
  });

const search = ({
  query,
  limit,
  offset,
  isConnected,
}: ISearchRequest): PageableApiResponse<ISubClient[]> =>
  Api.get('/provider/clients', {
    params: {
      query,
      limit,
      offset,
      isConnected: isConnected,
    },
  });

const filterClients = (
  params: ClientFilter,
): PageableApiResponse<ISubClient[]> =>
  Api.get(`/provider/clients-filter?filter=${params}`);

const getReview = (): ApiResponse<ISubClientsReview> =>
  Api.get('/provider/clients/review', { timeout: 60000 })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });

const getSubClientsWithActiveRewards = (
  id: number,
): ApiResponse<ISubClientsReview> => {
  return Api.get(`/loyalty/getActiveLoyaltyRewards/${id}`);
};

const getSubClientsWithPaymentRequests = (
  id: number,
): ApiResponse<ISubClientsReview> => Api.get(`/sale/pendingPayments/${id}`);

const createSubClient = (clientInfo: any): ApiResponse<ISubClient> =>
  Api.post('/provider/client', clientInfo, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

const updateSubClient = (
  id: number,
  clientInfo: any,
): ApiResponse<ISubClient> =>
  Api.put(`/provider/client/${id}`, clientInfo, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

const getSubClient = (id: number): ApiResponse<ISubClient> =>
  Api.get(`/provider/client/${id}`);

const getSubClientAppointments = (
  params: any,
): PageableApiResponse<ISubClient[]> =>
  Api.get(`/provider/client/${params.id}/appointments`, {
    params: {
      limit: params?.limit || null,
      offset: params?.offset || null,
    },
  });

const getSubClientAppointmentsReview = (
  params: any,
): PageableApiResponse<ISubClient[]> =>
  Api.get('/provider/client/clientreviewprofileappointments', {
    params: {
      limit: params?.limit || null,
      offset: params?.offset || null,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });

const getSubClientWithSales = (): PageableApiResponse<ISubClient[]> =>
  Api.get('/provider/client/clientWithSales')
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });

const deleteSubClient = (id: number): ApiResponse<void> =>
  Api.delete(`/provider/client/${id}`);

const blockSubClient = (id: number): ApiResponse<void> =>
  Api.patch(`/provider/client/${id}/is-blocked`, {
    isBlocked: true,
  });

const blockUser = (data: any): ApiResponse<void> =>
  Api.post('blocked-provider', {
    isBlocked: true,
    providerId: data?.providerId,
    clientId: data?.clientId,
  });

const unblockUser = (data: any): ApiResponse<void> =>
  Api.delete(`blocked-provider/${data?.providerId}/${data?.clientId}`);

const unBlockSubClient = (id: number): ApiResponse<void> =>
  Api.patch(`/provider/client/${id}/is-blocked`, {
    isBlocked: false,
  });

const connectClient = ({
  id,
  ...data
}: ConnectSubClientRequest): ApiResponse<void> =>
  Api.patch(`/provider/client/${id}/connect`, data);

const syncClientApi = (id: number): ApiResponse<void> =>
  Api.get(`provider/client/${id}/syncClientDetails`);

export const SubClientsProviderApi = {
  search,
  getReview,
  blockUser,
  unblockUser,
  getSubClient,
  getSubClients,
  syncClientApi,
  filterClients,
  connectClient,
  blockSubClient,
  inviteSubClient,
  invitationLimit,
  updateSubClient,
  createSubClient,
  deleteSubClient,
  unBlockSubClient,
  getBlockedSubClients,
  getSubClientWithSales,
  getSubClientAppointments,
  getSubClientsWithActiveRewards,
  getSubClientAppointmentsReview,
  getSubClientsWithPaymentRequests,
};
