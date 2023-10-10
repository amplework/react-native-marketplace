import { Api } from 'api';
import { ApiResponse } from 'types/api';
import {
  ActiveEntityRequest,
  BottomMenu,
  ExpenseTypeValues,
  GetNotificationSettingsResponse,
  IExpenseType,
  NotificationSettingsValues,
  Reminder,
  ReminderValues,
} from 'types/settings';
import {
  ICalendarSettings,
  IClosedDays,
  ICreateClosedDaysRequest,
  IPaymentMethod,
  PaymentMethodValues,
} from 'types/settings';

const getCalendarSettings = (): ApiResponse<ICalendarSettings> =>
  Api.get('/provider/settings/calendar');

const updateCalendarSettings = (
  settings: ICalendarSettings,
): ApiResponse<ICalendarSettings> => Api.put('/provider/settings/calendar', settings);

const getClosedDays = (): ApiResponse<IClosedDays[]> =>
  Api.get('/provider/settings/closed-days');

const createClosedDays = (
  data: ICreateClosedDaysRequest,
): ApiResponse<IClosedDays> => Api.post('/provider/settings/closed-days', data);

const editClosedDays = (
  id: number,
  data: ICreateClosedDaysRequest,
): ApiResponse<void> => Api.put(`/provider/settings/closed-days/${id}`, data);

const deleteClosedDays = (id: number): ApiResponse<void> =>
  Api.delete(`/provider/settings/closed-days/${id}`);

const getPaymentMethods = (
  params?: ActiveEntityRequest,
): ApiResponse<IPaymentMethod[]> =>
  Api.get('/provider/settings/payment-methods', { params });

const createPaymentMethod = (
  data: PaymentMethodValues,
): ApiResponse<IPaymentMethod> =>
  Api.post('/provider/settings/payment-method', data);

const editPaymentMethod = ({
  id,
  ...data
}: IPaymentMethod): ApiResponse<IPaymentMethod> =>
  Api.put(`/provider/settings/payment-method/${id}`, data);

const deletePaymentMethod = (id: number): ApiResponse<void> =>
  Api.delete(`/provider/settings/payment-method/${id}`);

const getExpenseTypes = (params?: ActiveEntityRequest): ApiResponse<void> =>
  Api.get('/provider/settings/expense-types', { params });

const createExpenseType = (
  data: ExpenseTypeValues,
): ApiResponse<IExpenseType> =>
  Api.post('/provider/settings/expense-type', data);

const editExpenseType = ({
  id,
  ...data
}: IExpenseType): ApiResponse<IExpenseType> =>
  Api.put(`/provider/settings/expense-type/${id}`, data);

const deleteExpenseType = (id: number): ApiResponse<void> =>
  Api.delete(`/provider/settings/expense-type/${id}`);

const editInvoiceNotes = (invoiceNotes: string) =>
  Api.put('/provider/settings/invoice-notes', { invoiceNotes });

const getNotificationSettings =
  (): ApiResponse<GetNotificationSettingsResponse> =>
    Api.get('/notification-settings');

const updateNotificationSettings = ({
  settings,
  reminderTime,
}: NotificationSettingsValues): ApiResponse<GetNotificationSettingsResponse> =>
  Api.put('/notification-settings', { settings, reminderTime });

const getReminders = (): ApiResponse<Reminder[]> => Api.get('/reminders');

const createReminder = (reminder: ReminderValues): ApiResponse<Reminder> =>
  Api.post('/reminder', reminder);

const editReminder = ({ id, ...reminder }: Reminder): ApiResponse<Reminder> =>
  Api.put(`/reminder/${id}`, reminder);

const deleteReminder = (id: number): ApiResponse<void> =>
  Api.delete(`/reminder/${id}`);

const editBottomMenuSettings = (data: BottomMenu): ApiResponse<void> =>
  Api.put('/provider/settings/profile', { settings: data });

export const SettingsProviderApi = {
  getCalendarSettings,
  updateCalendarSettings,
  getClosedDays,
  createClosedDays,
  editClosedDays,
  deleteClosedDays,
  getPaymentMethods,
  createPaymentMethod,
  editPaymentMethod,
  deletePaymentMethod,
  getExpenseTypes,
  createExpenseType,
  editExpenseType,
  deleteExpenseType,
  editInvoiceNotes,
  getNotificationSettings,
  updateNotificationSettings,
  getReminders,
  createReminder,
  editReminder,
  deleteReminder,
  editBottomMenuSettings,
};
