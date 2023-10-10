import { Api, LIMIT } from 'api/api';
import { PaginationRequest } from 'types/api';
import { ApiResponse, PageableApiResponse } from 'types/api';
import { IAppointment, IAppointmentsRequest } from 'types/appointments';
import { Estimate } from 'types/estimates';
import { Invoice } from 'types/invoices';
import { PaymentPreview } from 'types/payments';
import { Sale } from 'types/sales';
import {
  GetBlockedProvidersRequest,
  IProvider,
  IProviderPublicProfile,
  ISearchProvidersRequest,
} from 'types/users';

const getProvider = (id: number): ApiResponse<IProviderPublicProfile> =>
  Api.get(`/provider/${id}`);

const blockProvider = (id: number): ApiResponse<void> =>
  Api.post(`/blocked-provider`, {
    isBlocked: true,
    providerId: id,
  });

const unBlockProvider = (id: number): ApiResponse<void> =>
  Api.delete(`/blocked-provider/${id}`);

const getBlockedProviders = (params: GetBlockedProvidersRequest): ApiResponse<IProviderPublicProfile> =>
  Api.get(`/blocked-provider?query=${params?.query}`);

const getProviderClosedDays = (
  id: number,
): ApiResponse<IProviderPublicProfile> =>
  Api.get(`/provider/${id}/closed-days`);

const getAppointments = ({
  id,
  offset,
}: IAppointmentsRequest): PageableApiResponse<IAppointment[]> =>
  Api.get(`/provider/${id}/appointments?&offset=${offset}&limit=${LIMIT}`);

const getScheduledAppointments = ({
  id,
  offset,
}: IAppointmentsRequest): PageableApiResponse<IAppointment[]> =>
  Api.get(`/provider/${id}/appointments?&offset=${offset}&limit=${LIMIT}`);


const getInvoices = ({
  id,
  ...params
}: PaginationRequest): PageableApiResponse<Invoice[]> =>
  Api.get(`/provider/${id}/invoices`, { params });

const getEstimates = ({
    id,
    ...params
  }: PaginationRequest): PageableApiResponse<Estimate[]> =>
    Api.get(`/provider/${id}/estimates`, { params });

const getSales = ({
  id,
  ...params
}: PaginationRequest): PageableApiResponse<Sale[]> =>
  Api.get(`/provider/${id}/sales`, { params });

const getPayments = ({
  id,
  ...params
}: PaginationRequest): PageableApiResponse<PaymentPreview[]> =>
  Api.get(`/provider/${id}/payments`, { params });

const refundRequestOnPayment = (id: any): ApiResponse<any> =>
  Api.patch(`/payment/refundRequest/${id}`, {
    isRefundRequest: true,
  });

const getProviders = ({
  query,
  offset,
  location,
  serviceIds,
}: ISearchProvidersRequest): PageableApiResponse<IProvider[]> =>
  Api.get('/providers', {
    params: {
      query,
      offset,
      limit: LIMIT,
      location,
      serviceIds,
    },
  });

const getClientSalesSpecials = ({
  providerIds,
}: any): ApiResponse<any> =>
  Api.get('/sale-special/clientSaleSpecials', {
    params: {
      providerIds,
    },
  });

const getProviderPlanId = (id: number): ApiResponse<any> =>
  Api.get(`/subscription/detail/${id}`);

export const ProvidersProviderApi = {
  getProvider,
  getBlockedProviders,
  getProviderClosedDays,
  getAppointments,
  getScheduledAppointments,
  getProviders,
  getInvoices,
  getEstimates,
  getSales,
  getPayments,
  refundRequestOnPayment,
  blockProvider,
  unBlockProvider,
  getClientSalesSpecials,
  getProviderPlanId,
};
