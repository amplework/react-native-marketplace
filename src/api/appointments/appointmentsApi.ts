import { Api, LIMIT } from 'api';
import { ApiResponse, EditRequest } from 'types/api';
import { AppointmentRequest, PartialAppointment } from 'types/appointments';
import { IIndustry } from 'types/industries';

const getAppointments = (action: any): ApiResponse<IIndustry[]> =>
  Api.get('/appointments', {
    params: {
      limit: action?.limit || LIMIT,
      offset: action?.offset || 0,
      query: action?.query,
      fromDate: action?.fromDate,
      toDate: action?.toDate,
      clientId: action?.clientId,
      productId: action?.productId,
      status: action?.status,
      isUpcoming: action?.isUpcoming,
      order: action?.order,
    },
  });

const getScheduledAppointments = (action: any): ApiResponse<IIndustry[]> =>
  Api.get('/scheduledAppointments', {
    params: {
      limit: action?.limit || LIMIT,
      fromDate: action?.fromDate,
      status: action?.status,
      order: action?.order,
    },
  });

const getAppointmentsPending = (action: any): ApiResponse<IIndustry[]> =>
  Api.get('/appointments/pending', {
    params: {
      limit: action?.limit || LIMIT,
      offset: action?.offset || 0,
    },
  });

const checkClosedDays = (action: any): ApiResponse<any> =>
  Api.get('/appointment/checkCloseDay', {
    params: {
      date: action?.date,
      providerId: action?.providerId,
    },
  });

const getAppointmentSlots = (action: any): ApiResponse<IIndustry[]> =>
  Api.get('/appointment/slots', {
    params: {
      date: action?.date,
      providerId: action?.providerId,
      duration: action?.duration,
    },
  });

const getAppointmentsReview = (): ApiResponse<IIndustry[]> =>
  Api.get('/appointments/review');

const getAppointment = (id: number): ApiResponse<IIndustry[]> =>
  Api.get(`/appointment/${id}`);

const getIntersection = (id: number): ApiResponse<IIndustry[]> =>
  Api.get(`/appointment/${id}/intersection`);

const createAppointment = (appointment: any): ApiResponse<IIndustry[]> =>
  Api.post('/appointment', appointment);

const createAppointmentRequest = (
  appointment: any,
): ApiResponse<PartialAppointment> =>
  Api.post('/appointment/request', appointment);

const updateAppointment = ({
  data,
  id,
}: EditRequest<AppointmentRequest>): ApiResponse<IIndustry[]> =>
  Api.put(`/appointment/${id}`, data);

const deleteAppointment = (id: number): ApiResponse<IIndustry[]> =>
  Api.delete(`/appointment/${id}`);

const confirmAppointment = (id: number): ApiResponse<IIndustry[]> =>
  Api.patch(`/appointment/${id}/confirm`);

const checkInAppointment = (id: number): ApiResponse<IIndustry[]> =>
  Api.patch(`/appointment/${id}/check-in`);

const readyForClient = (payload: any): ApiResponse<any> =>
  Api.get(
    `/sendAppointmentMessage/${payload?.id}?appointmentId=${payload?.appointmentId}`,
  );

export const AppointmentsApi = {
  getAppointments,
  getIntersection,
  getAppointmentsPending,
  getAppointmentSlots,
  getAppointmentsReview,
  getAppointment,
  getScheduledAppointments,
  createAppointment,
  createAppointmentRequest,
  updateAppointment,
  deleteAppointment,
  confirmAppointment,
  checkInAppointment,
  readyForClient,
  checkClosedDays,
};
