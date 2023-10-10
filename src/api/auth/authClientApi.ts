import { Api } from 'api';
import { ApiResponse } from 'types/api';

const signUp = (userData: any): ApiResponse<void> =>
  Api.post('/client', userData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const AuthClientApi = {
  signUp,
};
