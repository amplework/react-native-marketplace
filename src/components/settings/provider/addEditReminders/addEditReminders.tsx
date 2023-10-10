import { useFormik } from 'formik';
import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { alert } from 'shared/alert';
import { BottomSheet } from 'shared/bottomSheet';
import { Box } from 'shared/box';
import Button from 'shared/button';
import { ErrorMessage } from 'shared/field';
import { Loader } from 'shared/loader';
import { Paragraph } from 'shared/paragraph';
import { Radio } from 'shared/radio';
import {
  closeReminderModal,
  createReminder,
  deleteReminder,
  editReminder,
  remindersSelectors,
} from 'store/entities/reminders';
import { ReminderValues } from 'types/settings';
import { omit } from 'utils/object';

import { AddEditRemindersHeader } from './components/addEditRemindersHeader';
import {
  REMINDER_ENTITY_OPTIONS,
  REMINDER_TIME_OPTIONS,
} from './helpers/constants';
import { reminderSchema } from './helpers/validation';
import { addEditRemindersStyles as S } from './style';

const AddEditReminders: React.FC = () => {
  const reminders = useSelector(remindersSelectors.reminders);
  const reminder = useSelector(remindersSelectors.reminder);

  const loading = useSelector(remindersSelectors.addEditLoading);
  const deleteLoading = useSelector(remindersSelectors.deleteLoading);

  const dispatch = useDispatch();

  const { values, setFieldValue, errors, handleSubmit } =
    useFormik<ReminderValues>({
      initialValues: reminder
        ? omit(reminder, 'id')
        : {
            entity: null,
            reminderTime: null,
          },
      validationSchema: reminderSchema(reminders),
      onSubmit: (reminderValues) => {
        if (reminder) {
          dispatch(
            editReminder({
              id: reminder.id,
              entity: reminderValues.entity!,
              reminderTime: reminderValues.reminderTime!,
            }),
          );
        } else {
          dispatch(createReminder(values));
        }
      },
    });

  const { t } = useTranslation();

  const handleChange =
    <F extends keyof ReminderValues>(field: F, value: ReminderValues[F]) =>
    () =>
      setFieldValue(field, value);

  const handleClose = () => dispatch(closeReminderModal());

  const confirmDelete = () =>
    alert.deletion({
      entity: t(translations.common.entities.reminder),
      onDelete: () => dispatch(deleteReminder(reminder!.id)),
    });

  return (
    <BottomSheet>
      <AddEditRemindersHeader
        edit={!!reminder}
        onDelete={confirmDelete}
        onClose={handleClose}
      />
      <Loader loading={deleteLoading} />
      <ScrollView style={S.scrollView} contentContainerStyle={S.content}>
        <Box>
          <Paragraph mb={16}>{t(translations.reminders.remindMe)}</Paragraph>
          {REMINDER_ENTITY_OPTIONS.map((option) => (
            <Radio
              key={option.value}
              checked={values.entity === option.value}
              onChange={handleChange('entity', option.value)}
              mb={12}
            >
              <Paragraph type="book" ml={8}>
                {option.label}
              </Paragraph>
            </Radio>
          ))}
          <ErrorMessage error={errors.entity} />
          <Paragraph mt={20} mb={16}>
            {t(translations.reminders.sendReminder)}
          </Paragraph>
          {REMINDER_TIME_OPTIONS.map((option) => (
            <Radio
              key={option.value}
              checked={values.reminderTime === option.value}
              onChange={handleChange('reminderTime', option.value)}
              mb={12}
            >
              <Paragraph type="book" ml={8}>
                {option.label}
              </Paragraph>
            </Radio>
          ))}
          <ErrorMessage error={errors.reminderTime} />
        </Box>
        <Button
          text={t(translations.common.saveChanges)}
          onPress={handleSubmit}
          loading={loading}
          buttonStyle={S.saveButton}
        />
      </ScrollView>
    </BottomSheet>
  );
};

export { AddEditReminders };
