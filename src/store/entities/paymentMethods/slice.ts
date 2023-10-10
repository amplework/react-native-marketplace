import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ActiveEntityRequest,
  IPaymentMethod,
  PaymentMethodValues,
} from 'types/settings';
import { compareBy, findIndexById } from 'utils/array';

import { IPaymentMethods } from './types';

const initialState: IPaymentMethods = {
  methods: [],
  loading: false,
  isModalOpened: false,
  method: null,
  methodLoading: false,
};

const paymentMethods = createSlice({
  name: 'paymentMethods',
  initialState,
  reducers: {
    getPaymentMethods: (
      state,
      _action: PayloadAction<ActiveEntityRequest | undefined>,
    ) => {
      state.loading = true;
    },
    getPaymentMethodsSuccess: (
      state,
      action: PayloadAction<IPaymentMethod[]>,
    ) => {
      state.loading = false;
      state.methods = action.payload;
    },
    getPaymentMethodsFailure: (state) => {
      state.loading = false;
    },
    openEditModal: (state, action: PayloadAction<IPaymentMethod | null>) => {
      state.isModalOpened = true;
      state.method = action.payload;
    },
    closeEditModal: (state) => {
      state.isModalOpened = false;
      state.method = null;
    },
    createPaymentMethod: (
      state,
      _action: PayloadAction<PaymentMethodValues>,
    ) => {
      state.methodLoading = true;
    },
    createPaymentMethodSuccess: (
      state,
      action: PayloadAction<IPaymentMethod>,
    ) => {
      state.methodLoading = false;
      state.methods.push(action.payload);
      state.methods.sort(compareBy('shortName'));
    },
    createPaymentMethodFailure: (state) => {
      state.methodLoading = false;
    },
    editPaymentMethod: (state, _action: PayloadAction<IPaymentMethod>) => {
      state.methodLoading = true;
    },
    editPaymentMethodSuccess: (
      state,
      { payload }: PayloadAction<IPaymentMethod>,
    ) => {
      const index = state.methods.findIndex(({ id }) => id === payload.id);

      state.methodLoading = false;
      state.methods[index] = payload;
      state.methods.sort(compareBy('shortName'));
    },
    editPaymentMethodFailure: (state) => {
      state.methodLoading = false;
    },
    toggleActive: (state, { payload }: PayloadAction<IPaymentMethod>) => {
      const index = state.methods.findIndex(({ id }) => id === payload.id);

      state.methods[index].isActive = payload.isActive;
    },
    toggleActiveFailure: (
      state,
      { payload }: PayloadAction<IPaymentMethod>,
    ) => {
      const index = state.methods.findIndex(({ id }) => id === payload.id);

      state.methods[index].isActive = !payload.isActive;
    },
    deletePaymentMethod: (state, _action: PayloadAction<number>) => {
      state.methodLoading = true;
    },
    deletePaymentMethodSuccess: (state, { payload }: PayloadAction<number>) => {
      const index = findIndexById(payload)(state.methods);

      state.methodLoading = false;
      state.methods.splice(index, 1);
    },
    deletePaymentMethodFailure: (state) => {
      state.methodLoading = false;
    },
  },
});

export const {
  actions: {
    getPaymentMethods,
    getPaymentMethodsFailure,
    getPaymentMethodsSuccess,
    closeEditModal,
    openEditModal,
    createPaymentMethod,
    createPaymentMethodFailure,
    createPaymentMethodSuccess,
    editPaymentMethod,
    editPaymentMethodFailure,
    editPaymentMethodSuccess,
    toggleActive,
    toggleActiveFailure,
    deletePaymentMethod,
    deletePaymentMethodFailure,
    deletePaymentMethodSuccess,
  },
  reducer: paymentMethodsReducer,
} = paymentMethods;
