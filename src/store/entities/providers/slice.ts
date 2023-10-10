import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LIMIT } from 'api';
import _ from 'lodash';
import { IPlace } from 'types/address';
import { PaginationRequest } from 'types/api';
import { Pagination } from 'types/api';
import { IAppointment, IAppointmentsRequest } from 'types/appointments';
import { Invoice } from 'types/invoices';
import { PaymentPreview } from 'types/payments';
import { Sale } from 'types/sales';
import {
  BlockProviderPayload,
  GetBlockedProvidersRequest,
  GetProvidersRequest,
  IProvider,
  IProviderPublicProfile,
  ISearchProvidersRequest,
} from 'types/users';
import { compareWith } from 'utils/array';

import { IProviders } from './types';
import { Estimate } from 'types/estimates';

const initialState: IProviders = {
  providers: [],
  blockedProviders: [],
  loading: false,
  refreshing: false,
  offset: 0,
  total: LIMIT,
  shortlistLoading: false,
  provider: null,
  providerLoading: true,
  providerError: null,
  appointments: {
    list: [],
    loading: false,
    refreshing: false,
    offset: 0,
    total: LIMIT,
  },
  invoices: {
    list: [],
    loading: false,
    refreshing: false,
    offset: 0,
    total: LIMIT,
  },
  estimates: {
    list: [],
    loading: false,
    refreshing: false,
    offset: 0,
    total: LIMIT,
  },
  sales: {
    list: [],
    loading: false,
    refreshing: false,
    offset: 0,
    total: LIMIT,
  },
  payments: {
    list: [],
    loading: false,
    refreshing: false,
    offset: 0,
    total: LIMIT,
    refundRequestOnPaymentLoading: false,
  },
  search: {
    list: [],
    loading: false,
    loadingMore: false,
    offset: 0,
    total: LIMIT,
    place: null,
    previousPlaces: [],
    isModalOpened: false,
  },
  salesSpecialsByProviders: {
    list: [],
    loading: false,
  },
  providerPlanId: null,
  locationFilter: true,
};

const providers = createSlice({
  name: 'providers',
  initialState,
  reducers: {
    getProviders: (state, _action: PayloadAction<GetProvidersRequest>) => {
      state.loading = true;
    },
    getProvidersSuccess: (
      state,
      action: PayloadAction<Pagination<IProvider[]>>,
    ) => {
      const { meta, result } = action.payload;

      state.loading = false;
      state.providers.push(...result);

      state.offset = meta.offset;
      state.total = meta.totalCount;
    },
    getProvidersFailure: (state) => {
      state.loading = false;
    },
    getBlockedProviders: (state, _action: PayloadAction<GetBlockedProvidersRequest>) => {
      state.loading = true;
    },
    getBlockedProvidersSuccess: (
      state,
      action: PayloadAction<Pagination<IProvider[]>>,
    ) => {
      const { meta, result } = action.payload;

      state.loading = false;
      state.blockedProviders = result;

      state.offset = meta.offset;
      state.total = meta.totalCount;
    },
    getBlockedProvidersFailure: (state) => {
      state.loading = false;
    },
    refreshProviders: (state, _action: PayloadAction<GetProvidersRequest>) => {
      state.refreshing = true;
    },
    refreshProvidersSuccess: (
      state,
      action: PayloadAction<Pagination<IProvider[]>>,
    ) => {
      const { meta, result } = action.payload;

      state.refreshing = false;
      state.providers = result;

      state.offset = meta.offset;
      state.total = meta.totalCount;
    },
    refreshProvidersFailure: (state) => {
      state.refreshing = false;
    },
    getProvider: (state, _action: PayloadAction<number>) => {
      state.providerLoading = true;
      state.providerError = null;
      state.provider = null;
    },
    getProviderSuccess: (
      state,
      action: PayloadAction<IProviderPublicProfile>,
    ) => {
      state.providerLoading = false;
      state.provider = action.payload;
    },
    getProviderFailure: (state, action: PayloadAction<Error>) => {
      state.providerLoading = false;
      state.providerError = action.payload;
    },
    blockProvider: (state, _action: PayloadAction<BlockProviderPayload>) => {
      state.providerLoading = true;
    },
    blockProviderSuccess: (state) => {
      state.providerLoading = false;
    },
    blockProviderFailure: (state) => {
      state.providerLoading = false;
    },
    unBlockProvider: (state, _action: PayloadAction<BlockProviderPayload>) => {
      state.providerLoading = true;
    },
    unBlockProviderSuccess: (state) => {
      state.providerLoading = false;
    },
    unBlockProviderFailure: (state) => {
      state.providerLoading = false;
    },
    getScheduledAppointments: (state, _action: PayloadAction<IAppointmentsRequest>) => {
      state.appointments.loading = true;
    },
    getScheduledAppointmentsSuccess: (
      state,
      action: PayloadAction<Pagination<IAppointment[]>>,
    ) => {},
    getScheduledAppointmentsFailure: (state) => {
      state.appointments.loading = false;
    },
    getAppointments: (state, _action: PayloadAction<IAppointmentsRequest>) => {
      state.appointments.loading = true;
    },
    getAppointmentsSuccess: (
      state,
      action: PayloadAction<Pagination<IAppointment[]>>,
    ) => {
      const { meta, result } = action.payload;

      state.appointments.loading = false;
      state.appointments.list.push(...result);

      state.appointments.offset = meta.offset;
      state.appointments.total = meta.totalCount;
    },
    getAppointmentsFailure: (state) => {
      state.appointments.loading = false;
    },
    refreshAppointments: (state, _action: PayloadAction<number>) => {
      state.appointments.refreshing = true;
    },
    refreshAppointmentsSuccess: (
      state,
      action: PayloadAction<Pagination<IAppointment[]>>,
    ) => {
      const { meta, result } = action.payload;

      state.appointments.refreshing = false;
      state.appointments.list = result;

      state.appointments.offset = meta.offset;
      state.appointments.total = meta.totalCount;
    },
    refreshAppointmentsFailure: (state) => {
      state.appointments.refreshing = false;
    },
    getInvoices: (state, _action: PayloadAction<PaginationRequest>) => {
      state.invoices.loading = true;
    },
    getInvoicesSuccess: (
      state,
      { payload }: PayloadAction<Pagination<Invoice[]>>,
    ) => {
      state.invoices.loading = false;
      state.invoices.list.push(...payload.result);

      state.invoices.offset = payload.meta.offset;
      state.invoices.total = payload.meta.totalCount;
    },
    getInvoicesFailure: (state) => {
      state.invoices.loading = false;
    },
    getEstimates: (state, _action: PayloadAction<PaginationRequest>) => {
      state.estimates.loading = true;
    },
    getEstimatesSuccess: (
      state,
      { payload }: PayloadAction<Pagination<Estimate[]>>,
    ) => {
      state.estimates.loading = false;
      state.estimates.list.push(...payload.result);

      state.estimates.offset = payload.meta.offset;
      state.estimates.total = payload.meta.totalCount;
    },
    getEstimatesFailure: (state) => {
      state.estimates.loading = false;
    },
    refreshInvoices: (state, _action: PayloadAction<number>) => {
      state.invoices.refreshing = true;
    },
    refreshInvoicesSuccess: (
      state,
      { payload }: PayloadAction<Pagination<Invoice[]>>,
    ) => {
      state.invoices.refreshing = false;
      state.invoices.list = payload.result;

      state.invoices.offset = payload.meta.offset;
      state.invoices.total = payload.meta.totalCount;
    },
    refreshInvoicesFailure: (state) => {
      state.invoices.refreshing = false;
    },
    refreshEstimates: (state, _action: PayloadAction<number>) => {
      state.estimates.refreshing = true;
    },
    refreshEstimatesSuccess: (
      state,
      { payload }: PayloadAction<Pagination<Estimate[]>>,
    ) => {
      state.estimates.refreshing = false;
      state.estimates.list = payload.result;

      state.estimates.offset = payload.meta.offset;
      state.estimates.total = payload.meta.totalCount;
    },
    refreshEstimatesFailure: (state) => {
      state.estimates.refreshing = false;
    },
    getSales: (state, _action: PayloadAction<PaginationRequest>) => {
      state.sales.loading = true;
    },
    getSalesSuccess: (
      state,
      { payload }: PayloadAction<Pagination<Sale[]>>,
    ) => {
      state.sales.loading = false;
      state.sales.list.push(...payload.result);

      state.sales.offset = payload.meta.offset;
      state.sales.total = payload.meta.totalCount;
    },
    getSalesFailure: (state) => {
      state.sales.loading = false;
    },
    refreshSales: (state, _action: PayloadAction<number>) => {
      state.sales.refreshing = true;
    },
    refreshSalesSuccess: (
      state,
      { payload }: PayloadAction<Pagination<Sale[]>>,
    ) => {
      state.sales.refreshing = false;
      state.sales.list = payload.result;

      state.sales.offset = payload.meta.offset;
      state.sales.total = payload.meta.totalCount;
    },
    refreshSalesFailure: (state) => {
      state.sales.refreshing = false;
    },
    getPayments: (state, _action: PayloadAction<PaginationRequest>) => {
      state.payments.loading = true;
    },
    getPaymentsSuccess: (
      state,
      { payload }: PayloadAction<Pagination<PaymentPreview[]>>,
    ) => {
      state.payments.loading = false;
      state.payments.list.push(...payload.result);

      state.payments.offset = payload.meta.offset;
      state.payments.total = payload.meta.totalCount;
    },
    getPaymentsFailure: (state) => {
      state.payments.loading = false;
    },
    refreshPayments: (state, _action: PayloadAction<number>) => {
      state.payments.refreshing = true;
    },
    refreshPaymentsSuccess: (
      state,
      { payload }: PayloadAction<Pagination<PaymentPreview[]>>,
    ) => {
      state.payments.refreshing = false;
      state.payments.list = payload.result;

      state.payments.offset = payload.meta.offset;
      state.payments.total = payload.meta.totalCount;
    },
    refreshPaymentsFailure: (state) => {
      state.payments.refreshing = false;
    },
    refundRequestOnPayment: (state, _action: PayloadAction<any>) => {
      state.payments.refundRequestOnPaymentLoading = true;
    },
    refundRequestOnPaymentSuccess: (state, action: PayloadAction<any>) => {
      state.payments.refundRequestOnPaymentLoading = false;
    },
    refundRequestOnPaymentFailure: (state) => {
      state.payments.refundRequestOnPaymentLoading = false;
    },
    selectPlace: (state, action: PayloadAction<IPlace>) => {
      state.search.place = action.payload;

      const index = state.search.previousPlaces.findIndex(
        (place) => place.id === action.payload.id,
      );

      if (index !== -1) {
        state.search.previousPlaces.splice(index, 1);
      }

      state.search.previousPlaces.unshift(action.payload);
    },
    getPreviousPlaces: () => {},
    getPreviousPlacesSuccess: (state, action: PayloadAction<IPlace[]>) => {
      state.search.previousPlaces = action.payload;
    },
    deletePreviousPlaces: (state) => {
      state.search.previousPlaces = [];
    },
    searchProviders: (
      state,
      _action: PayloadAction<ISearchProvidersRequest>,
    ) => {
      state.search.loading = true;
    },
    searchProvidersSuccess: (
      state,
      action: PayloadAction<Pagination<IProvider[]>>,
    ) => {
      const { meta, result } = action.payload;

      state.search.loading = false;
      state.search.list = result;

      state.search.offset = meta.offset;
      state.search.total = meta.totalCount;
    },
    searchProvidersFailure: (state) => {
      state.search.loading = false;
    },
    loadMoreSearchResults: (
      state,
      _action: PayloadAction<ISearchProvidersRequest>,
    ) => {
      state.search.loadingMore = true;
    },
    loadMoreSearchResultsSuccess: (
      state,
      action: PayloadAction<Pagination<IProvider[]>>,
    ) => {
      const { meta, result } = action.payload;

      state.search.loadingMore = false;
      state.search.list.push(...result);

      state.search.offset = meta.offset;
      state.search.total = meta.totalCount;
    },
    loadMoreSearchResultsFailure: (state) => {
      state.search.loadingMore = false;
    },
    shortlistProvider: (state, _action: PayloadAction<IProvider>) => {
      state.shortlistLoading = true;
    },
    shortlistProviderSuccess: (state, action: PayloadAction<IProvider>) => {
      state.shortlistLoading = false;

      if (state.provider) {
        state.provider.isShortlisted = true;
      }

      const index = state.search.list.findIndex(
        ({ id }) => id === action.payload.id,
      );

      if (index !== -1) {
        state.search.list[index].isShortlisted = true;
      }

      state.providers.push({ ...action.payload, isShortlisted: true });
      state.providers.sort(compareWith((p) => `${p.firstName} ${p.lastName}`));
      state.providers = state.providers.slice(0, state.offset + LIMIT);
    },
    shortlistProviderFailure: (state) => {
      state.shortlistLoading = false;
    },
    unshortlistProvider: (state, _action: PayloadAction<IProvider>) => {
      state.shortlistLoading = true;
    },
    unshortlistProviderSuccess: (state, action: PayloadAction<IProvider>) => {
      state.shortlistLoading = false;

      if (state.provider) {
        state.provider.isShortlisted = false;
      }

      const searchIndex = state.search.list.findIndex(
        ({ id }) => id === action.payload.id,
      );

      if (searchIndex !== -1) {
        state.search.list[searchIndex].isShortlisted = false;
      }

      const index = state.providers.findIndex(
        ({ id }) => id === action.payload.id,
      );

      state.total -= 1;

      if (index !== -1) {
        state.providers.splice(index, 1);
        state.offset -= 1;
      }
    },
    unshortlistProviderFailure: (state) => {
      state.shortlistLoading = false;
    },
    openFiltersModal: (state) => {
      state.search.isModalOpened = true;
    },
    closeFiltersModal: (state) => {
      state.search.isModalOpened = false;
    },
    searchProviderByLocation: (state, _action: PayloadAction<boolean>) => {
      state.locationFilter = _action.payload
    },
    getSalesSpecialsByProviders: (state, _action: PayloadAction<any>) => {
      state.salesSpecialsByProviders.loading = true;
    },
    getSalesSpecialsByProvidersSuccess: (state, action: PayloadAction<any>) => {
      const { meta, result } = action.payload;

      state.salesSpecialsByProviders.loading = false;
      state.salesSpecialsByProviders.list = result
    },
    getSalesSpecialsByProvidersFailure: (state) => {
      state.salesSpecialsByProviders.loading = false;
    },
    getProviderPlanId: (state, _action: PayloadAction<any>) => {
      state.loading = true;
    },
    getProviderPlanIdSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.providerPlanId = action.payload;
    },
    getProviderPlanIdFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  actions: {
    getProviders,
    getProvidersFailure,
    getProvidersSuccess,
    getBlockedProviders,
    getBlockedProvidersSuccess,
    getBlockedProvidersFailure,
    refreshProviders,
    refreshProvidersFailure,
    refreshProvidersSuccess,
    getProvider,
    getProviderFailure,
    getProviderSuccess,
    getScheduledAppointments,
    getScheduledAppointmentsSuccess,
    getScheduledAppointmentsFailure,
    getAppointments,
    getAppointmentsFailure,
    getAppointmentsSuccess,
    refreshAppointments,
    refreshAppointmentsFailure,
    refreshAppointmentsSuccess,
    selectPlace,
    getPreviousPlaces,
    getPreviousPlacesSuccess,
    deletePreviousPlaces,
    searchProviders,
    searchProvidersFailure,
    searchProvidersSuccess,
    loadMoreSearchResults,
    loadMoreSearchResultsFailure,
    loadMoreSearchResultsSuccess,
    shortlistProvider,
    shortlistProviderSuccess,
    unshortlistProvider,
    unshortlistProviderSuccess,
    shortlistProviderFailure,
    unshortlistProviderFailure,
    closeFiltersModal,
    openFiltersModal,
    searchProviderByLocation,
    getInvoices,
    getInvoicesFailure,
    getInvoicesSuccess,
    getEstimates,
    getEstimatesSuccess,
    getEstimatesFailure,
    getSales,
    getSalesFailure,
    getSalesSuccess,
    refreshInvoices,
    refreshInvoicesFailure,
    refreshInvoicesSuccess,
    refreshEstimates,
    refreshEstimatesSuccess,
    refreshEstimatesFailure,
    refreshSales,
    refreshSalesFailure,
    refreshSalesSuccess,
    getPayments,
    getPaymentsFailure,
    getPaymentsSuccess,
    refreshPayments,
    refreshPaymentsFailure,
    refreshPaymentsSuccess,
    refundRequestOnPayment,
    refundRequestOnPaymentSuccess,
    refundRequestOnPaymentFailure,
    blockProvider,
    blockProviderSuccess,
    blockProviderFailure,
    unBlockProvider,
    unBlockProviderSuccess,
    unBlockProviderFailure,
    getSalesSpecialsByProviders,
    getSalesSpecialsByProvidersSuccess,
    getSalesSpecialsByProvidersFailure,
    getProviderPlanId,
    getProviderPlanIdSuccess,
    getProviderPlanIdFailure,
  },
  reducer: providersReducer,
} = providers;
