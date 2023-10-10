import I18n from 'locales';
import { Task, TaskValues } from 'types/tasks';
import { MONTHS } from 'utils/constants';
import { parseApiTime, parseDate } from 'utils/dates';

import { formatRepeatDate } from './dates';

export const getRepeatOption = (task: Task) => {
  if (task.repeatFrequency === 'daily') {
    return 0;
  }

  if (task.repeatFrequency === 'weekly') {
    return task.repeatWeekday?.length === 1 ? 1 : 4;
  }

  if (task.repeatFrequency === 'monthly') {
    return 2;
  }

  if (task.repeatFrequency === 'yearly') {
    return 3;
  }

  return 0;
};

export const adaptTask = (task: Task): TaskValues => ({
  name: task.name,
  description: task.description || '',
  dueDate: task.date,
  time: parseApiTime(task.time),
  repeat: !!task.repeatFrequency,
  remindProvider: task.remindProvider,
  repeatModal: false,
  repeatOption: getRepeatOption(task),
  repeatWeekday: task.repeatWeekday,
  repeatMonthDay: task.repeatMonthDay,
  repeatMonth: task.repeatMonth,
});

export const getRepeatDetails = (values: TaskValues) => {
  if (values.repeatOption === 0) {
    return I18n.t('tasks.repeat.everyday');
  }

  if (values.repeatOption === 1) {
    return I18n.t('tasks.repeat.everyWeekday', { day: values.repeatWeekday });
  }

  if (values.repeatOption === 2) {
    const date = formatRepeatDate(values.repeatMonthDay!);

    return I18n.t('tasks.repeat.everyMonth', { date });
  }

  if (values.repeatOption === 3) {
    const month = MONTHS.find((m) => m.value === values.repeatMonth);
    const date = formatRepeatDate(values.repeatMonthDay!);

    return I18n.t('tasks.repeat.everyYear', { month: month?.name, date });
  }

  if (values.repeatOption === 4) {
    const days = values.repeatWeekday?.join(', ');

    return I18n.t('tasks.repeat.everyWeek', { days });
  }
};
