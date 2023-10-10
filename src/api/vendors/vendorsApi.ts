import { Api } from 'api';
import { ApiResponse } from 'types/api';
import {
  EditVendorRequest,
  GetVendorRequest,
  GetVendorsRequest,
  VendorsReview,
  VendorValues,
} from 'types/vendors';

const getVendors = (params: GetVendorsRequest): ApiResponse<void> =>
  Api.get('/vendors', { params });

const getVendor = ({ id }: GetVendorRequest): ApiResponse<void> =>
  Api.get(`/vendor/${id}`);

const createVendor = (data: VendorValues): ApiResponse<void> =>
  Api.post('/vendor', data);

const editVendor = ({ id, ...data }: EditVendorRequest): ApiResponse<void> =>
  Api.put(`/vendor/${id}`, data);

const deleteVendor = (id: number): ApiResponse<void> =>
  Api.delete(`/vendor/${id}`);

const getVendorsReview = (): ApiResponse<VendorsReview> =>
  Api.get('/vendors/review');

export const VendorsApi = {
  getVendors,
  getVendor,
  createVendor,
  editVendor,
  deleteVendor,
  getVendorsReview,
};
