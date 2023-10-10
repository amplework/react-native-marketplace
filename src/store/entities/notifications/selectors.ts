import { NotificationsState } from './types';

const all = (state: NotificationsState) => state.notifications;

const notifications = (state: NotificationsState) => all(state).notifications;

const loading = (state: NotificationsState) => all(state).loading;

const loadingMore = (state: NotificationsState) => all(state).loadingMore;

const offset = (state: NotificationsState) => all(state).offset;

const total = (state: NotificationsState) => all(state).total;

const hasNewNotifications = (state: NotificationsState) =>
  all(state).hasNewNotifications;

const notificationStatusLoading = (state: NotificationsState) =>
  all(state).notificationStatusLoading;

const token = (state: NotificationsState) => all(state).token;

const tokenLoading = (state: NotificationsState) => all(state).tokenLoading;

export const notificationsSelectors = {
  notifications,
  loading,
  loadingMore,
  offset,
  total,
  hasNewNotifications,
  notificationStatusLoading,
  token,
  tokenLoading,
};
