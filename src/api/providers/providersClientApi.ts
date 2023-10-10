import { Api, LIMIT } from 'api';
import { ApiResponse, PageableApiResponse } from 'types/api';
import { GetProvidersRequest, IProvider } from 'types/users';

const getProviders = ({
  offset = 0,
  query,
}: GetProvidersRequest): PageableApiResponse<IProvider[]> =>
  Api.get('/client/providers', {
    params: {
      query,
      offset,
      limit: LIMIT,
    },
  });

const shortlistProvider = (id: number): ApiResponse<void> =>
  Api.put(`/client/provider/${id}/shortlist`);

const unshortlistProvider = (id: number): ApiResponse<void> =>
  Api.delete(`/client/provider/${id}/shortlist`);

export const ProvidersClientApi = {
  getProviders,
  shortlistProvider,
  unshortlistProvider,
};
