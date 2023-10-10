import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import { AddButton } from 'shared/button/add';
import { MainPageTemplate } from 'shared/templates';
import {
  openReminderModal,
  remindersSelectors,
} from 'store/entities/reminders';

import { AddEditReminders } from '../addEditReminders';
import { RemindersList } from './components/remindersList';

type Props = StackScreenProps<RootStackParamList>;

const Reminders: React.FC<Props> = ({ navigation }) => {
  const isModalOpened = useSelector(remindersSelectors.isModalOpened);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton title={t(translations.settings.links.reminders)} />
      ),
    });
  }, [navigation, t]);

  const handleAddReminder = () => dispatch(openReminderModal(null));

  return (
    <MainPageTemplate>
      {isModalOpened && <AddEditReminders />}
      <AddButton
        title={t(translations.reminders.add)}
        onPress={handleAddReminder}
      />
      <RemindersList />
    </MainPageTemplate>
  );
};

export { Reminders };
