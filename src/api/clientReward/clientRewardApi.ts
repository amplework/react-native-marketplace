import { Api } from 'api';
import { ApiResponse } from 'types/api';

const getClientReward = (type: string): ApiResponse<any> =>
  Api.get(`/loyalty/getLoyalty/${type}`);

const createClientReward = (
  data: any,
): ApiResponse<any> => Api.post('/loyalty', data);

const updateClientReward = (
  data: any,
  id: number
): ApiResponse<any> => Api.put(`/loyalty/${id}`, data);

export const ClientRewardApi = {
  getClientReward,
  createClientReward,
  updateClientReward,
};
