import moment from 'moment';
import { IClosedDays } from 'types/settings';
import { closeDaysFormatWithoutTz, parseDate } from 'utils/dates';

import { pickTimeSlotStyles as S } from '../style';

type SlotsParams = {
  start: string;
  end: string;
  duration: number;
  interval: number;
};

const dateStyles = {
  dateNameStyle: S.dateNameStyle,
  dateNumberStyle: S.dateNumberStyle,
  dateContainerStyle: S.closedDateContainer,
};

export const getFormattedClosedDays = (closedDays: IClosedDays[]) =>
  closedDays.map(({ fromDate, toDate }) => ({
    startDate: moment(fromDate).format(''),
    endDate: toDate ? moment(toDate).format('') : moment(fromDate).format(''),
    ...dateStyles,
  }));

export const getSlots = ({
  start,
  end,
  duration,
  interval,
}: SlotsParams) => {
  const startTime = moment(start);
  const startSlotTime = moment(start);
  const endTime = moment(end);
  const endSlotTime = moment(start).add(duration, 'm');
  const result = [];

  while (
    startSlotTime.isBetween(startTime, endTime, undefined, '[]') &&
    endSlotTime.isBetween(startTime, endTime, undefined, '[]')
  ) {
    result.push({
      startTime: startSlotTime.toString(),
      endTime: endSlotTime.toString(),
    });

    startSlotTime.add(duration + interval, 'm');
    endSlotTime.add(duration + interval, 'm');
  }

  return result;
};
