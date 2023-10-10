import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import React, { useCallback, useEffect } from 'react';
import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { saveNotificationsToken } from 'store/entities/notifications';
import { userSelectors } from 'store/entities/user';
import { isIOS } from 'utils/device';

import { getNotificationNavigationParams } from './helpers';

// configuration for iOS
PushNotification.configure({
  onNotification: (notification) => {
    if (!notification.userInteraction && isIOS) {
      PushNotificationIOS.getApplicationIconBadgeNumber(
        (badgeCount: number) => {
          PushNotificationIOS.setApplicationIconBadgeNumber(badgeCount + 1);
        },
      );
    }

    if (notification.userInteraction) {
      const navigation = getNotificationNavigationParams(notification);

      Navigator.navigate(navigation.path, navigation.params);
    }    
    
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
});

const PushNotificationsManager: React.FC = () => {
  const user = useSelector(userSelectors.user);

  const dispatch = useDispatch();

  const requestUserPermission = useCallback(async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const token = await Platform.select({
        android: messaging().getToken(),
        ios: messaging().getToken(),
      });

      if (token && user) {
        dispatch(saveNotificationsToken(token));
      }
    }
  }, [dispatch, user]);

  useEffect(() => {
    requestUserPermission();
  }, [requestUserPermission]);

  // *Receive background notification
  useEffect(() => {
    const unsubscribe = messaging().setBackgroundMessageHandler(async () => {
      PushNotification.getApplicationIconBadgeNumber((badgeCount: number) => {
        PushNotification.setApplicationIconBadgeNumber(badgeCount + 1);
      });
    });

    return unsubscribe;
  }, []);

  // *Receive foreground notification
  useEffect(() => {
    const unsubscribe = messaging().onMessage(() => {
      PushNotification.getApplicationIconBadgeNumber((badgeCount: number) => {
        PushNotification.setApplicationIconBadgeNumber(badgeCount + 1);
      });
    });

    return unsubscribe;
  }, []);

  return null;
};

export { PushNotificationsManager };
