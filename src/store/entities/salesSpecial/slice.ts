import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LIMIT } from 'api';
import _ from 'lodash';
import { ISalesSpecials } from './types';

const initialState: ISalesSpecials = {
  loading: false,
  saleSpecialLoading: false,
  salesSpecialsLoading: false,
  isModalOpened: false,
  isSalesDetailModalOpened: false,
  salesSpecials: [],
  clientSalesSpecials: {
    topFive: [],
    list: [],
    loading: false,
    loadingMore: false,
    offset: 0,
    total: LIMIT,
  },
  salesSpecialsByProvider: [],
  salesSpecialsDetailsList: [],
  saleSpecial: null,
  salesSpecialById: null,
};

const salesSpecials = createSlice({
  name: 'salesSpecial',
  initialState,
  reducers: {
    // getting list of all the sales-specials added by the same providers
    getSalesSpecials: (state) => {
      state.loading = true;
    },
    getSalesSpecialsSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.salesSpecials = _.orderBy(action.payload, 'active', ['desc']);
    },
    getSalesSpecialsFailure: (state) => {
      state.loading = false;
    },

    // getting complete details of the sale-special using sale-special id, for both the client as well as the provider
    getSalesSpecialById: (state, _action: PayloadAction<any>) => {
      state.loading = true;
    },
    getSalesSpecialByIdSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.salesSpecialById = action.payload;
    },
    getSalesSpecialByIdFailure: (state) => {
      state.loading = false;
    },

    // getting list of all the sales-specials, from all the providers, for clients
    getClientSalesSpecials: (state) => {
      state.clientSalesSpecials.loading = true;
    },
    getClientSalesSpecialsSuccess: (state, action: PayloadAction<any>) => {
      const { meta, result } = action.payload;

      let list = [...result]; 
           
      let top = list?.filter((item: any) => item?.active == true)?.splice(0, 5);

      state.clientSalesSpecials.loading = false;
      state.clientSalesSpecials.topFive = top;
      // state.clientSalesSpecials.list = list;

      state.clientSalesSpecials.offset = meta.offset;
      state.clientSalesSpecials.total = meta.totalCount;
    },
    getClientSalesSpecialsFailure: (state) => {
      state.clientSalesSpecials.loading = false;
    },
    getClientMoreSpecials: (state) => {
      state.clientSalesSpecials.loading = true;
    },
    getClientMoreSpecialsSuccess: (state, action: PayloadAction<any>) => {
      state.clientSalesSpecials.list = action.payload;
    },
    getClientMoreSpecialsFailure: (state) => {
      state.clientSalesSpecials.loading = false;
    },
    loadMoreClientSalesSpecials: (state, _action: PayloadAction<any>) => {
      state.clientSalesSpecials.loadingMore = true;
    },
    loadMoreClientSalesSpecialsSuccess: (state, action: PayloadAction<any>) => {
      const { meta, result } = action.payload;

      state.clientSalesSpecials.loadingMore = false;
      state.clientSalesSpecials.list.push(...result);

      state.clientSalesSpecials.offset = meta.offset;
      state.clientSalesSpecials.total = meta.totalCount;
    },
    loadMoreClientSalesSpecialsFailure: (state) => {
      state.clientSalesSpecials.loadingMore = false;
    },

    // getting list of all the sales-specials of the specific provider, for clients
    getSalesSpecialsByProvider: (state, _action: PayloadAction<any>) => {
      state.salesSpecialsLoading = true;
    },
    getSalesSpecialsByProviderSuccess: (state, action: PayloadAction<any>) => {
      const allSalesSpecial = action.payload;
      const activeSales = allSalesSpecial?.filter((sale: any) => sale.active == true);
      state.salesSpecialsLoading = false;
      state.salesSpecialsByProvider = activeSales;
    },
    getSalesSpecialsByProviderFailure: (state) => {
      state.salesSpecialsLoading = false;
    },
    addSaleSpecial: (state, _action: PayloadAction<any>) => {
      state.saleSpecialLoading = true;
    },
    addSaleSpecialSuccess: (state) => {
      state.saleSpecialLoading = false;
    },
    addSaleSpecialFailure: (state) => {
      state.saleSpecialLoading = false;
    },
    editSaleSpecial: (state, _action: PayloadAction<any>) => {
      state.saleSpecialLoading = true;
    },
    editSaleSpecialSuccess: (state) => {
      state.saleSpecialLoading = false;
    },
    editSaleSpecialFailure: (state) => {
      state.saleSpecialLoading = false;
    },
    deleteSaleSpecial: (state, _action: PayloadAction<number>) => {
      state.loading = true;
    },
    deleteSaleSpecialSuccess: (state) => {
      state.loading = false;
    },
    deleteSaleSpecialFailure: (state) => {
      state.loading = false;
    }, 
    updateSalesSpecial: (state, _action: PayloadAction<any>) => {
      state.loading = true;
    },
    updateSalesSpecialSuccess: (state) => {
      state.loading = false;
    },
    updateSalesSpecialFailure: (state) => {
      state.loading = false;
    },
    openAddModal: (state, action: PayloadAction<any | null>) => {
      state.isModalOpened = true;
      state.saleSpecial = action.payload;
    },
    closeAddModal: (state) => {
      state.isModalOpened = false;
    },
    openSalesDetailModal: (state, action: PayloadAction<any | null>) => {
      state.isSalesDetailModalOpened = true;
      state.salesSpecialsDetailsList = action.payload;
    },
    closeSalesDetailModal: (state) => {
      state.isSalesDetailModalOpened = false;
    },
  },
});

export const {
  actions: {
    getSalesSpecials,
    getSalesSpecialsSuccess,
    getSalesSpecialsFailure,
    getSalesSpecialById,
    getSalesSpecialByIdSuccess,
    getSalesSpecialByIdFailure,
    getClientSalesSpecials,
    getClientSalesSpecialsSuccess,
    getClientSalesSpecialsFailure,
    getClientMoreSpecials,
    getClientMoreSpecialsSuccess,
    getClientMoreSpecialsFailure,
    loadMoreClientSalesSpecials,
    loadMoreClientSalesSpecialsSuccess,
    loadMoreClientSalesSpecialsFailure,
    getSalesSpecialsByProvider,
    getSalesSpecialsByProviderSuccess,
    getSalesSpecialsByProviderFailure,
    addSaleSpecial,
    addSaleSpecialSuccess,
    addSaleSpecialFailure,
    editSaleSpecial,
    editSaleSpecialSuccess,
    editSaleSpecialFailure,
    deleteSaleSpecial,
    deleteSaleSpecialSuccess,
    deleteSaleSpecialFailure,
    openAddModal,
    closeAddModal,
    openSalesDetailModal,
    closeSalesDetailModal,
    updateSalesSpecial,
    updateSalesSpecialSuccess,
    updateSalesSpecialFailure,
  },
  reducer: salesSpecialReducer,
} = salesSpecials;
