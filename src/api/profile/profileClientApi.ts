import { Api } from 'api';
import { ApiResponse } from 'types/api';
import { IClientUser } from 'types/users';

const getProfile = (): ApiResponse<IClientUser> => Api.get('/client');

const updateProfile = (profileData: any): ApiResponse<IClientUser> =>
  Api.put('/client', profileData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

const updateAddress = (address: any): ApiResponse<IClientUser> =>
  Api.put('/client/address', address);

export const ProfileClientApi = {
  getProfile,
  updateProfile,
  updateAddress,
};
