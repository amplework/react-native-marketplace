import { IProvidersState } from './types';

const all = (state: IProvidersState) => state.providers;

const providers = (state: IProvidersState) => all(state).providers;

const blockedProviders = (state: IProvidersState) => all(state).blockedProviders;

const loading = (state: IProvidersState) => all(state).loading;

const refreshing = (state: IProvidersState) => all(state).refreshing;

const offset = (state: IProvidersState) => all(state).offset;

const total = (state: IProvidersState) => all(state).total;

const shortlistLoading = (state: IProvidersState) =>
  all(state).shortlistLoading;

const provider = (state: IProvidersState) => all(state).provider;

const providerLoading = (state: IProvidersState) => all(state).providerLoading;

const providerError = (state: IProvidersState) => all(state).providerError;

const appointments = (state: IProvidersState) => all(state).appointments.list;

const appointmentsLoading = (state: IProvidersState) =>
  all(state).appointments.loading;

const appointmentsRefreshing = (state: IProvidersState) =>
  all(state).appointments.refreshing;

const appointmentsOffset = (state: IProvidersState) =>
  all(state).appointments.offset;

const appointmentsTotal = (state: IProvidersState) =>
  all(state).appointments.total;

const invoices = (state: IProvidersState) => all(state).invoices.list;

const invoicesLoading = (state: IProvidersState) => all(state).invoices.loading;

const invoicesRefreshing = (state: IProvidersState) =>
  all(state).invoices.refreshing;

const invoicesOffset = (state: IProvidersState) => all(state).invoices.offset;

const invoicesTotal = (state: IProvidersState) => all(state).invoices.total;

const estimates = (state: IProvidersState) => all(state).estimates.list;

const estimatesLoading = (state: IProvidersState) => all(state).estimates.loading;

const estimatesRefreshing = (state: IProvidersState) =>
  all(state).estimates.refreshing;

const estimatesOffset = (state: IProvidersState) => all(state).estimates.offset;

const estimatesTotal = (state: IProvidersState) => all(state).estimates.total;

const sales = (state: IProvidersState) => all(state).sales.list;

const salesLoading = (state: IProvidersState) => all(state).sales.loading;

const salesRefreshing = (state: IProvidersState) => all(state).sales.refreshing;

const salesOffset = (state: IProvidersState) => all(state).sales.offset;

const salesTotal = (state: IProvidersState) => all(state).sales.total;

const payments = (state: IProvidersState) => all(state).payments.list;

const paymentsLoading = (state: IProvidersState) => all(state).payments.loading;

const paymentsRefreshing = (state: IProvidersState) =>
  all(state).payments.refreshing;

const paymentsOffset = (state: IProvidersState) => all(state).payments.offset;

const paymentsTotal = (state: IProvidersState) => all(state).payments.total;

const refundRequestOnPaymentLoading = (state: IProvidersState) => all(state).payments.refundRequestOnPaymentLoading;

const place = (state: IProvidersState) => all(state).search.place;

const previousPlaces = (state: IProvidersState) =>
  all(state).search.previousPlaces;

const searchResults = (state: IProvidersState) => all(state).search.list;

const searchLoading = (state: IProvidersState) => all(state).search.loading;

const searchLoadingMore = (state: IProvidersState) =>
  all(state).search.loadingMore;

const searchOffset = (state: IProvidersState) => all(state).search.offset;

const searchTotal = (state: IProvidersState) => all(state).search.total;

const isModalOpened = (state: IProvidersState) =>
  all(state).search.isModalOpened;

const searchedSalesSpecialsResults = (state: IProvidersState) => all(state).salesSpecialsByProviders.list;

const searchedSalesSpecialsLoading = (state: IProvidersState) => all(state).salesSpecialsByProviders.loading;

const providerPlanId = (state: IProvidersState) => all(state).providerPlanId;

const locationFilter = (state: IProvidersState) => all(state).locationFilter;

export const providersSelectors = {
  providers,
  loading,
  refreshing,
  offset,
  total,
  shortlistLoading,
  provider,
  providerLoading,
  providerError,
  appointments,
  appointmentsLoading,
  appointmentsRefreshing,
  appointmentsOffset,
  appointmentsTotal,
  invoices,
  invoicesLoading,
  invoicesOffset,
  invoicesTotal,
  invoicesRefreshing,
  estimates,
  estimatesLoading,
  estimatesRefreshing,
  estimatesTotal,
  estimatesOffset,
  sales,
  salesLoading,
  salesOffset,
  salesTotal,
  salesRefreshing,
  payments,
  paymentsLoading,
  paymentsRefreshing,
  paymentsOffset,
  paymentsTotal,
  refundRequestOnPaymentLoading,
  place,
  previousPlaces,
  searchResults,
  searchLoading,
  searchLoadingMore,
  searchOffset,
  searchTotal,
  isModalOpened,
  blockedProviders,
  searchedSalesSpecialsResults,
  searchedSalesSpecialsLoading,
  providerPlanId,
  locationFilter
};
