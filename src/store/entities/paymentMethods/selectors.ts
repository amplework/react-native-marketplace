import { IPaymentMethodsState } from './types';

const all = (state: IPaymentMethodsState) => state.paymentMethods;

const methods = (state: IPaymentMethodsState) => all(state).methods;

const loading = (state: IPaymentMethodsState) => all(state).loading;

const isModalOpened = (state: IPaymentMethodsState) => all(state).isModalOpened;

const method = (state: IPaymentMethodsState) => all(state).method;

const methodLoading = (state: IPaymentMethodsState) => all(state).methodLoading;

export const paymentMethodsSelectors = {
  methods,
  loading,
  isModalOpened,
  method,
  methodLoading,
};
