import { t, translations } from 'locales';
import { ReminderEntity } from 'types/settings';

type ReminderEntityOption = {
  label: string;
  value: ReminderEntity;
};

export const REMINDER_ENTITY_OPTIONS: ReminderEntityOption[] = [
  {
    label: t(translations.reminders.entity.sales),
    value: 'sales',
  },
  {
    label: t(translations.reminders.entity.invoices),
    value: 'invoices',
  },
  {
    label: t(translations.reminders.entity.expenses),
    value: 'expenses',
  },
];

export const REMINDER_TIME_OPTIONS = [
  {
    label: t(translations.reminders.missDay),
    value: 1,
  },
  {
    label: t(translations.reminders.missDays, { count: 3 }),
    value: 3,
  },
  {
    label: t(translations.reminders.missDays, { count: 7 }),
    value: 7,
  },
];
