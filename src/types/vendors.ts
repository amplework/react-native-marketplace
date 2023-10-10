import { PayloadHandlers } from 'utils/store';

import { IAddress } from './address';
import { TopExpenseType } from './settings';

export interface IVendor {
  id: number;
  email?: string;
  name: string;
  phoneNumber: string;
  address?: IAddress;
  notes?: string;
  expensesTotal?: number;
}

export type VendorValues = {
  name: string;
  email: string;
  phoneNumber: string;
  address: IAddress | null;
  notes: string;
  countryCode:string
};

export type GetVendorsRequest = {
  query?: string;
  hasExpensesThisMonth?: boolean;
};

export type GetVendorRequest = {
  id: number;
};

export type EditVendorPayload = PayloadHandlers & {
  values: VendorValues;
};

export type EditVendorRequest = VendorValues & {
  id: number;
};

export type DeleteVendorPayload = PayloadHandlers & {
  id: number;
};

export type VendorsReview = {
  count: number;
  expensesCurrentMonthTotal: number;
  vendorsWithExpensesCount: number;
  topVendorExpenseTypes: TopExpenseType[];
};
