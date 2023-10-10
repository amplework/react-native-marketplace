import { Api } from 'api';
import { ApiResponse } from 'types/api';
import { CalendarOverview } from 'types/appointments';

const getCalendarOverview = (date: string): ApiResponse<CalendarOverview> =>
  Api.get('/provider/calendar-overview', { params: { date } });

export const ProviderAppointmentsApi = {
  getCalendarOverview,
};
