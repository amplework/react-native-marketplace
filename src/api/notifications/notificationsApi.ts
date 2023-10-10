import { Api } from 'api';
import { ApiResponse } from 'types/api';
import {
  GetNotificationsPayload,
  GetNotificationsResponse,
  NewStatusResponse,
} from 'types/notifications';
import { isIOS } from 'utils/device';

const getNotifications = (
  params: GetNotificationsPayload,
): ApiResponse<GetNotificationsResponse> =>
  Api.get('/notifications', { params });

const readNotification = (id: number): ApiResponse<void> =>
  Api.post(`/notifications/read/${id}`);

const saveToken = (token: string): ApiResponse<void> =>
  Api.post('/notification/device-token', { token, isIOS: false });

const deleteToken = (token: string): ApiResponse<void> =>
  Api.delete(`/notification/${token}`);

const getNotificationsStatus = (): ApiResponse<NewStatusResponse> =>
  Api.get('/notifications/new-status');

export const NotificationsApi = {
  getNotifications,
  readNotification,
  saveToken,
  deleteToken,
  getNotificationsStatus,
};
