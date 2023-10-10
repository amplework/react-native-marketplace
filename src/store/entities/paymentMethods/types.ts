import { IPaymentMethod } from 'types/settings';

export interface IPaymentMethodsState {
  paymentMethods: IPaymentMethods;
}

export interface IPaymentMethods {
  methods: IPaymentMethod[];
  loading: boolean;
  isModalOpened: boolean;
  method: IPaymentMethod | null;
  methodLoading: boolean;
}
