import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CreateSaleRequest,
  GetSalesRequest,
  Sale,
  SalesSuccess,
} from 'types/sales';

import { Sales } from './types';
import { ShareEmailRequest } from 'types/api';

const initialState: Sales = {
  sales: [],
  meta: {
    count: 0,
    limit: 0,
    offset: 0,
    totalCount: 0,
  },
  totalSum: 0,
  sale: null,
  loading: false,
  updateSalePaymentStatusLoading: false,
};

const sales = createSlice({
  name: 'sale',
  initialState,
  reducers: {
    getSales: (state, _action: PayloadAction<GetSalesRequest>) => {
      state.loading = true;
    },
    getSalesSuccess: (state, action: PayloadAction<SalesSuccess>) => {
      const sortedArray = action.payload?.result.sort((a: any, b:any) => a?.number - b?.number).reverse();
      const sortedOffsetArray = [...state.sales, ...action.payload?.result].sort((a: any, b:any) => a?.number - b?.number).reverse();
      state.loading = false;
      state.sales = action.payload?.meta?.offset
        ? sortedOffsetArray
        : sortedArray;
      state.meta = action.payload?.meta;
      state.totalSum = action.payload?.totalSum;
    },
    getSalesFailure: (state) => {
      state.loading = false;
    },
    resetSales: (state) => {
      state.sales = [];
      state.totalSum = 0;
      state.meta = {
        count: 0,
        limit: 0,
        offset: 0,
        totalCount: 0,
      }
    },
    getSaleDetails: (state, _action: PayloadAction<number>) => {
      state.loading = true;
    },
    getSaleDetailsSuccess: (state, action: PayloadAction<Sale>) => {
      state.loading = false;
      state.sale = action.payload;
    },
    getSaleDetailsFailure: (state) => {
      state.loading = false;
    },
    deleteSale: (state, _action: PayloadAction<number>) => {
      state.loading = true;
      state.sale = null;
    },
    deleteSaleSuccess: (state) => {
      state.loading = false;
    },
    deleteSaleFailure: (state) => {
      state.loading = false;
    },
    createSale: (state, _action: PayloadAction<CreateSaleRequest>) => {
      state.loading = true;
    },
    createSaleSuccess: (state) => {
      state.loading = false;
    },
    createSaleFailure: (state) => {
      state.loading = false;
    },
    updateSale: (state, _action: PayloadAction<CreateSaleRequest>) => {
      state.loading = true;
    },
    updateSaleSuccess: (state) => {
      state.loading = false;
    },
    updateSaleFailure: (state) => {
      state.loading = false;
    },
    shareSale: (_state, _action: PayloadAction<ShareEmailRequest>) => {},
    shareSaleProvider: (_state, _action: PayloadAction<ShareEmailRequest>) => {},
    resetSale: (state) => {
      state.sale = null;
    },
    updateSalePaymentStatus: (state, _action: PayloadAction<any>) => {
      state.updateSalePaymentStatusLoading = true;
    },
    updateSalePaymentStatusSuccess: (state, action: PayloadAction<any>) => {
      state.updateSalePaymentStatusLoading = false;
    },
    updateSalePaymentStatusFailure: (state) => {
      state.updateSalePaymentStatusLoading = false;
    },
  },
});

export const {
  actions: {
    getSales,
    getSalesFailure,
    getSalesSuccess,
    getSaleDetails,
    getSaleDetailsFailure,
    getSaleDetailsSuccess,
    createSale,
    createSaleFailure,
    createSaleSuccess,
    deleteSale,
    deleteSaleFailure,
    deleteSaleSuccess,
    updateSale,
    updateSaleFailure,
    updateSaleSuccess,
    shareSale,
    shareSaleProvider,
    resetSale,
    resetSales,
    updateSalePaymentStatus,
    updateSalePaymentStatusSuccess,
    updateSalePaymentStatusFailure,
  },
  reducer: salesReducer,
} = sales;
