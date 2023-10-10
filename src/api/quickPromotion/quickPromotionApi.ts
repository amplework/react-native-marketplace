import { Api, LIMIT } from 'api/api';
import { ApiResponse } from 'types/api';
import { formalizQuickPromotion, formalizeEditQuickPromotion } from './utils';

const getQuickPromotions = (): ApiResponse<any> => Api.get('/sale-special?isQuickPromotion=true');

const getQuickPromotionById = (id: number): ApiResponse<any> => Api.get(`/sale-special/${id}`);

const getQuickPromotionsByProvider = (id: number): ApiResponse<any> => Api.get(`/sale-special/provider/${id}/getSaleSpecials`);

const addQuickPromotion = async (saleSpecial: any): ApiResponse<any> => {
  const data = formalizQuickPromotion(saleSpecial);  
  return Api.post('/sale-special', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const editQuickPromotion = async (id: number, saleSpecial: any): ApiResponse<any> => {
  const data = formalizeEditQuickPromotion(saleSpecial);
  console.log("formalize promo edit data +++ >>> ",id,  data);
  
  return Api.put(`/sale-special/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const deleteQuickPromotion = async (id: number): ApiResponse<any> =>
  Api.delete(`/sale-special/${id}`);

export const QuickPromotionApi = {
  getQuickPromotions,
  getQuickPromotionById,
  getQuickPromotionsByProvider,
  addQuickPromotion,
  editQuickPromotion,
  deleteQuickPromotion,
};