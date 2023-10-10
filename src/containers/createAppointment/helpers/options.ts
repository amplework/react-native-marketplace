import { t, translations } from 'locales';

const optionClient = (
  label: string,
  inputLabel: string,
  value: number,
  amount: number,
) => {
  return {
    label: t('appAppointments.remindClient.' + label, { amount }),
    value: value,
    inputLabel: t('appAppointments.remindClient.' + inputLabel, {
      amount,
    }),
  };
};

const optionMe = (
  label: string,
  inputLabel: string,
  value: number,
  amount: number,
) => {
  return {
    label: t('appAppointments.remindMe.' + label, { amount }),
    value: value,
    inputLabel: t('appAppointments.remindMe.' + inputLabel, {
      amount,
    }),
  };
};

export const REMIND_ME_INTERVALS = [
  {
    label: t(translations.common.labels.noRemind),
    value: null,
    inputLabel: t(translations.appAppointments.remindMe.inputLabel.noRemind),
  },
  optionMe('label.minutes', 'inputLabel.minutes', 15, 15),
  optionMe('label.minutes', 'inputLabel.minutes', 30, 30),
  optionMe('label.hour', 'inputLabel.hour', 60, 1),
  optionMe('label.hours', 'inputLabel.hours', 60 * 4, 4),
  optionMe('label.day', 'inputLabel.day', 60 * 24, 1),
];

export const REMIND_CLIENT_INTERVALS = [
  {
    label: t(translations.common.labels.noRemind),
    value: null,
    inputLabel: t(
      translations.appAppointments.remindClient.inputLabel.noRemind,
    ),
  },
  optionClient('label.minutes', 'inputLabel.minutes', 15, 15),
  optionClient('label.minutes', 'inputLabel.minutes', 30, 30),
  optionClient('label.hour', 'inputLabel.hour', 60, 1),
  optionClient('label.hours', 'inputLabel.hours', 60 * 4, 4),
  optionClient('label.day', 'inputLabel.day', 60 * 24, 1),
];
