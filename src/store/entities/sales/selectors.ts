import { SalesState } from 'store/entities/sales/types';

const all = (state: SalesState) => state.sales;

const sales = (state: SalesState) => all(state).sales;

const meta = (state: SalesState) => all(state).meta;

const totalSum = (state: SalesState) => all(state).totalSum;

const loading = (state: SalesState) => all(state).loading;

const sale = (state: SalesState) => all(state).sale;

const updateSalePaymentStatusLoading = (state: SalesState) => all(state).updateSalePaymentStatusLoading;

export const salesSelectors = {
  sales,
  totalSum,
  meta,
  loading,
  sale,
  updateSalePaymentStatusLoading,
};
