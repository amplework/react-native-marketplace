import { Weekday } from 'utils/dates';

export interface ICalendarSettings {
  timeBetweenAppointments: number;
  shouldClientConfirm: boolean;
  dayStart: string;
  dayEnd: string;
  workingDays: Weekday[];
  weekdayTimes: any[];
  lunchStart: string;
  lunchEnd: string;
  isDoubleBookingAllowed: boolean;
  remindClient: number;
}

export type CalendarSettingsValues = {
  timeBetweenAppointments: number;
  shouldClientConfirm: boolean;
  dayStart: Date;
  dayEnd: Date;
  workingDays: Weekday[];
  weekdayTimes: any[];
  lunchStart: Date;
  lunchEnd: Date;
  isDoubleBookingAllowed: boolean;
  remindClient: number;
};

export interface IClosedDays {
  id: number;
  fromDate: string;
  toDate: string | null;
  reason: string;
  description: string | null;
}

export interface ICreateClosedDaysRequest {
  fromDate: string;
  toDate: string | null;
  reason: string;
  description: string;
  shouldSendClientsNotification: boolean;
}

export interface IEditClosedDaysRequest {
  id: number;
  fromDate: string;
  toDate: string | null;
  reason: string;
  description: string;
  shouldSendClientsNotification: boolean;
}

export interface IPaymentMethod {
  id: number;
  shortName: string;
  description: string;
  isActive: boolean;
}

export type PaymentMethodValues = {
  isActive: boolean;
  shortName: string;
  description: string;
};

export interface IExpenseType {
  id: number;
  shortName: string;
  description: string;
  isActive: boolean;
}

export type ExpenseTypeValues = {
  isActive: boolean;
  shortName: string;
  description: string;
};

export type TopExpenseType = {
  id: number;
  shortName: string;
  description: string;
  total: number;
};

export type ActiveEntityRequest = {
  isActive?: boolean;
};

export type ProviderNotification =
  | 'chat messages'
  | 'appointment new requests'
  | 'appointment change requests'
  | 'appointment cancellation'
  | 'appointment reminder'
  | 'pending appointment reminder'
  | 'client checked in'
  | 'request expired reminder'
  | 'inactivity reminder'
  | 'special expired'
  | 'reward notification'
  | 'task reminder'
  | 'sale special expiration'
  | 'client birthday notification'
  | 'payment received request notification'
  | 'payment refund request notification';

export type ClientNotification =
  | 'chat messages'
  | 'appointment invitation'
  | 'appointment confirmation'
  | 'appointment change'
  | 'appointment cancellation'
  | 'appointment reminder'
  | 'new invoice'
  | 'new receipt'
  | 'closed days notification'
  | 'closed days reminder'
  | 'request expired reminder'
  | 'sale special notification'
  | 'loyalty birthday notification'
  | 'loyalty reward notification'
  | 'online payment request notification'
  | 'payment success request notification'
  | 'payment accept request notification'
  | 'payment rejected request notification';

export type NotificationService = 'push' | 'email' | 'sms';

export type NotificationSettingsOptions = Record<
  NotificationService,
  (ProviderNotification | ClientNotification)[]
>;

export type NotificationSettingsValues = {
  settings: NotificationSettingsOptions;
  reminderTime: number;
  isFromSignup?: boolean
};

export type GetNotificationSettingsResponse = {
  id: number;
  settings: NotificationSettingsOptions;
  reminderTime: number;
};

export type ReminderEntity = 'sales' | 'invoices' | 'expenses';

export type ReminderValues = {
  entity: ReminderEntity | null;
  reminderTime: number | null;
};

export type Reminder = {
  id: number;
  entity: ReminderEntity;
  reminderTime: number;
};

export type BottomMenu = {
  bottomMenuSettings: string;
};
