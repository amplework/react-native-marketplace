import moment from 'moment-timezone';
import { DATE_FORMATS, LargeDateRange } from 'utils/dates';

export const formatPerformanceReviewRange = (
  period: LargeDateRange,
  date: moment.Moment,
) => {
  if (period === 'week') {
    const startOfWeek = date.startOf('week').format(DATE_FORMATS.shortDate);
    const endOfWeek = date.endOf('week').format(DATE_FORMATS.date);

    return `${startOfWeek} - ${endOfWeek}`;
  }

  if (period === 'month') {
    return date.format(DATE_FORMATS.month);
  }

  if (period === 'year') {
    return date.format(DATE_FORMATS.year);
  }
};
