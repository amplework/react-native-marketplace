import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IClosedDays as IClosedDaysItem,
  ICreateClosedDaysRequest,
  IEditClosedDaysRequest,
} from 'types/settings';

import { IClosedDays } from './types';

const initialState: IClosedDays = {
  closedDaysList: [],
  isModalOpened: false,
  isModalVisible: false,
  closedDays: null,
  isLoading: false,
};

const slice = createSlice({
  name: 'closedDays',
  initialState,
  reducers: {
    getClosedDays: (state) => {
      state.isLoading = true;
    },
    getClosedDaysSuccess: (state, action: PayloadAction<IClosedDaysItem[]>) => {
      state.isLoading = false;
      state.closedDaysList = action.payload;
    },
    getClosedDaysFailure: (state) => {
      state.isLoading = false;
    },
    openEditModal: (state, action: PayloadAction<IClosedDaysItem | null>) => {
      state.isModalOpened = true;
      state.closedDays = action.payload;
    },
    closeEditModal: (state) => {
      state.isModalOpened = false;
      state.closedDays = null;
    },
    openModal: (state) => {
      state.isModalVisible = true;
    },
    closeModal: (state) => {
      state.isModalVisible = false;
    },
    createClosedDays: (
      state,
      _action: PayloadAction<ICreateClosedDaysRequest>,
    ) => {
      state.isLoading = true;
    },
    createClosedDaysSuccess: (
      state,
      action: PayloadAction<IClosedDaysItem>,
    ) => {
      state.isLoading = false;
      state.closedDaysList.unshift(action.payload);
    },
    createClosedDaysFailure: (state) => {
      state.isLoading = false;
    },
    editClosedDays: (state, _action: PayloadAction<IEditClosedDaysRequest>) => {
      state.isLoading = true;
    },
    editClosedDaysSuccess: (
      state,
      action: PayloadAction<IEditClosedDaysRequest>,
    ) => {
      const { shouldSendClientsNotification, ...data } = action.payload;
      const index = state.closedDaysList.findIndex(({ id }) => id === data.id);

      state.isLoading = false;
      state.closedDaysList[index] = data;
    },
    editClosedDaysFailure: (state) => {
      state.isLoading = false;
    },
    deleteClosedDays: (state, _action: PayloadAction<number>) => {
      state.isLoading = true;
    },
    deleteClosedDaysSuccess: (state) => {
      const { id } = state.closedDays!;
      const index = state.closedDaysList.findIndex((days) => days.id === id);

      state.isLoading = false;
      state.closedDaysList.splice(index, 1);
    },
    deleteClosedDaysFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  actions: {
    getClosedDays,
    getClosedDaysSuccess,
    getClosedDaysFailure,
    openEditModal,
    closeEditModal,
    openModal,
    closeModal,
    createClosedDays,
    createClosedDaysSuccess,
    createClosedDaysFailure,
    editClosedDays,
    editClosedDaysSuccess,
    editClosedDaysFailure,
    deleteClosedDays,
    deleteClosedDaysSuccess,
    deleteClosedDaysFailure,
  },
  reducer: closedDaysReducer,
} = slice;
