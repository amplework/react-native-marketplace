import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEditTaxRequest, ITax, TaxValues } from 'types/taxes';
import { compareBy } from 'utils/array';

import { ITaxes } from './types';

const initialState: ITaxes = {
  taxes: [],
  loading: false,
  isModalOpened: false,
  tax: null,
  taxLoading: false,
};

const taxes = createSlice({
  name: 'taxes',
  initialState,
  reducers: {
    getTaxes: (state) => {
      state.loading = true;
    },
    getTaxesSuccess: (state, action: PayloadAction<ITax[]>) => {
      state.loading = false;
      state.taxes = action.payload;
    },
    getTaxesFailure: (state) => {
      state.loading = false;
    },
    openEditModal: (state, action: PayloadAction<ITax | null>) => {
      state.isModalOpened = true;
      state.tax = action.payload;
    },
    closeEditModal: (state) => {
      state.isModalOpened = false;
      state.tax = null;
    },
    createTax: (state, _action: PayloadAction<TaxValues>) => {
      state.taxLoading = true;
    },
    createTaxSuccess: (state, action: PayloadAction<ITax>) => {
      state.taxLoading = false;
      state.taxes.push(action.payload);
      state.taxes.sort(compareBy('shortName'));
    },
    createTaxFailure: (state) => {
      state.taxLoading = false;
    },
    editTax: (state, _action: PayloadAction<IEditTaxRequest>) => {
      state.taxLoading = true;
    },
    editTaxSuccess: (state, action: PayloadAction<ITax>) => {
      state.taxLoading = false;

      const index = state.taxes.findIndex(({ id }) => id === action.payload.id);

      state.taxes[index] = action.payload;
      state.taxes.sort(compareBy('shortName'));
    },
    editTaxFailure: (state) => {
      state.taxLoading = false;
    },
    deleteTax: (state, _action: PayloadAction<number>) => {
      state.loading = true;
    },
    deleteTaxSuccess: (state) => {
      const { id } = state.tax!;
      const index = state.taxes.findIndex((tax) => tax.id === id);

      state.loading = false;
      state.taxes.splice(index, 1);
    },
    deleteTaxFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  actions: {
    getTaxes,
    getTaxesFailure,
    getTaxesSuccess,
    closeEditModal,
    openEditModal,
    createTax,
    createTaxFailure,
    createTaxSuccess,
    editTax,
    editTaxFailure,
    editTaxSuccess,
    deleteTax,
    deleteTaxFailure,
    deleteTaxSuccess,
  },
  reducer: taxesReducer,
} = taxes;
