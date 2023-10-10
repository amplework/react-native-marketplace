import { CalendarSetupState } from './types';

const all = (state: CalendarSetupState) => state.calendarSetup;

const settings = (state: CalendarSetupState) => all(state).settings;

const loading = (state: CalendarSetupState) => all(state).loading;

const dayScheduleList = (state: CalendarSetupState) =>
  all(state).dayScheduleList;

const selectedDaysList = (state: CalendarSetupState) => all(state).selectedDays;

export const calendarSetupSelectors = {
  settings,
  loading,
  dayScheduleList,
  selectedDaysList,
};
