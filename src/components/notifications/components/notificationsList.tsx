import { useFocusEffect } from '@react-navigation/core';
import { LIMIT } from 'api';
import { useAppStateEvent } from 'hooks';
import { translations } from 'locales';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, RefreshControl, SectionList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { EmptyState } from 'shared/emptyState';
import { Paragraph } from 'shared/paragraph';
import {
  getNotifications,
  loadMoreNotifications,
  notificationsSelectors,
  readNotifications,
} from 'store/entities/notifications';
import { userSelectors } from 'store/entities/user';
import { theme } from 'theme';
import { FormattedNotification } from 'types/notifications';
import COLORS from 'utils/colors';

import {
  formatNotification,
  getNavigationOptions,
  getNotificationsSections,
} from '../helpers/utils';
import { notificationsStyles as S } from '../style';
import { NotificationItem } from './notificationItem';
import { subscriptionSelectors } from 'store/entities/subscription';

const NotificationsList: React.FC = () => {
  const isProvider = useSelector(userSelectors.isProvider);
  const notifications = useSelector(notificationsSelectors.notifications);
  const subscription = useSelector(subscriptionSelectors.subscription);
  const loading = useSelector(notificationsSelectors.loading);
  const loadingMore = useSelector(notificationsSelectors.loadingMore);
  const offset = useSelector(notificationsSelectors.offset);
  const total = useSelector(notificationsSelectors.total);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const loadMore = () => {
    if (notifications.length < total) {
      dispatch(loadMoreNotifications({ offset: offset + LIMIT }));
    }
  };

  const handleReadNotifications = useCallback(() => {
    setTimeout(() => {
      dispatch(readNotifications());
    }, 2000);
  }, []);

  const refresh = () => {
    dispatch(getNotifications());
    handleReadNotifications();
  };

  const onNotificationPress = (notification: FormattedNotification) => () => {
    const navigationOptions = getNavigationOptions(notification, isProvider);

    if (navigationOptions) {
      Navigator.navigate(navigationOptions.path, navigationOptions.params);
    }
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(getNotifications());
    }, [dispatch]),
  );

  useAppStateEvent({
    onForeground: refresh,
  });

  useEffect(() => {
    handleReadNotifications();
  }, [handleReadNotifications]);

  const sections = getNotificationsSections(notifications);

  return (
    <SectionList
      sections={sections}
      stickySectionHeadersEnabled={false}
      contentContainerStyle={theme.styles.grow}
      showsVerticalScrollIndicator={false}
      keyExtractor={(notification) => notification.id?.toString()}
      renderSectionHeader={({ section: { title, data } }) =>
        data.length ? (
          <Paragraph size="m" type="medium" color={COLORS.brownishGrey} ml={14}>
            {t(title)}
          </Paragraph>
        ) : null
      }
      renderItem={({ item: notification, index }) => {
        const formattedNotification = formatNotification(
          notification,
          isProvider,
        ) as FormattedNotification;

        return (
          formattedNotification && (
            <NotificationItem
              data={formattedNotification}
              isFirstNotification={index === 0}
              onPress={onNotificationPress}
            />
          )
        );
      }}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refresh} />
      }
      onEndReached={loadMore}
      onEndReachedThreshold={0.4}
      ListEmptyComponent={() => (
        <EmptyState entities={t(translations.common.entities.notifications)} />
      )}
      ListFooterComponent={() => (
        <ActivityIndicator
          size="large"
          color={loadingMore ? COLORS.clearBlue : COLORS.transparent}
          style={S.loader}
        />
      )}
    />
  );
};

export { NotificationsList };
