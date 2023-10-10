import { NotificationSettingsState } from './types';

const all = (state: NotificationSettingsState) => state.notificationSettings;

const settings = (state: NotificationSettingsState) => all(state).settings;

const reminderTime = (state: NotificationSettingsState) =>
  all(state).reminderTime;

const loading = (state: NotificationSettingsState) => all(state).loading;

const updateLoading = (state: NotificationSettingsState) =>
  all(state).updateLoading;

export const notificationSettingsSelectors = {
  settings,
  reminderTime,
  loading,
  updateLoading,
};
