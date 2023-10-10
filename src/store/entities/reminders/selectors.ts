import { RemindersState } from './types';

const all = (state: RemindersState) => state.reminders;

const reminders = (state: RemindersState) => all(state).reminders;

const loading = (state: RemindersState) => all(state).loading;

const isModalOpened = (state: RemindersState) => all(state).isModalOpened;

const reminder = (state: RemindersState) => all(state).reminder;

const addEditLoading = (state: RemindersState) => all(state).addEditLoading;

const deleteLoading = (state: RemindersState) => all(state).deleteLoading;

export const remindersSelectors = {
  reminders,
  loading,
  isModalOpened,
  reminder,
  addEditLoading,
  deleteLoading,
};
