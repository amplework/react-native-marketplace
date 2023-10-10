import { Api, LIMIT } from 'api/api';
import { ApiResponse } from 'types/api';
import { formalizeEditSalesSpecial, formalizeSalesSpecial } from './utils';

const getSalesSpecials = (): ApiResponse<any> => Api.get('/sale-special?isQuickPromotion=false');

const getSalesSpecialById = (id: number): ApiResponse<any> => Api.get(`/sale-special/${id}`);

const getClientSalesSpecials = (offset: number): ApiResponse<any> => Api.get(`/sale-special/clientSaleSpecials`);

const getClientMoreSpecials = (): ApiResponse<any> => Api.get(`/sale-special/topSaleSpecials`);

const getSalesSpecialsByProvider = (id: number): ApiResponse<any> => Api.get(`/sale-special/provider/${id}/getSaleSpecials`);

const addSaleSpecial = async (saleSpecial: any): ApiResponse<any> => {
  const data = formalizeSalesSpecial(saleSpecial);
  return Api.post('/sale-special', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
};

const editSaleSpecial = async (id: number, saleSpecial: any): ApiResponse<any> => {
  const data = formalizeEditSalesSpecial(saleSpecial);
  return Api.put(`/sale-special/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
};

const updateSaleSpecial = (data: any): ApiResponse<any> => Api.patch(`/sale-special/${data?.id}`, { isSocial: data?.isSocial });

const deleteSaleSpecial = async (id: number): ApiResponse<any> =>
  Api.delete(`/sale-special/${id}`);

export const SalesSpecialApi = {
  getSalesSpecials,
  getSalesSpecialById,
  getClientSalesSpecials,
  getClientMoreSpecials,
  getSalesSpecialsByProvider,
  addSaleSpecial,
  editSaleSpecial,
  deleteSaleSpecial,
  updateSaleSpecial
};