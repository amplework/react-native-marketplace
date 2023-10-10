import { Pagination } from './api';

export type Notification = {
  id: number;
  type: string;
  title: string;
  text?: string | null;
  hasRead: boolean;
  payload: any;
  createdAt: string;
};

export type GetNotificationsPayload = {
  limit?: number;
  offset?: number;
  query?: string;
};

export type NewStatusResponse = {
  hasNewNotifications: boolean;
};

export type GetNotificationsResponse = Pagination<Notification[]>;

export type LabeledValue = {
  label: string;
  value?: string | number;
};

export type NotificationUserInfo = {
  id: number;
  name: string;
  avatar: string | null;
  isConnected: boolean;
};

export type FormattedNotification = Omit<Notification, 'payload'> & {
  isClickable?: boolean;
  navigationParams?: any;
  fields?: LabeledValue[];
  user?: NotificationUserInfo;
};
