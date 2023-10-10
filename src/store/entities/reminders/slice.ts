import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Reminder, ReminderValues } from 'types/settings';
import { findIndexById } from 'utils/array';

import { RemindersSlice } from './types';

const initialState: RemindersSlice = {
  reminders: [],
  loading: false,
  isModalOpened: false,
  reminder: null,
  addEditLoading: false,
  deleteLoading: false,
};

const reminders = createSlice({
  name: 'reminders',
  initialState,
  reducers: {
    getReminders: (state) => {
      state.loading = true;
    },
    getRemindersSuccess: (state, action: PayloadAction<Reminder[]>) => {
      state.loading = false;
      state.reminders = action.payload;
    },
    getRemindersFailure: (state) => {
      state.loading = false;
    },
    openReminderModal: (state, action: PayloadAction<Reminder | null>) => {
      state.isModalOpened = true;
      state.reminder = action.payload;
    },
    closeReminderModal: (state) => {
      state.isModalOpened = false;
      state.reminder = null;
    },
    createReminder: (state, _action: PayloadAction<ReminderValues>) => {
      state.addEditLoading = true;
    },
    createReminderSuccess: (state, action: PayloadAction<Reminder>) => {
      state.addEditLoading = false;
      state.reminders.unshift(action.payload);
    },
    createReminderFailure: (state) => {
      state.addEditLoading = false;
    },
    editReminder: (state, _action: PayloadAction<Reminder>) => {
      state.addEditLoading = true;
    },
    editReminderSuccess: (state, action: PayloadAction<Reminder>) => {
      const index = findIndexById(action.payload.id)(state.reminders);

      state.addEditLoading = false;
      state.reminders[index] = action.payload;
    },
    editReminderFailure: (state) => {
      state.addEditLoading = false;
    },
    deleteReminder: (state, _action: PayloadAction<number>) => {
      state.deleteLoading = true;
    },
    deleteReminderSuccess: (state, { payload }: PayloadAction<number>) => {
      state.deleteLoading = false;
      state.reminders = state.reminders.filter(({ id }) => id !== payload);
    },
    deleteReminderFailure: (state) => {
      state.deleteLoading = false;
    },
  },
});

export const {
  actions: {
    getReminders,
    getRemindersFailure,
    getRemindersSuccess,
    closeReminderModal,
    openReminderModal,
    createReminder,
    createReminderFailure,
    createReminderSuccess,
    editReminder,
    editReminderFailure,
    editReminderSuccess,
    deleteReminder,
    deleteReminderFailure,
    deleteReminderSuccess,
  },
  reducer: remindersReducer,
} = reminders;
