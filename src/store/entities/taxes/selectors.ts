import { ITaxState } from './types';

const all = (state: ITaxState) => state.taxes;

const taxes = (state: ITaxState) => all(state).taxes;

const loading = (state: ITaxState) => all(state).loading;

const isModalOpened = (state: ITaxState) => all(state).isModalOpened;

const tax = (state: ITaxState) => all(state).tax;

const taxLoading = (state: ITaxState) => all(state).taxLoading;

export const taxesSelectors = {
  taxes,
  loading,
  isModalOpened,
  tax,
  taxLoading,
};
