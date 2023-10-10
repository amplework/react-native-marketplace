import moment from 'moment';
import { formatDate } from 'utils/dates';

export const formatTasksRangeDate = (start: Date, end: Date) =>
  `${moment(start).format('Do MMM')} - ${moment(end).format('Do MMM YYYY')}`;
