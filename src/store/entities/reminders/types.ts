import { Reminder } from 'types/settings';

export type RemindersState = {
  reminders: RemindersSlice;
};

export type RemindersSlice = {
  reminders: Reminder[];
  loading: boolean;
  isModalOpened: boolean;
  reminder: Reminder | null;
  addEditLoading: boolean;
  deleteLoading: boolean;
};
