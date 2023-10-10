import { translations } from 'locales';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { EmptyState } from 'shared/emptyState';
import {
  getReminders,
  openReminderModal,
  remindersSelectors,
} from 'store/entities/reminders';
import { theme } from 'theme';
import { Reminder } from 'types/settings';

import { RemindersItem } from './remindersItem';

const RemindersList: React.FC = () => {
  const reminders = useSelector(remindersSelectors.reminders);
  const loading = useSelector(remindersSelectors.loading);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const fetchReminders = useCallback(() => {
    dispatch(getReminders());
  }, [dispatch]);

  useEffect(() => {
    fetchReminders();
  }, [fetchReminders]);

  const handleEdit = (reminder: Reminder) => () =>
    dispatch(openReminderModal(reminder));

  return (
    <FlatList
      data={reminders}
      keyExtractor={(reminder) => reminder.id.toString()}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchReminders} />
      }
      renderItem={({ item: reminder }) => (
        <RemindersItem reminder={reminder} onPress={handleEdit(reminder)} />
      )}
      style={theme.spacing.pb(24)}
      contentContainerStyle={theme.styles.grow}
      ListEmptyComponent={() => (
        <EmptyState
          entities={t(translations.common.entities.reminders)}
          ph={24}
        />
      )}
    />
  );
};

export { RemindersList };
