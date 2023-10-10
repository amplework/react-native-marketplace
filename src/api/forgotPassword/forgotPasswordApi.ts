import { Api } from 'api';
import { ApiResponse } from 'types/api';
import { ResetPasswordRequest } from 'types/auth';

const sendResetEmail = (email: string): ApiResponse<void> =>
  Api.post('/user/forgot-password', { email });

const resetPassword = (data: ResetPasswordRequest): ApiResponse<void> =>
  Api.put('/user/reset-password', data);

export const ForgotPasswordApi = {
  sendResetEmail,
  resetPassword,
};
