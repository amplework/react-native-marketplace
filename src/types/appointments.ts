import { Pagination } from './api';
import { AdditionalProduct } from './products';
import { ISubClient } from './subClients';
import { GeneralUserData, IClientUser, IProviderUser } from './users';

export interface IAppointment {
  id: number;
  startDate: string;
  endDate: string;
  product: IProduct | null;
}

interface IProduct {
  id: number;
  name: string;
  description: string;
  type: string;
  price: number;
  isQuickSale: boolean;
  time: number;
  ownerId: number;
  createdAt: string;
}

export interface IAppointmentsRequest {
  id: number;
  offset: number;
}

export type Appointment = {
  id: number;
  startDate: string;
  endDate: string;
  status: AppointmentStatus;
  hasClientCheckedIn: boolean;
  remindClient: number;
  remindProvider: number;
  provider: IProviderUser;
  client?: IClientUser & { isConnected: boolean };
  clientSubprofile: ISubClient;
  product: IProduct;
  notes: string;
  entitiesSnapshot: any;
};

type AppointmentStatus = 'scheduled' | 'pending' | 'blocked';

export type AppointmentRequest = {
  startDate: string;
  endDate: string;
  remindProvider: number;
  remindClient: number;
  notes: string;
  shouldBlockoutTime: boolean;
  productId: number;
  isDoubleBookingAllowed: boolean;
  shouldUpdateProduct?: boolean;
  newClient?: GeneralUserData;
  clientSubprofileId?: number;
  additionalProducts?: AdditionalProduct[];
};

export type PendingAppointment = Appointment & {
  client: IClientUser;
};

export type AppointmentsReview = {
  appointments: {
    currentMonthCount: number;
    currentWeekCount: number;
  };
  products: IProduct[];
};

export type Slot = {
  startDate: string;
  endDate: string;
};

export type AppointmentsRequest = {
  limit?: number;
  offset?: number;
  order?: string;
  fromDate: string | null;
  toDate?: string | null;
  clientId?: number;
  productId?: number;
  isUpcoming?: boolean;
  status?: AppointmentStatus | AppointmentStatus[];
  utcOffset?: number;
  query?: string;
};

export type ScheduledAppointmentsRequest = {
  limit?: number;
  order?: string;
  fromDate: string | null;
  status?: AppointmentStatus | AppointmentStatus[];
};

export type SlotsRequest = {
  date: string;
  providerId: number;
  duration: number;
};

export type AppointmentsResponse = Pagination<Appointment[]>;

export type ScheduledAppointmentsResponse = Pagination<[]>;

export type PendingAppointmentResponse = Pagination<PendingAppointment[]>;

export type SlotsResponse = {
  isClosedDay: boolean;
  isWorkingDay: boolean;
  slots: Slot[];
};

export type DeleteAppointmentAction = {
  id: number;
  type?: string;
  shouldGoBack?: boolean;
};

export type ReadyForClientAction = {
  id: number;
  appointmentId?: number;
};

export type CalendarOverview = {
  pendingAppointmentsCount: number;
  busyScheduleThisWeek: number;
  busyScheduleToday: number;
  daysWithoutBooking: number;
};

export type PartialAppointment = {
  id: number;
  startDate: string;
  product: PartialProduct;
  provider: PartialProvider;
};

type PartialProduct = {
  name: string;
};

type PartialProvider = {
  address: PartialAddress;
};

type PartialAddress = {
  formattedAddress: string | null;
};
