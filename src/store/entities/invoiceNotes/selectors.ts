import { InvoiceNotesState } from './types';

const all = (state: InvoiceNotesState) => state.invoiceNotes;

const loading = (state: InvoiceNotesState) => all(state).loading;

export const invoiceNotesSelectors = {
  loading,
};
