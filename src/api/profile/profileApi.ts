import { Api } from 'api/api';
import { ApiResponse } from 'types/api';
import { IUpdatePasswordRequest } from 'types/users';

const updatePassword = (
  credentials: IUpdatePasswordRequest,
): ApiResponse<void> => Api.patch('/user/password', credentials);

export const ProfileApi = {
  updatePassword,
};
