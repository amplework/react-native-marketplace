import { ImageOrVideo } from 'react-native-image-crop-picker';
import { PayloadHandlers } from 'utils/store';

import { Pagination } from './api';
import { Payment } from './payments';
import { IProduct, ProductSnapshot, ProductType } from './products';
import { IPaymentMethod } from './settings';
import { ISubClient } from './subClients';
import { ITax, TaxSnapshot } from './taxes';

export type InvoiceTab = 'open' | 'overdue' | 'month';

export type CloudImage = {
  id: number;
  url: string;
  mimetype: string;
};

export const isCloudImage = (image: InvoiceImage): image is CloudImage =>
  'id' in image;

export const isImageOrVideo = (image: InvoiceImage): image is ImageOrVideo =>
  'path' in image;

export type InvoiceImage = CloudImage | ImageOrVideo;

export type Invoice = {
  id: number;
  number: number;
  date: string;
  dueDate: string;
  subTotal: number;
  total: number;
  balance: number;
  emailRecipient: string | null;
  comments: string | null;
  notes: string | null;
  clientSubprofile: ClientSubprofile;
  status: InvoiceStatus;
  products: ProductSnapshot[];
  taxes: TaxSnapshot[];
  isPaymentSuccess?: boolean | null;
  payments?: any;
};

export type DetailedInvoice = {
  id: number;
  number: number;
  date: any;
  dueDate: any;
  expectedPaymentMethod: IPaymentMethod | null;
  subTotal: number;
  total: number;
  balance: number;
  emailRecipient: string | null;
  comments: string | null;
  notes: string | null;
  clientSubprofile: ClientSubprofile;
  payments: Payment[];
  images: CloudImage[];
  status: InvoiceStatus;
  products: ProductSnapshot[];
  taxes: TaxSnapshot[];
  pdf: string;
  pdfFile: PDF;
  isPaymentSuccess?: boolean | null;
  code?: any;
};

export type ClientSubprofile = {
  id: number;
  email: string | null;
  firstName: string;
  lastName: string | null;
  phoneNumber: string | null;
  alternatePhoneNumber: string | null;
  gender: string | null;
  notes: string | null;
  birthday: string | null;
  notificationChannel: string | null;
  isNotificationsAllowed: string | null;
  isActive: boolean;
  photo: string | null;
  isConnected: boolean;
};

type PDF = {
  id: number;
  url: string;
  mimetype: string;
};

export type InvoiceValues = {
  isNewClient: boolean;
  subClient: ISubClient | null;
  firstName: string;
  lastName: string;
  countryCode: any;
  phoneNumber: string;
  date: any;
  dueDate: any;
  expectedPaymentMethodId: number | null;
  products: ProductSnapshot[];
  selectedTaxes: ITax[];
  comments: string;
  notes: string;
  imageFiles: InvoiceImage[];
  isEmailReceipt: boolean;
  email: string;
  payment: InvoicePayment | null;
};

export type InvoiceProductValues = {
  type: ProductType;
  selectedProduct?: IProduct | null;
  quantity: string;
  price: string;
  description: string;
};

export type InvoicePayment = {
  paymentMethodId: number;
  isFullPayment: boolean;
  total: number;
};

export type InvoicePaymentValues = {
  paymentMethodId: number | string;
  isFullPayment: boolean;
  total: string;
};

export type GetInvoicesRequest = {
  offset?: number;
  query?: string;
  fromDate?: string;
  toDate?: string;
  status?: InvoiceStatus | InvoiceStatus[] | null;
  clientSubprofileId?: number;
  paymentMethodId?: number | null;
  orderBy?: InvoiceOrder;
};

export type InvoiceStatus = 'open' | 'paid' | 'overdue';

export type InvoiceOrder = 'date' | 'dueDate';

export type GetInvoicesResponse = Pagination<Invoice[]> & {
  totalSum: number;
  balanceSum: number;
};

export type CreateInvoiceAction = PayloadHandlers & {
  invoice: InvoiceValues;
};

export type EditInvoiceAction = PayloadHandlers & {
  id: number;
  invoice: InvoiceValues;
};

export type DeleteInvoiceAction = PayloadHandlers & {
  id: number;
};

export type InvoicesReview = {
  invoices: {
    currentYearTotal: number;
    currentMonthTotal: number;
    currentMonthCount: number;
    openCount: number;
    overdueCount: number;
    openBalanceTotal: number;
    overdueBalanceTotal: number;
  };
};

export type SearchInvoicesValues = {
  query: string;
  fromDate: Date;
  toDate: Date;
  paymentMethodId: number | null;
  status: InvoiceStatus | null;
  subClient: ISubClient | null;
};

export type InvoicePreview = {
  pdf: string;
};
