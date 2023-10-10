import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ModalSlice } from './types';

const initialState: ModalSlice = {
  isOpened: false,
  isAddressModal: false,
  content: {},
};

const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<Record<string, any> | undefined>,
    ) => {
      state.isOpened = true;
      state.content = action.payload || {};
    },
    closeModal: (state) => {
      state.isOpened = false;
      state.content = {};
    },
    openAddressModal: (state) => {
      state.isAddressModal = true;
    },
    closeAddressModal: (state) => {
      state.isAddressModal = false;
    },
  },
});

export const {
  actions: { closeModal, openModal, openAddressModal, closeAddressModal },
  reducer: modalReducer,
} = modal;
