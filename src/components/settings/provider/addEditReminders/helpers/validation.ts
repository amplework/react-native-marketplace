import { t, translations } from 'locales';
import { Reminder } from 'types/settings';
import { validationMessages } from 'utils/validation';
import * as Yup from 'yup';

export const reminderSchema = (reminders: Reminder[]) =>
  Yup.object().shape({
    entity: Yup.string()
      .nullable()
      .required(
        validationMessages.required(translations.reminders.fields.entity),
      ),
    reminderTime: Yup.number()
      .nullable()
      .required(
        validationMessages.required(translations.reminders.fields.reminderTime),
      )
      .test(
        'reminder',
        t(translations.reminders.errors.uniq),
        function (value) {
          return reminders.every(
            ({ entity, reminderTime }) =>
              entity !== this.parent.entity || reminderTime !== value,
          );
        },
      ),
  });
