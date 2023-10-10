import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import { isIOS } from 'utils/device';

export const clearDeliveredNotifications = () => {
  if (isIOS) {
    PushNotificationIOS.setApplicationIconBadgeNumber(0);
  } else {
    PushNotification.setApplicationIconBadgeNumber(0);
  }

  PushNotification.removeAllDeliveredNotifications();
};

export const getNotificationNavigationParams = (notification: any) => {
  const { data } = notification;
  const chatId = data.chatId;

  return chatId
    ? { path: 'Chat', params: { id: chatId } }
    : { path: 'Notifications' };
};
