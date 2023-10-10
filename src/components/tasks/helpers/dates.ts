import I18n from 'locales';
import moment, { Moment } from 'moment';
import { formatDate } from 'utils/dates';

export const formatTasksRangeDate = (start: Moment, end: Moment) =>
  `${start.format('Do MMM')} - ${end.format('Do MMM YYYY')}`;

export const formatRepeatDate = (day: number) => {
  if (day === -1) {
    return I18n.t('tasks.lastDay');
  }

  const formattedDate = moment(day, 'D').format('Do');
  const date = formattedDate === 'Invalid date' ? `${day}th` : formattedDate;

  return I18n.t('tasks.day', { day: date });
};
