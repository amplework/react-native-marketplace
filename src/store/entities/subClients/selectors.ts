import { SubClientsState } from './types';

const all = (state: SubClientsState) => state.subClients;

const subClients = (state: SubClientsState) => all(state).subClients;

const filteredClients = (state: SubClientsState) => all(state).filteredClients;

const blockedSubClients = (state: SubClientsState) =>
  all(state).blockedSubclients;

const loading = (state: SubClientsState) => all(state).loading;

const filterLoading = (state: SubClientsState) => all(state).filterLoading;

const blockLoading = (state: SubClientsState) => all(state).blockLoading;

const notConnectedClients = (state: SubClientsState) =>
  all(state).notConnectedClients;

const notConnectedClientsLoading = (state: SubClientsState) =>
  all(state).notConnectedClientsLoading;

const connectedClients = (state: SubClientsState) =>
  all(state).connectedClients;

const connectedClientsLoading = (state: SubClientsState) =>
  all(state).connectedClientsLoading;

const subClient = (state: SubClientsState) => all(state).subClient;

const subClientLoading = (state: SubClientsState) =>
  all(state).subClientLoading;

const error = (state: SubClientsState) => all(state).error;

const addEditLoading = (state: SubClientsState) => all(state).addEditLoading;

const deleteLoading = (state: SubClientsState) => all(state).deleteLoading;

const searchResults = (state: SubClientsState) => all(state).searchResults;

const searchLoading = (state: SubClientsState) => all(state).searchLoading;

const review = (state: SubClientsState) => all(state).review;

const reviewLoading = (state: SubClientsState) => all(state).reviewLoading;

const appointments = (state: SubClientsState) =>
  all(state).subClientAppointments;

const appointmentsReview = (state: SubClientsState) =>
  all(state).subClientAppointmentReview;

const sales = (state: SubClientsState) => all(state).subClientSales;

const subClientSalesLoading = (state: SubClientsState) =>
  all(state).subClientSalesLoading;

const appointmentsLoading = (state: SubClientsState) =>
  all(state).subClientAppointmentsLoading;

const appointmentsReviewLoading = (state: SubClientsState) =>
  all(state).subClientAppointmentReviewLoading;

const clientWithActiveRewardsCount = (state: SubClientsState) =>
  all(state).clientWithActiveRewards.totalCount;

const clientWithActiveRewards = (state: SubClientsState) =>
  all(state).clientWithActiveRewards.data;

const clientWithPendingPaymentRequestsCount = (state: SubClientsState) =>
  all(state).clientWithPendingPaymentRequests.totalCount;

const clientWithPendingPaymentRequests = (state: SubClientsState) =>
  all(state).clientWithPendingPaymentRequests.data;

export const subClientsSelectors = {
  subClients,
  loading,
  blockLoading,
  subClient,
  blockedSubClients,
  subClientLoading,
  error,
  addEditLoading,
  deleteLoading,
  searchResults,
  searchLoading,
  review,
  reviewLoading,
  notConnectedClients,
  notConnectedClientsLoading,
  connectedClients,
  connectedClientsLoading,
  appointments,
  sales,
  filteredClients,
  filterLoading,
  subClientSalesLoading,
  appointmentsReview,
  appointmentsLoading,
  clientWithActiveRewards,
  appointmentsReviewLoading,
  clientWithActiveRewardsCount,
  clientWithPendingPaymentRequestsCount,
  clientWithPendingPaymentRequests,
};
