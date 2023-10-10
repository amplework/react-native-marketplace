import I18n from 'locales';

const createRemindOption = (unit: string, value: number, amount: number) => ({
  label: I18n.t(`tasks.remindMe.label.${unit}`, { amount }),
  inputLabel: I18n.t(`tasks.remindMe.inputLabel.${unit}`, {
    amount,
  }),
  value,
});

export const REMIND_ME_INTERVALS = [
  createRemindOption('minutes', 15, 15),
  createRemindOption('minutes', 30, 30),
  createRemindOption('minutes', 60, 60),
  createRemindOption('hours', 4 * 60, 4),
  createRemindOption('day', 24 * 60, 1),
];
