import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  GetNotificationSettingsResponse,
  NotificationSettingsValues,
} from 'types/settings';

import { NotificationSettingsSlice } from './types';

const initialState: NotificationSettingsSlice = {
  settings: {
    email: [],
    push: [],
    sms: [],
  },
  reminderTime: 60,
  loading: false,
  updateLoading: false,
};

const notificationSettings = createSlice({
  name: 'notificationSettings',
  initialState,
  reducers: {
    getNotificationSettings: (state) => {
      state.loading = true;
    },
    getNotificationSettingsSuccess: (
      state,
      action: PayloadAction<GetNotificationSettingsResponse>,
    ) => {
      state.loading = false;
      state.settings = action.payload.settings;
      state.reminderTime = action.payload.reminderTime;
    },
    getNotificationSettingsFailure: (state) => {
      state.loading = false;
    },
    updateNotificationSettings: (
      state,
      _action: PayloadAction<NotificationSettingsValues>,
    ) => {
      state.updateLoading = true;
    },
    updateNotificationSettingsSuccess: (
      state,
      action: PayloadAction<GetNotificationSettingsResponse>,
    ) => {
      state.updateLoading = false;
      state.settings = action.payload.settings;
      state.reminderTime = action.payload.reminderTime;
    },
    updateNotificationSettingsFailure: (state) => {
      state.updateLoading = false;
    },
  },
});

export const {
  actions: {
    getNotificationSettings,
    getNotificationSettingsFailure,
    getNotificationSettingsSuccess,
    updateNotificationSettings,
    updateNotificationSettingsFailure,
    updateNotificationSettingsSuccess,
  },
  reducer: notificationSettingsReducer,
} = notificationSettings;
