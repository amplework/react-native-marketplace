import I18n from 'locales';

const createTimeOption = (value: number) => ({
  label: I18n.t('calendarSetup.timeBetweenAppointments.label', {
    amount: value,
  }),
  inputLabel: I18n.t('calendarSetup.timeBetweenAppointments.inputLabel', {
    amount: value,
  }),
  value,
});

export const TIME_BETWEEN_APPOINTMENTS = [
  createTimeOption(0),
  createTimeOption(5),
  createTimeOption(15),
  createTimeOption(30),
  createTimeOption(45),
  createTimeOption(60),
  createTimeOption(75),
  createTimeOption(90),
];

const createRemindClientOption = (
  measure: string,
  value: number,
  amount: number,
) => ({
  label: I18n.t(`calendarSetup.remindClient.label.${measure}`, { amount }),
  inputLabel: I18n.t(`calendarSetup.remindClient.inputLabel.${measure}`, {
    amount,
  }),
  value,
});

export const REMIND_CLIENT_INTERVALS = [
  createRemindClientOption('minutes', 15, 15),
  createRemindClientOption('minutes', 30, 30),
  createRemindClientOption('minutes', 60, 60),
  createRemindClientOption('hours', 4 * 60, 4),
  createRemindClientOption('day', 24 * 60, 1),
];

export const REASONS = [
  {
    label: I18n.t('closedDays.reason.label.holiday'),
    inputLabel: I18n.t('closedDays.reason.inputLabel.holiday'),
    value: 'holiday',
  },
  {
    label: I18n.t('closedDays.reason.label.vacation'),
    inputLabel: I18n.t('closedDays.reason.inputLabel.vacation'),
    value: 'vacation',
  },
  {
    label: I18n.t('closedDays.reason.label.other'),
    inputLabel: I18n.t('closedDays.reason.inputLabel.other'),
    value: 'other',
  },
];

export const REWARD_TYPE_DATA = [
  {
    "label": "Discount Amount",
    "value": {
      id: 1,
      name: 'discount amount'
    }
  },
  {
    "label": "Discount Percent",
    "value": {
      id: 2,
      name: 'discount percent'
    }
  }
];

export const REWARD_FOR_DATA = [
  {
    "label": "Services",
    "value": {
      id: 1,
      name: 'services'
    }
  },
  {
    "label": "Items",
    "value": {
      id: 2,
      name: 'items'
    }
  }
];

export const REWARD_REASON_DATA = [
  {
    "label": "Total money spent",
    "value": {
      id: 1,
      name: 'total money spent'
    }
  },
  {
    "label": "Number of appointments completed",
    "value": {
      id: 2,
      name: 'number of appointments completed'
    }
  }
];