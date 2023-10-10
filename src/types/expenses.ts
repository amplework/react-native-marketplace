import { PayloadHandlers } from 'utils/store';

import { Pagination } from './api';
import { IExpenseType, IPaymentMethod } from './settings';
import { IVendor } from './vendors';

export type ExpenseValues = {
  description: string;
  vendorId: number | null;
  expenseTypeId: number | null;
  paymentMethodId: number | null;
  date: Date | string | any;
  total: string;
  invoiceNumber: string;
  notes: string;
};

export type ExpenseValuesLite = {
  description: string;
  vendorName: string | null;
  expenseTypeId: number | null;
  paymentMethodId: number | null;
  date: Date | string | any;
  total: string;
  invoiceNumber: string;
  notes: string;
};

export type ExpenseData = {
  id: number;
  description: string;
  vendor: {
    id: number;
    name: string;
  } | null;
  vendorName?: string;
  date: Date;
  total: number;
  invoiceNumber: string;
  notes: string;
};

export type DetailedExpense = {
  id: number;
  description: string;
  date: any;
  total: number;
  invoiceNumber: string | null;
  notes: string | null;
  vendor?: IVendor;
  vendorName?: string | any;
  expenseType: IExpenseType;
  paymentMethod: IPaymentMethod;
};

export type EditExpensePayload = PayloadHandlers & {
  values: ExpenseValues;
};

export type ExpenseValuesRequest = {
  description: string;
  vendorId: number | null;
  expenseTypeId: number | null;
  paymentMethodId: number | null;
  date: string | null;
  total: number;
  invoiceNumber: string | null;
  notes: string;
};

export type EditExpenseRequest = ExpenseValuesRequest & {
  id: number;
};

export type GetExpensesSuccess = Pagination<ExpenseData[]> & {
  totalSum: number;
};

export type GetExpensesRequest = {
  query?: string;
  fromDate: string;
  toDate?: string;
  vendorId?: number | null;
  expenseTypeId?: number | null;
  paymentMethodId?: number | null;
  offset?: number;
  limit?: number;
};

export type SearchExpensesValues = {
  query?: string;
  fromDate: Date;
  toDate: Date;
  vendorId?: number | null;
  expenseTypeId?: number | null;
  paymentMethodId?: number | null;
  offset?: number;
  limit?: number;
};

export type DeleteExpensePayload = PayloadHandlers & {
  id: number;
};

export type ExpensesReview = {
  currentYearTotal: number;
  currentMonthTotal: number;
  currentWeekTotal: number;
  currentMonthCount: number;
  currentWeekCount: number;
};
