import { NotificationSettingsOptions } from 'types/settings';

export type NotificationSettingsState = {
  notificationSettings: NotificationSettingsSlice;
};

export type NotificationSettingsSlice = {
  settings: NotificationSettingsOptions;
  reminderTime: number;
  loading: boolean;
  updateLoading: boolean;
};
