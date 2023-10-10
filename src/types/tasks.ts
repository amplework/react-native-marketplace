import { Weekday } from 'utils/dates';
import { PayloadHandlers } from 'utils/store';

export type RepeatFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

type RemindOptions = {
  remindProvider: number | null;
  repeatFrequency: RepeatFrequency | null;
  repeatWeekday: Weekday[] | null;
  repeatMonthDay: number | null;
  repeatMonth: number | null;
};

export type Task = RemindOptions & {
  id: number;
  name: string;
  description: string | null;
  date: string;
  time: string;
  isCompleted: boolean;
};

export type GetTasksRequest = {
  query?: string;
  fromDate: string;
  toDate: string;
};

export type GetTaskRequest = {
  id: number;
  date: string;
};

export type PatchCompleteStatus = {
  id: number;
  date: string;
  isCompleted: boolean;
};

export type CreateTaskRequest = RemindOptions & {
  name: string;
  description: string;
  dueDate: string | null;
  time: string;
};

export type EditTaskRequest = RemindOptions & {
  id: number;
  name: string;
  description: string;
  dueDate: string | null;
  time: string;
};

export type EditTaskPayload = PayloadHandlers & {
  values: TaskValues;
};

export type DeleteTaskPayload = PayloadHandlers & {
  id: number;
};

export type TasksReview = {
  tasks: {
    currentWeekCount: number;
    currentMonthCount: number;
  };
};

export type TaskValues = {
  name: string;
  description: string;
  dueDate: any;
  time: Date;
  repeat: boolean;
  repeatModal: boolean;
  repeatOption: number;
  remindProvider: number | null;
  repeatWeekday: Weekday[] | null;
  repeatMonthDay: number | null;
  repeatMonth: number | null;
};

export type RepeatInitialValues = {
  repeatOption: number | null;
  repeatWeekday: Weekday[] | null;
  repeatMonthDay: number | null;
  repeatMonth: number | null;
  repeatEndOptions?: number | null;
  endAfterTotalAppointment?: number | null;
  endAfterDate?: any;
};

export type RepeatValues = {
  repeatOption: number;
  weekly: Weekly;
  monthly: Monthly;
  yearly: Yearly;
  repeatEndOptions?: number;
  endAfterTotalAppointment?: number | null;
  endAfterDate?: any;
};

type Weekly = {
  day: Weekday;
  days: Weekday[];
};

type Monthly = {
  day: number;
};

type Yearly = {
  day: number;
  month: number;
};
