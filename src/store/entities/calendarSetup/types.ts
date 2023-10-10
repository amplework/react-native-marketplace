import { ICalendarSettings } from 'types/settings';
import { DaysSchedule } from 'utils/constants';

export type CalendarSetupState = {
  calendarSetup: CalendarSetup;
};

export type CalendarSetup = {
  settings: ICalendarSettings;
  loading: boolean;
  dayScheduleList: DaysSchedule[];
  selectedDays: DaysSchedule[];
};
