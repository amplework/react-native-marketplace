import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CalendarSettingsValues, ICalendarSettings } from 'types/settings';
import { DAYS_SCHEDULE } from 'utils/constants';
import { parseApiTime, parseDate } from 'utils/dates';

import { CalendarSetup } from './types';

const initialState: CalendarSetup = {
  settings: {
    timeBetweenAppointments: 0,
    shouldClientConfirm: true,
    dayStart: parseDate().toISOString(),
    dayEnd: parseDate().toISOString(),
    workingDays: [],
    weekdayTimes: [],
    lunchStart: parseDate().toISOString(),
    lunchEnd: parseDate().toISOString(),
    isDoubleBookingAllowed: false,
    remindClient: 60,
  },
  loading: false,
  dayScheduleList: DAYS_SCHEDULE,
  selectedDays: [],
};

const calendarSetup = createSlice({
  name: 'calendarSetup',
  initialState,
  reducers: {
    getCalendarSettings: (state) => {
      state.loading = true;
    },
    getCalendarSettingsSuccess: (
      state,
      action: PayloadAction<ICalendarSettings>,
    ) => {
      const selectedWeekDaysList = action.payload?.weekdayTimes;
      const defaultDayStart = action.payload?.dayStart;
      const defaultDayEnd = action.payload?.dayEnd;

      const formattedList = selectedWeekDaysList.map((day: any) => ({
        ...day,
        startTime: parseApiTime(day?.startTime),
        endTime: parseApiTime(day?.endTime),
      }));
      const updatedData = state.dayScheduleList.map((day: any) => {
        const matchingDatabaseDay = formattedList.find(
          (dbDay: any) => dbDay.weekDay === day.weekDay,
        );
        if (matchingDatabaseDay) {
          return Object.assign({}, day, matchingDatabaseDay);
        }
        return {
          ...day,
          startTime: parseApiTime(defaultDayStart),
          endTime: parseApiTime(defaultDayEnd),
        };
      });

      state.loading = false;
      state.settings = action.payload;
      state.selectedDays = formattedList;
      state.dayScheduleList = updatedData;
    },
    getCalendarSettingsFailure: (state) => {
      state.loading = false;
    },
    updateCalendarSettings: (
      state,
      _action: PayloadAction<CalendarSettingsValues>,
    ) => {
      state.loading = true;
    },
    updateCalendarSettingsSuccess: (
      state,
      action: PayloadAction<ICalendarSettings>,
    ) => {
      state.loading = false;
      state.settings = action.payload;
    },
    updateCalendarSettingsFailure: (state) => {
      state.loading = false;
    },
    setDayScheduleList: (state, action: PayloadAction<any>) => {
      state.dayScheduleList = action.payload;
    },
    setSelectedDays: (state, action: PayloadAction<any>) => {
      state.selectedDays = action.payload;
    },
  },
});

export const {
  actions: {
    getCalendarSettings,
    getCalendarSettingsFailure,
    getCalendarSettingsSuccess,
    updateCalendarSettings,
    setDayScheduleList,
    setSelectedDays,
    updateCalendarSettingsFailure,
    updateCalendarSettingsSuccess,
  },
  reducer: calendarSetupReducer,
} = calendarSetup;
