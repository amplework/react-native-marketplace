import { NotificationSettingsOptions } from 'types/settings';
import { PUSH_NOTIFICATIONS } from 'utils/constants';

export const hasRemindMeOptionAvailable = (
  settings: NotificationSettingsOptions,
) => {
  const notifications = Object.values(settings).flat();

  return notifications.some(
    (notification) => notification === PUSH_NOTIFICATIONS.appointmentReminder,
  );
};
