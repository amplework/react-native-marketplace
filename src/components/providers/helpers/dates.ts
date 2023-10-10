import moment from 'moment';
import { IClosedDays } from 'types/settings';
import { IProviderCalendarSettings } from 'types/users';
import { getWeekday, utcOffset } from 'utils/dates';

export const parseWorkingTime = (date: string, dateUtcOffset: number) =>
  moment(date, 'HH:mm')
    .add(utcOffset() - dateUtcOffset, 'minutes')
    .toDate();

const isActiveDaysRange = (start: string, end: string | null) =>
  end
    ? moment().isBetween(start, end, 'days', '[]')
    : moment().isSame(start, 'days');

interface WorkDetails {
  calendarSettings: IProviderCalendarSettings;
  closedDays: IClosedDays[];
}

export const checkWorkStatus = ({
  calendarSettings,
  closedDays,
}: WorkDetails) => {

  const dayStart = calendarSettings?.dayStart || '';  
  const dayEnd = calendarSettings?.dayEnd || '';
  const workingDays = calendarSettings?.workingDays;
  const providerUtcOffset = calendarSettings?.utcOffset;

  const today = getWeekday();
  const start = parseWorkingTime(dayStart, providerUtcOffset);
  const end = parseWorkingTime(dayEnd, providerUtcOffset);

  const isWorkingNow = moment().isBetween(start, end, 'minutes', '[]');
  const isWorkingDay = workingDays?.includes(today) || [];
  const isClosedDay = closedDays?.some(({ fromDate, toDate }) =>
    isActiveDaysRange(fromDate, toDate),
  );

  return isWorkingNow && isWorkingDay && !isClosedDay;
};
