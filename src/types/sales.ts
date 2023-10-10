import { Meta } from './api';
import { Payment } from './payments';
import { ICalendarSettings } from './settings';

export type SalesSuccess = {
  result: Sale[];
  totalSum: number;
  meta: Meta;
};

export type Product = {
  id: number;
  isQuickSale: boolean;
  isQuickSection: boolean;
  name: string;
  price: number;
  quantity: number;
  type: string;
};

export type Tax = {
  id: number;
  rate: number;
  shortName: string;
};

export type Owner = {
  alternatePhoneNumber?: string;
  birthday?: string;
  calendarSettings: ICalendarSettings;
  email: string;
  firstName: string;
  gender?: string | null;
  id: number;
  lastName?: string;
  notificationChannel?: string;
  phoneNumber?: string;
  photo?: string | null;
  role: string;
  userId: number;
};

export type Sale = {
  id: number;
  number: number;
  pdf?: string;
  date: string;
  client: null | ClientSubprofile;
  clientSubprofile: ClientSubprofile;
  entitiesSnapshot: {
    products: Product[];
    taxes: Tax[];
  };
  tipAmount: number;
  discountAmount: number;
  isPaymentReceived: boolean;
  owner?: Owner;
  payment?: Payment;
  paymentMethod?: IPaymentMethod;
  subTotal: number;
  total: number;
  emailRecipient?: string;
  code?: any;
};

export interface IPaymentMethod {
  id: number;
  shortName: string;
  description: string;
  isActive: boolean;
  isRefundRequest?: boolean | null;
}

export type ClientSubprofile = {
  id: number;
  providerId: number;
  clientId: number | null;
  email: string;
  isConnected: boolean;
  firstName: string;
  lastName: string | null;
  photoFileId: number | null;
  phoneNumber: string | null;
  alternatePhoneNumber: string | null;
  gender: string | null;
  addressId: number | null;
  notes: string | null;
  birthday: string | null;
  notificationChannel: string | null;
  isNotificationsAllowed: boolean;
  isActive: boolean;
  createdAt: string;
  deletedAt: string | null;
  photoFile: string | null;
  photo: string | null;
};

export type GetSalesRequest = {
  offset: number;
  limit: number;
  query?: string | null;
  fromDate?: string;
  toDate?: string;
  clientSubprofileId?: number | null;
  paymentMethodId?: number | null;
};

export type CreateSaleRequest = {
  id?: number;
  paymentMethodId: number;
  tipAmount: string;
  discountAmount: string;
  clientSubprofileId?: number;
  newClient?: {
    firstName: string;
    lastName?: string;
    phoneNumber?: string;
  };
  isPaymentReceived: boolean;
  entitiesSnapshot: {
    products: [
      {
        id: number;
        quantity: number;
        price: number;
        isQuickSection: boolean;
      },
    ];
    taxIds: string[];
  };
  emailRecipient: string;
};

export type SalesReview = {
  sales: {
    currentMonthCount: number;
    currentWeekCount: number;
    currentMonthTotal: number;
    currentWeekTotal: number;
    currentYearTotal: number;
  };
};
