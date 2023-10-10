import { t, translations } from 'locales';
import moment, { unitOfTime } from 'moment-timezone';

type DateInput = Date | string | number | moment.Moment;

export type Weekday =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export const DATE_FORMATS = {
  time: 'hh:mm A',
  apiTime: 'HH:mm',
  date: 'Do MMM YYYY',
  apiDate: 'YYYY-MM-DD',
  shortDate: 'Do MMM',
  fileDate: 'MM-DD-YYYY',
  datetime: 'hh:mm A, Do MMM yyyy',
  month: 'MMMM yyyy',
  year: 'yyyy',
};

export const formatTime = (
  date: DateInput,
  { format = '', utc = false } = {},
) =>
  utc
    ? moment.utc(date, format).local().format(DATE_FORMATS.time)
    : moment(date, format).format(DATE_FORMATS.time);

export const formatApiTime = (
  date: DateInput,
  { format = DATE_FORMATS.apiTime, utc = false } = {},
) =>
  utc
    ? moment.utc(date, format).local().format(format)
    : moment(date).format(format);

export const parseDate = (date?: DateInput) => {
  const parsedDate = new Date();
  const d = moment(date);

  parsedDate.setFullYear(d.get('year'));
  parsedDate.setMonth(d.get('month'));
  parsedDate.setDate(d.get('date'));
  parsedDate.setHours(d.get('hours'));
  parsedDate.setMinutes(d.get('minutes'));

  return parsedDate;
};

export const constructDate = (
  year: number,
  month: number,
  date: number,
  hours: number,
  minutes: number,
) => {
  const constructedDate = new Date();
  const d = moment({ year, month, date, hours, minutes });

  constructedDate.setFullYear(d.get('year'));
  constructedDate.setMonth(d.get('month'));
  constructedDate.setDate(d.get('date'));
  constructedDate.setHours(d.get('hours'));
  constructedDate.setMinutes(d.get('minutes'));

  return constructedDate;
};

export const parseApiTime = (date: DateInput) => {
  const parsedDate = moment().toDate();
  const d = moment.utc(date, DATE_FORMATS.apiTime);

  parsedDate.setHours(d.get('hours'));
  parsedDate.setMinutes(d.get('minutes'));

  return parsedDate;
};

export const formatDate = (date: DateInput, { utc = true } = {}) =>
  moment.tz(date, utc ? 'Etc/UTC' : 'AlphaProUser').format(DATE_FORMATS.date);

export const dateWithoutTz = (date: any, offset: any) =>
  moment(date).endOf('day').utcOffset(offset).toISOString();

export const dateFormatWithoutTz = (date: any) =>
  moment(date, 'YYYY-MM-DD').format('Do MMM YYYY');

export const timeFormatWithoutTz = (date: any) =>
  moment(date, 'YYYY-MM-DD').format('HH:mm');

export const closeDaysFormatWithoutTz = (date: any) =>
  moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');

export const utcDate = (date: DateInput) =>
  moment.utc(date).local().format(DATE_FORMATS.date);

export const formatApiDate = (date: DateInput) =>
  moment(date).format(DATE_FORMATS.apiDate);

export const formatServerDate = (date: any) =>
  moment(date).format(DATE_FORMATS.date);

export const closedDayRange = (fromDate: any, toDate: any) =>
  formatServerDate(fromDate) + (toDate ? ' - ' + formatServerDate(toDate) : '');

export const formatFileDate = (date: DateInput) =>
  moment.tz(date, 'Etc/UTC').format(DATE_FORMATS.fileDate);

export const formatDatetime = (date: DateInput) =>
  moment(date).format(DATE_FORMATS.datetime);

type FormatFn = (date: DateInput) => string;

type Range = {
  from: DateInput;
  to?: DateInput | null;
};

export const range = (format: FormatFn, { from, to }: Range) =>
  to ? `${format(from)} - ${format(to)}` : format(from);

const add =
  (amount: number, unit: unitOfTime.DurationConstructor) => (date: DateInput) =>
    moment(date).add(amount, unit).toDate();

const isSame = (unit: unitOfTime.StartOf) => (a: DateInput, b: DateInput) =>
  moment(a).isSame(b, unit);

// TODO: change for minutes
const isSameOrAfter =
  (unit: unitOfTime.StartOf) => (a: DateInput, b: DateInput) =>
    moment.tz(a, 'Etc/UTC').isSameOrAfter(b, unit);

const isSameOrBefore =
  (unit: unitOfTime.StartOf) => (a: DateInput, b: DateInput) =>
    moment(a).isSameOrBefore(b, unit);

export const minutes = {
  add: (date: DateInput, amount: number) => add(amount, 'minutes')(date),
  increment: add(1, 'minutes'),
  decrement: add(-1, 'minutes'),
  isSame: isSame('minutes'),
  isSameOrAfter: isSameOrAfter('minutes'),
};

export const days = {
  increment: add(1, 'days'),
  decrement: add(-1, 'days'),
  isSame: isSame('days'),
  isSameOrAfter: isSameOrAfter('days'),
  isSameOrBefore: isSameOrBefore('days'),
};

export const weeks = {
  increment: add(1, 'weeks'),
  decrement: add(-1, 'weeks'),
};

export const months = {
  increment: add(1, 'months'),
  decrement: add(-1, 'months'),
};

export const years = {
  increment: add(1, 'years'),
  decrement: add(-1, 'years'),
};

// TODO: test
export const isToday = (date: DateInput) => moment().isSame(date, 'day');

export const isBefore = (a: DateInput, b: DateInput) => moment(a).isBefore(b);

export const isCurrentWeek = (date: string) => moment().isSame(date, 'week');

export const isCurrentMonth = (date: string) => moment().isSame(date, 'month');

export const getStartOfWeek = (date?: DateInput) =>
  moment(date).startOf('week').toDate();

export const getEndOfWeek = (date?: DateInput) =>
  moment(date).endOf('week').toDate();

export const getStartOfMonth = (date?: DateInput) =>
  moment(date).startOf('month').toDate();

export const getEndOfMonth = (date?: DateInput) =>
  moment(date).endOf('month').toDate();

export const getStartOfYear = (date?: DateInput) =>
  moment(date).startOf('year').toDate();

export const getEndOfYear = (date?: DateInput) =>
  moment(date).endOf('year').toDate();

export const getWeekday = (date?: DateInput) =>
  moment(date).format('dddd').toLowerCase() as Weekday;

export const getDay = (date?: DateInput) => moment(date).format('D');

export const getMonth = (date?: DateInput) => moment(date).format('M');

export const getDaysInMonth = (month: number, year = moment().year()) =>
  moment(`${year}-${month}`, 'YYYY-MM').daysInMonth();

export const utcOffset = () => moment().utcOffset();

export const isSubscriptionExpired = (date: DateInput) =>
  Number(date) < Math.round(moment().valueOf());

export const formatRangeDate = (start: Date, end: Date, format = 'Do MMM') =>
  `${moment(start).format(format)} - ${moment(end).format('Do MMM YYYY')}`;

export const getDifference = (
  date: DateInput,
  unit: unitOfTime.Base = 'days',
) => moment().diff(date, unit);

export type DateRange = {
  fromDate: Date;
  toDate: Date;
};

export type SmallDateRange = 'week' | 'month';

export type LargeDateRange = SmallDateRange | 'year';

export const getTime = (date: DateInput | number | any) => new Date(date).getTime();

export const todayOrDate = (date: DateInput, { prefix = '' } = {}) => {
  if (isToday(date)) {
    return t(translations.common.today).toLowerCase();
  }
  return prefix ? `${prefix} ${moment(date).format('Do MMM YYYY')}` : moment(date).format('Do MMM YYYY');
  // return prefix ? `${prefix} ${formatDate(date)}` : formatDate(date);
};
