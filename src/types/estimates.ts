import { ImageOrVideo } from 'react-native-image-crop-picker';
import { PayloadHandlers } from 'utils/store';

import { Pagination } from './api';
import { Payment } from './payments';
import { IProduct, ProductSnapshot, ProductType } from './products';
import { IPaymentMethod } from './settings';
import { ISubClient } from './subClients';
import { ITax, TaxSnapshot } from './taxes';

export type EstimateTab = 'open' | 'expired' | 'month';

export type ApproveStatus = 'approved' | 'rejected' | null;

export type CloudImage = {
  id: number;
  url: string;
  mimetype: string;
};

export const isCloudImage = (image: EstimateImage): image is CloudImage =>
  'id' in image;

export const isImageOrVideo = (image: EstimateImage): image is ImageOrVideo =>
  'path' in image;

export type EstimateImage = CloudImage | ImageOrVideo;

export type Estimate = {
  id: number;
  number: number;
  date: string;
  expDate: string;
  subTotal: number;
  total: number;
  balance: number;
  emailRecipient: string | null;
  comments: string | null;
  notes: string | null;
  clientSubprofile: ClientSubprofile;
  status: EstimateStatus;
  approveStatus: ApproveStatus;
  products: ProductSnapshot[];
  taxes: TaxSnapshot[];
  isPaymentSuccess?: boolean | null;
  payments?: any;
};

export type DetailedEstimate = {
  id: number;
  number: number;
  date: any;
  expDate: any;
  expectedPaymentMethod: IPaymentMethod | null;
  subTotal: number;
  total: number;
  balance: number;
  emailRecipient: string | null;
  comments: string | null;
  notes: string | null;
  clientSubprofile: ClientSubprofile;
  approveStatus?: ApproveStatus;
  payments: Payment[];
  images: CloudImage[];
  status: EstimateStatus;
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

export type EstimateValues = {
  isNewClient: boolean;
  subClient: ISubClient | null;
  firstName: string;
  lastName: string;
  countryCode: any;
  phoneNumber: string;
  date: any;
  expDate: any;
  expectedPaymentMethodId: number | null;
  products: ProductSnapshot[];
  selectedTaxes: ITax[];
  comments: string;
  notes: string;
  imageFiles: EstimateImage[];
  isEmailReceipt: boolean;
  email: string;
  payment: EstimatePayment | null;
};

export type UpdateEstimateStatus = {
  id: number | any;
  approveStatus: ApproveStatus;
}

export type EstimateProductValues = {
  type: ProductType;
  selectedProduct?: IProduct | null;
  quantity: string;
  price: string;
  description: string;
};

export type EstimatePayment = {
  paymentMethodId: number;
  isFullPayment: boolean;
  total: number;
};

export type EstimatePaymentValues = {
  paymentMethodId: number | string;
  isFullPayment: boolean;
  total: string;
};

export type GetEstimatesRequest = {
  offset?: number;
  query?: string;
  fromDate?: string;
  toDate?: string;
  status?: EstimateStatus | EstimateStatus[] | null;
  clientSubprofileId?: number;
  paymentMethodId?: number | null;
  orderBy?: EstimateOrder;
};

export type EstimateStatus = 'open' | 'approved' | 'expired' | 'rejected' | 'paid';

export type EstimateOrder = 'date' | 'expDate';

export type GetEstimatesResponse = Pagination<Estimate[]> & {
  totalSum: number;
  balanceSum: number;
};

export type CreateEstimateAction = PayloadHandlers & {
  estimate: EstimateValues;
};

export type EditEstimateAction = PayloadHandlers & {
  id: number;
  estimate: EstimateValues;
};

export type DeleteEstimateAction = PayloadHandlers & {
  id: number;
};

export type EstimatesReview = {
  estimates: {
    currentYearTotal: number;
    currentMonthTotal: number;
    currentMonthCount: number;
    openCount: number;
    overdueCount: number;
    openBalanceTotal: number;
    overdueBalanceTotal: number;
  };
};

export type SearchEstimatesValues = {
  query: string;
  fromDate: Date;
  toDate: Date;
  paymentMethodId: number | null;
  status: EstimateStatus | null;
  subClient: ISubClient | null;
};

export type EstimatePreview = {
  pdf: string;
};
