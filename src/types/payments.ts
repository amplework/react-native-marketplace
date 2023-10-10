import { Currency, PaymentMethodTypes } from 'utils/onlinePaymentOptions';
import { PayloadHandlers } from 'utils/store';

import { Meta } from './api';
import { Estimate } from './estimates';
import { Invoice } from './invoices';
import { Sale } from './sales';

export type PaymentsSuccess = {
  result: Payment[];
  totalSum: number;
  meta: Meta;
};

export type Payment = {
  id: number;
  number: number;
  pdf?: string;
  client: null | ClientSubprofile;
  clientSubprofile: ClientSubprofile;
  date: string;
  emailRecipient: string | null;
  invoice: Invoice | null;
  invoiceId?: number | null;
  estimate?: Estimate | null;
  estimateId?: number | null;
  notes: string | null;
  reason: string | null;
  paymentMethod: IPaymentMethod;
  saleId: number | null;
  total: number;
  sale: Sale | null;
  isRefundRequest?: boolean | null;
  chargeId?: string | null;
};

export interface IPaymentMethod {
  id: number;
  shortName: string;
  description: string;
  isActive: boolean;
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
};

export type GetPaymentsRequest = {
  offset: number;
  limit: number;
  query?: string | null;
  fromDate: string;
  toDate: string;
  clientSubprofileId?: number | null;
  paymentMethodId?: number | null;
  receiptId?: number | null;
};

export type CreatePaymentAction = PayloadHandlers & {
  payment: CreatePaymentsRequest;
};

export type CreatePaymentsRequest = {
  total: number;
  date: string;
  clientSubprofileId?: number;
  newClient?: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
  invoiceId?: number;
  estimateId?: number;
  paymentMethodId: number;
  reason?: string;
  notes?: string;
  emailRecipient?: string;
};

export type DeletePaymentAction = PayloadHandlers & {
  id: number;
};

export type PaymentsReview = {
  payments: {
    currentMonthCount: number;
    currentWeekCount: number;
    currentMonthTotal: number;
    currentWeekTotal: number;
    currentYearTotal: number;
  };
};

export type PaymentPreview = {
  id: number;
  number: number;
  total: number;
  date: string;
  invoiceId: number | null;
  saleId: number | null;
  sale: Sale | null;
  invoice: Invoice | null;
  paymentMethod: IPaymentMethod;
  reason: string | null;
  notes: string | null;
  pdf: string;
  isRefundRequest?: any;
  chargeId?: any;
};

export type PaymentDynamicLinkData = {
  amount: string | number;
  providerId: string | number;
  clientId: string | number;
  invoiceId?: string | number;
  estimateId?: string | number;
  saleId?: string | number;
  currency: Currency;
  paymentMethodTypes: PaymentMethodTypes[];
};
