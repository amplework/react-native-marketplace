import { Pagination } from 'types/api';
import {
  ISubClient,
  ISubClientsReview,
  ISubClientsWithActiveRewards,
} from 'types/subClients';

export type SubClientsState = {
  subClients: SubClients;
};

export type SubClients = {
  subClients: ISubClient[];
  blockedSubclients: ISubClient[];
  connectedClients: ISubClient[];
  connectedClientsLoading: boolean;
  notConnectedClients: ISubClient[];
  notConnectedClientsLoading: boolean;
  subClient?: ISubClient;
  subClientLoading: boolean;
  subClientAppointments: Pagination<any> | null;
  subClientAppointmentReview: Pagination<any> | null;
  subClientAppointmentReviewLoading: boolean;
  subClientAppointmentsLoading: boolean;
  subClientSales: Pagination<any> | null;
  subClientSalesLoading: boolean;
  loading: boolean;
  error: Error | null;
  addEditLoading: boolean;
  deleteLoading: boolean;
  blockLoading: boolean;
  searchResults: ISubClient[];
  filteredClients: ISubClient[];
  searchLoading: boolean;
  filterLoading: boolean;
  review: ISubClientsReview;
  reviewLoading: boolean;
  clientWithActiveRewards: ISubClientsWithActiveRewards;
  clientWithPendingPaymentRequests: ISubClientsWithActiveRewards;
};
