import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import React, { useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { clearDeliveredNotifications } from 'service/notifications';
import { BackButton } from 'shared/backButton';
import { MainPageTemplate } from 'shared/templates';
import { useSelector } from 'react-redux';
import { notificationsSelectors } from 'store/entities/notifications';

import { NotificationsList } from './components/notificationsList';
import { notificationsStyles as S } from './style';

type NotificationsProps = StackScreenProps<RootStackParamList>;

const Notifications: React.FC<NotificationsProps> = ({ navigation }) => {
  const loading = useSelector(notificationsSelectors.loading);
  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerRight: () => null,
      headerLeft: () => (
        <BackButton title={t(translations.notifications.title)} />
      ),
    });
  }, [navigation, t]);

  useEffect(() => {
    clearDeliveredNotifications();
  }, []);

  return (
    <MainPageTemplate containerStyle={S.container}>
      <NotificationsList />
    </MainPageTemplate>
  );
};

export { Notifications };
