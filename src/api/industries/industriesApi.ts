import { Api } from 'api';
import { ApiResponse } from 'types/api';
import { IIndustry } from 'types/industries';

const getIndustries = (): ApiResponse<IIndustry[]> => Api.get('/industries');

export const IndustriesApi = {
  getIndustries,
};
