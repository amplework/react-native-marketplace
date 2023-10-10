import { Moment } from 'moment';

import { IAddress } from './address';

export interface ISubClient {
  id: number;
  clientId: number | null;
  email: string | null;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  countryCode: string;
  phoneNumber: string | null;
  alternatePhoneNumber: string | null;
  gender: string | null;
  address: IAddress | null;
  notes: string | null;
  birthday: string | null;
  notificationChannel: string | null;
  isNotificationsAllowed: boolean | null;
  isConnected: boolean;
  isBlocked: boolean;
  isActive: boolean;
  isDisconnect: boolean;
  paymentTotalSpend: number;
  lastAppointmentWithProvider: string;
  lastSaleWithProvider: string;
  isPaymentEnabled: boolean | null;
  rewards?: any;
}

export type GetSubClientsRequest = {
  query?: string;
  isConnected?: boolean;
  isActive?: boolean;
  isBlocked?: boolean;
};

export type GetBlockedSubClientsRequest = {
  query?: string;
};

export type DeleteSubClientPayload = {
  id: number;
  onSuccess?: () => void;
};

export type BlockSubClientPayload =
  | {
      id: number;
      onSuccess?: () => void;
    }
  | any;

export type GetSubClientRequest = {
  id: number;
};

export interface ISearchRequest {
  query: string;
  offset: number;
  limit: number;
  isConnected?: boolean;
}

export type ClientFilter =
  | ''
  | 'new-clients'
  | 'no-activity'
  | 'rewards'
  | 'using-app'
  | 'not-using-app';

export interface ISubClientsReview {
  clients: {
    totalCount?: number;
    newCount?: number;
    notConnectedCount?: number;
    connectedCount?: number;
    clientWithAppointmentCount?: number;
    clientWithSaleCount?: number;
    inactiveClients?: any;
    topClients?: any;
  };
}

export interface ISubClientsWithActiveRewards {
  totalCount: number;
  data: any;
}

export interface ISubClientsWithPendingRequests {
  totalCount: number;
  data: any;
}

export type ConnectSubClientRequest = {
  id: number;
  clientId?: number;
  shouldCopyData: boolean;
};

export type InviteSubClientRequest = {
  id: number | any;
  date?: Moment | string;
};

export type GetSubClientAppointmentsPayload = {
  id: any;
  offset: number;
  limit: number;
};
