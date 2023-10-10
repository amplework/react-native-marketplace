import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { InvoiceNotes } from './types';

const initialState: InvoiceNotes = {
  loading: false,
};

const invoiceNotes = createSlice({
  name: 'invoiceNotes',
  initialState,
  reducers: {
    editInvoiceNotes: (state, _action: PayloadAction<string>) => {
      state.loading = true;
    },
    editInvoiceNotesSuccess: (state) => {
      state.loading = false;
    },
    editInvoiceNotesFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  actions: {
    editInvoiceNotes,
    editInvoiceNotesFailure,
    editInvoiceNotesSuccess,
  },
  reducer: invoiceNotesReducer,
} = invoiceNotes;
