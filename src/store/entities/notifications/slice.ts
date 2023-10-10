import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  GetNotificationsPayload,
  GetNotificationsResponse,
  NewStatusResponse,
} from 'types/notifications';

import { Notifications } from './types';

const initialState: Notifications = {
  notifications: [],
  loading: false,
  loadingMore: false,
  offset: 0,
  total: 0,
  readLoading: false,
  hasNewNotifications: false,
  notificationStatusLoading: false,
  tokenLoading: false,
  token: null,
};

export const notifications = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    getNotifications: (
      state,
      _action: PayloadAction<GetNotificationsPayload | undefined>,
    ) => {
      state.loading = true;
    },
    getNotificationsSuccess: (
      state,
      { payload }: PayloadAction<GetNotificationsResponse>,
    ) => {
      state.loading = false;
      state.notifications = payload.result;
      state.total = payload.meta.totalCount;
      state.offset = payload.meta.offset;
    },
    getNotificationsFailure: (state) => {
      state.loading = false;
    },
    loadMoreNotifications: (
      state,
      _action: PayloadAction<GetNotificationsPayload>,
    ) => {
      state.loadingMore = true;
    },
    loadMoreNotificationsSuccess: (
      state,
      { payload }: PayloadAction<GetNotificationsResponse>,
    ) => {
      state.loadingMore = false;
      state.notifications.push(...payload.result);
      state.total = payload.meta.totalCount;
      state.offset = payload.meta.offset;
    },
    loadMoreNotificationsFailure: (state) => {
      state.loadingMore = false;
    },
    readNotifications: (state) => {
      state.readLoading = true;
    },
    readNotificationsSuccess: (state) => {
      state.readLoading = false;
    },
    readNotificationsFailure: (state) => {
      state.readLoading = false;
    },
    getNotificationsStatus: (state) => {
      state.notificationStatusLoading = true;
    },
    getNotificationsStatusSuccess: (
      state,
      { payload }: PayloadAction<NewStatusResponse>,
    ) => {
      state.notificationStatusLoading = false;
      state.hasNewNotifications = payload.hasNewNotifications;
    },
    getNotificationsStatusFailure: (state) => {
      state.notificationStatusLoading = false;
    },
    saveNotificationsToken: (state, _action: PayloadAction<string>) => {
      state.tokenLoading = true;
    },
    saveNotificationsTokenSuccess: (
      state,
      { payload }: PayloadAction<string>,
    ) => {
      state.tokenLoading = false;
      state.token = payload;
    },
    saveNotificationsTokenFailure: (state) => {
      state.tokenLoading = false;
    },
    deleteNotificationsToken: (state) => {
      state.tokenLoading = true;
    },
    deleteNotificationsTokenSuccess: (state) => {
      state.tokenLoading = false;
      state.token = null;
    },
    deleteNotificationsTokenFailure: (state) => {
      state.tokenLoading = false;
    },
  },
});

export const {
  actions: {
    getNotifications,
    getNotificationsFailure,
    getNotificationsSuccess,
    readNotifications,
    readNotificationsFailure,
    readNotificationsSuccess,
    getNotificationsStatus,
    getNotificationsStatusFailure,
    getNotificationsStatusSuccess,
    saveNotificationsToken,
    saveNotificationsTokenFailure,
    saveNotificationsTokenSuccess,
    deleteNotificationsToken,
    deleteNotificationsTokenFailure,
    deleteNotificationsTokenSuccess,
    loadMoreNotifications,
    loadMoreNotificationsFailure,
    loadMoreNotificationsSuccess,
  },
  reducer: notificationsReducer,
} = notifications;
