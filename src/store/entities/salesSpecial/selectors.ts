import { ISaleSpecialState } from './types';

const all = (state: ISaleSpecialState) => state.salesSpecials;

const loading = (state: ISaleSpecialState) => all(state).loading;

const saleSpecialLoading = (state: ISaleSpecialState) => all(state).saleSpecialLoading;

const salesSpecialsLoading = (state: ISaleSpecialState) => all(state).salesSpecialsLoading;

const isModalOpened = (state: ISaleSpecialState) => all(state).isModalOpened;

const isSalesDetailModalOpened = (state: ISaleSpecialState) => all(state).isSalesDetailModalOpened;

const salesSpecials = (state: ISaleSpecialState) => all(state).salesSpecials;

const clientSalesSpecialsLoading = (state: ISaleSpecialState) => all(state).clientSalesSpecials.loading;

const clientSalesSpecialsLoadingMore = (state: ISaleSpecialState) => all(state).clientSalesSpecials.loadingMore;

const clientSalesSpecialsTopFive = (state: ISaleSpecialState) => all(state).clientSalesSpecials.topFive;

const clientSalesSpecialsList = (state: ISaleSpecialState) => all(state).clientSalesSpecials.list;

const clientSalesSpecialsOffset = (state: ISaleSpecialState) => all(state).clientSalesSpecials.offset;

const clientSalesSpecialsTotal = (state: ISaleSpecialState) => all(state).clientSalesSpecials.total;

const salesSpecialsByProvider = (state: ISaleSpecialState) => all(state).salesSpecialsByProvider;

const salesSpecialsDetailsList = (state: ISaleSpecialState) => all(state).salesSpecialsDetailsList;

const saleSpecial = (state: ISaleSpecialState) => all(state).saleSpecial;

const salesSpecialById = (state: ISaleSpecialState) => all(state).salesSpecialById;

export const salesSpecialSelectors = {
  salesSpecials,
  loading,
  isModalOpened,
  isSalesDetailModalOpened,
  saleSpecial,
  clientSalesSpecialsLoading,
  clientSalesSpecialsLoadingMore,
  clientSalesSpecialsTopFive,
  clientSalesSpecialsList,
  clientSalesSpecialsOffset,
  clientSalesSpecialsTotal,
  salesSpecialsLoading,
  salesSpecialsByProvider,
  salesSpecialsDetailsList,
  saleSpecialLoading,
  salesSpecialById,
};
