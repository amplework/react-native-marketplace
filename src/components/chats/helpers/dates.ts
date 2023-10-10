import moment from 'moment-timezone';
import { formatTime, isToday } from 'utils/dates';

export const formatChatDate = (date: Date) =>
  isToday(date)
    ? formatTime(date)
    : moment.tz(date, 'Etc/UTC').format('Do MMM');
