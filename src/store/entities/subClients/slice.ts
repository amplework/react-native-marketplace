import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pagination } from 'types/api';
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
  ISubClientsReview,
  ISubClientsWithActiveRewards,
  ISubClientsWithPendingRequests,
} from 'types/subClients';

import { SubClients } from './types';

const initialState: SubClients = {
  subClients: [],
  blockedSubclients: [],
  connectedClients: [],
  connectedClientsLoading: false,
  notConnectedClients: [],
  notConnectedClientsLoading: false,
  subClient: undefined,
  subClientLoading: false,
  subClientAppointments: null,
  subClientAppointmentReview: null,
  subClientAppointmentReviewLoading: false,
  subClientAppointmentsLoading: false,
  subClientSales: null,
  subClientSalesLoading: false,
  loading: false,
  error: null,
  addEditLoading: false,
  deleteLoading: false,
  blockLoading: false,
  searchResults: [],
  filteredClients: [],
  searchLoading: false,
  filterLoading: false,
  review: {
    clients: {
      totalCount: 0,
      newCount: 0,
      notConnectedCount: 0,
      connectedCount: 0,
    },
  },
  reviewLoading: false,
  clientWithActiveRewards: {
    totalCount: 0,
    data: [],
  },
  clientWithPendingPaymentRequests: {
    totalCount: 0,
    data: [],
  },
};

const subClients = createSlice({
  name: 'subClients',
  initialState,
  reducers: {
    getSubClients: (state) => {
      state.loading = true;
    },
    getSubClientsSuccess: (state, { payload }: PayloadAction<ISubClient[]>) => {
      state.loading = false;
      state.subClients = payload;
    },
    getSubClientsFailure: (state) => {
      state.loading = false;
    },
    getBlockedSubClients: (
      state,
      _action: PayloadAction<GetBlockedSubClientsRequest | undefined | any>,
    ) => {
      state.loading = true;
    },
    getBlockedSubClientsSuccess: (
      state,
      { payload }: PayloadAction<ISubClient[]>,
    ) => {
      state.loading = false;
      state.blockedSubclients = payload;
    },
    getBlockedSubClientsFailure: (state) => {
      state.loading = false;
    },
    getNotConnectedClients: (state, _action: PayloadAction<ISearchRequest>) => {
      state.notConnectedClientsLoading = true;
    },
    getNotConnectedClientsSuccess: (
      state,
      { payload }: PayloadAction<Pagination<any>>,
    ) => {
      state.notConnectedClientsLoading = false;
      // state.connectedClients = [];
      state.notConnectedClients =
        payload.meta.offset === 0
          ? payload.result
          : [...state.notConnectedClients, ...payload.result];
    },
    getNotConnectedClientsFailure: (state) => {
      state.notConnectedClientsLoading = false;
    },
    getConnectedClients: (state, _action: PayloadAction<ISearchRequest>) => {
      state.connectedClientsLoading = true;
    },
    getConnectedClientsSuccess: (
      state,
      { payload }: PayloadAction<Pagination<any>>,
    ) => {
      state.connectedClientsLoading = false;
      // state.notConnectedClients = [];
      state.connectedClients =
        payload.meta.offset === 0
          ? payload.result
          : [...state.connectedClients, ...payload.result];
    },
    getConnectedClientsFailure: (state) => {
      state.connectedClientsLoading = false;
    },
    getSubClient: (state, _action: PayloadAction<number>) => {
      state.subClientLoading = true;
      state.searchResults = [];
      state.notConnectedClients = [];
      state.connectedClients = [];
    },
    getSubClientSuccess: (state, { payload }: PayloadAction<ISubClient>) => {
      state.subClientLoading = false;
      state.subClient = payload;
    },
    getSubClientFailure: (state, { payload }: PayloadAction<Error>) => {
      state.subClientLoading = false;
      state.error = payload;
    },
    resetSubClient: (state) => {
      state.subClient = undefined;
    },
    createSubClient: (state, _action: PayloadAction<any>) => {
      state.addEditLoading = true;
    },
    createSubClientSuccess: (state) => {
      state.addEditLoading = false;
    },
    createSubClientFailure: (state) => {
      state.addEditLoading = false;
    },
    editSubClient: (state, _action: PayloadAction<any>) => {
      state.addEditLoading = true;
    },
    editSubClientSuccess: (state) => {
      state.addEditLoading = false;
    },
    editSubClientFailure: (state) => {
      state.addEditLoading = false;
    },
    disconnectSubClient: (state, _action: PayloadAction<any>) => {
      state.addEditLoading = true;
    },
    disconnectSubClientSuccess: (state) => {
      state.addEditLoading = false;
    },
    disconnectSubClientFailure: (state) => {
      state.addEditLoading = false;
    },
    deleteSubClient: (
      state,
      _action: PayloadAction<DeleteSubClientPayload>,
    ) => {
      state.deleteLoading = true;
    },
    deleteSubClientSuccess: (state) => {
      state.deleteLoading = false;
    },
    deleteSubClientFailure: (state) => {
      state.deleteLoading = false;
    },
    blockSubClient: (state, _action: PayloadAction<BlockSubClientPayload>) => {
      state.blockLoading = true;
    },
    blockSubClientSuccess: (state) => {
      state.blockLoading = false;
    },
    blockSubClientFailure: (state) => {
      state.blockLoading = false;
    },
    blockUser: (state, _action: PayloadAction<any>) => {
      state.blockLoading = true;
    },
    blockUserSuccess: (state) => {
      state.blockLoading = false;
    },
    blockUserFailure: (state) => {
      state.blockLoading = false;
    },
    unblockUser: (state, _action: PayloadAction<any>) => {
      state.blockLoading = true;
    },
    unblockUserSuccess: (state) => {
      state.blockLoading = false;
    },
    unblockUserFailure: (state) => {
      state.blockLoading = false;
    },
    searchSubClients: (state, _action: PayloadAction<ISearchRequest>) => {
      state.searchLoading = true;
    },
    searchSubClientsSuccess: (
      state,
      { payload }: PayloadAction<Pagination<ISubClient[]>>,
    ) => {
      state.searchLoading = false;
      state.searchResults =
        payload.meta.offset === 0
          ? payload.result
          : [...state.searchResults, ...payload.result];
    },
    searchSubClientsFailure: (state) => {
      state.searchLoading = false;
    },
    filterSubClients: (state, _action: PayloadAction<ClientFilter>) => {
      state.filterLoading = true;
    },
    filterSubClientsSuccess: (state, { payload }: PayloadAction<any>) => {
      state.filterLoading = false;
      state.filteredClients = payload;
    },
    filterSubClientsFailure: (state) => {
      state.filterLoading = false;
    },
    resetSearchResults: (state) => {
      state.searchResults = [];
    },
    resetSubClients: (state) => {
      state.subClients = [];
    },
    getSubClientsReview: (state) => {
      state.reviewLoading = true;
    },
    getSubClientsReviewSuccess: (
      state,
      { payload }: PayloadAction<ISubClientsReview>,
    ) => {
      state.reviewLoading = false;
      state.review = payload;
    },
    getSubClientsReviewFailure: (state) => {
      state.reviewLoading = false;
    },
    getSubClientsWithActiveRewards: (state, _action: PayloadAction<number>) => {
      state.reviewLoading = true;
    },
    getSubClientsWithActiveRewardsSuccess: (
      state,
      { payload }: PayloadAction<any>,
    ) => {
      const rewardsData: ISubClientsWithActiveRewards = {
        totalCount: payload?.total,
        data: payload?.data,
      };
      state.reviewLoading = false;
      state.clientWithActiveRewards = rewardsData;
    },
    getSubClientsWithActiveRewardsFailure: (state) => {
      state.reviewLoading = false;
    },
    getSubClientsWithPendingPaymentRequests: (
      state,
      _action: PayloadAction<number>,
    ) => {
      state.reviewLoading = true;
    },
    getSubClientsWithPendingPaymentRequestsSuccess: (
      state,
      { payload }: PayloadAction<any>,
    ) => {
      const onlineSales = payload?.sale.filter(
        (sale: any) => sale?.paymentMethod?.shortName == 'Online',
      );
      const requestsData: ISubClientsWithPendingRequests = {
        totalCount: payload?.total,
        data: onlineSales,
      };
      state.reviewLoading = false;
      state.clientWithPendingPaymentRequests = requestsData;
    },
    getSubClientsWithPendingPaymentRequestsFailure: (state) => {
      state.reviewLoading = false;
    },
    getSubClientAppointments: (
      state,
      _action: PayloadAction<GetSubClientAppointmentsPayload>,
    ) => {
      state.subClientAppointmentsLoading = true;
    },
    getSubClientAppointmentsReview: (state, _action: PayloadAction<any>) => {
      state.subClientAppointmentReviewLoading = true;
    },
    getSubClientAppointmentsSuccess: (
      state,
      { payload }: PayloadAction<any>,
    ) => {
      state.subClientAppointmentsLoading = false;
      state.subClientAppointments = payload.result;
    },
    getSubClientAppointmentsReviewSuccess: (
      state,
      { payload }: PayloadAction<any>,
    ) => {
      state.subClientAppointmentReview = payload.clientWithAppointmentList;
      state.subClientAppointmentReviewLoading = false;
    },
    getSubClientAppointmentsReviewFailure: (state) => {
      state.subClientAppointmentReviewLoading = false;
    },
    getSubClientAppointmentsFailure: (state) => {
      state.subClientAppointmentsLoading = false;
    },
    getSubClientSales: (
      state,
      _action: PayloadAction<GetSubClientAppointmentsPayload>,
    ) => {
      state.subClientSalesLoading = true;
    },

    getSubClientSalesSuccess: (state, { payload }: PayloadAction<any>) => {
      state.subClientSalesLoading = false;
      state.subClientSales = payload.result;
    },
    getSubClientSalesFailure: (state) => {
      state.subClientSalesLoading = false;
    },
    inviteClient: (state, payload: PayloadAction<InviteSubClientRequest>) => {
      state.subClientSalesLoading = false;
    },
    getSyncClient: (state, _action: PayloadAction<any>) => {
      state.subClientLoading = true;
    },
    getSyncClientSuccess: (state, { payload }: PayloadAction<ISubClient>) => {
      const prevData: ISubClient | any = state.subClient;
      const updatedData = {
        ...prevData,
        address: payload?.address,
        firstName: payload?.firstName,
        lastName: payload?.lastName,
        countryCode: payload?.countryCode,
        phoneNumber: payload?.phoneNumber,
        photo: payload?.photo,
        email: payload?.email,
        birthday: payload?.birthday,
        isPaymentEnabled: payload?.isPaymentEnabled,
      };
      state.subClientLoading = false;
      state.subClient = updatedData;
    },
    getSyncClientFailed: (state) => {
      state.subClientLoading = false;
    },
  },
});

export const {
  actions: {
    getSubClients,
    getSubClientsFailure,
    getSubClientsSuccess,
    getBlockedSubClients,
    getBlockedSubClientsSuccess,
    getBlockedSubClientsFailure,
    getSubClient,
    getSubClientFailure,
    getSubClientSuccess,
    createSubClient,
    createSubClientFailure,
    createSubClientSuccess,
    editSubClient,
    editSubClientFailure,
    editSubClientSuccess,
    disconnectSubClient,
    disconnectSubClientFailure,
    disconnectSubClientSuccess,
    deleteSubClient,
    deleteSubClientFailure,
    deleteSubClientSuccess,
    blockSubClient,
    blockSubClientSuccess,
    blockSubClientFailure,
    searchSubClients,
    searchSubClientsFailure,
    searchSubClientsSuccess,
    resetSearchResults,
    getSubClientsReview,
    getSubClientsReviewFailure,
    getSubClientsReviewSuccess,
    getConnectedClients,
    getConnectedClientsFailure,
    getConnectedClientsSuccess,
    getNotConnectedClients,
    getNotConnectedClientsFailure,
    getNotConnectedClientsSuccess,
    getSubClientAppointments,
    getSubClientAppointmentsReview,
    getSubClientAppointmentsFailure,
    getSubClientAppointmentsSuccess,
    getSubClientSales,
    getSubClientSalesSuccess,
    getSubClientSalesFailure,
    inviteClient,
    resetSubClients,
    resetSubClient,
    blockUser,
    blockUserSuccess,
    blockUserFailure,
    unblockUser,
    unblockUserSuccess,
    unblockUserFailure,
    getSubClientAppointmentsReviewSuccess,
    getSubClientAppointmentsReviewFailure,
    getSyncClient,
    getSyncClientSuccess,
    getSyncClientFailed,
    filterSubClients,
    filterSubClientsSuccess,
    filterSubClientsFailure,
    getSubClientsWithActiveRewards,
    getSubClientsWithActiveRewardsSuccess,
    getSubClientsWithActiveRewardsFailure,
    getSubClientsWithPendingPaymentRequests,
    getSubClientsWithPendingPaymentRequestsSuccess,
    getSubClientsWithPendingPaymentRequestsFailure,
  },
  reducer: subClientsReducer,
} = subClients;
