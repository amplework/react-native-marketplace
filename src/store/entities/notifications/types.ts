import { Notification } from 'types/notifications';

export type NotificationsState = {
  notifications: Notifications;
};

export type Notifications = {
  notifications: Notification[];
  loading: boolean;
  loadingMore: boolean;
  offset: number;
  total: number;
  readLoading: boolean;
  hasNewNotifications: boolean;
  notificationStatusLoading: boolean;
  tokenLoading: boolean;
  token: string | null;
};
