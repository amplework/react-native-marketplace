import { Api } from 'api';
import { ApiResponse } from 'types/api';
import { IProviderUser } from 'types/users';

const getProfile = (): ApiResponse<IProviderUser> => Api.get('/provider');

const updateProfile = (profileData: any): ApiResponse<IProviderUser> =>
  Api.put('/provider', profileData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

const updateTwitterDetails = (profileData: any): ApiResponse<IProviderUser> =>
  Api.patch('provider/updateTwitter', profileData, {
    headers: { 'Content-Type': 'application/json' },
  });

export const ProfileProviderApi = {
  getProfile,
  updateProfile,
  updateTwitterDetails
};
