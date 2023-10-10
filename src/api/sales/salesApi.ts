import { Api } from 'api/api';
import { ApiResponse, ShareEmailRequest } from 'types/api';
import {
  CreateSaleRequest,
  GetSalesRequest,
  Sale,
  SalesReview,
  SalesSuccess,
} from 'types/sales';

const getSales = (params: GetSalesRequest): ApiResponse<SalesSuccess> =>
  Api.get('/sales', {
    params: {
      fromDate: params?.fromDate,
      toDate: params?.toDate,
      limit: params?.limit,
      offset: params?.offset,
      query: params?.query,
      clientSubprofileId: params?.clientSubprofileId,
      paymentMethodId: params?.paymentMethodId,
    },
  });

const createSale = async (sale: CreateSaleRequest): ApiResponse<Sale> =>
  Api.post('/sale', sale);

const editSale = async (sale: CreateSaleRequest): ApiResponse<Sale> =>
  Api.put(`/sale/${sale.id}`, sale);

const detailsSale = async (id: number): ApiResponse<Sale> =>
  Api.get(`/sale/${id}`);

const deleteSale = async (id: number): ApiResponse<void> =>
  Api.delete(`/sale/${id}`);

const updateSale = async (sale: Sale, id: number): ApiResponse<Sale> =>
  Api.put(`/sale/${id}`, sale);

const shareSaleEmailReceipt = async ({
  id,
  email,
}: ShareEmailRequest): ApiResponse<void> =>
  Api.post(`/sale/${id}/client-share-receipt`, { email });

const shareSaleEmailReceiptProvider = async ({
  id,
  email,
}: ShareEmailRequest): ApiResponse<void> =>
  Api.post(`/sale/${id}/share-receipt`, { email });

const salePreviewReceipt = async (data: Sale): ApiResponse<Sale> =>
  Api.post('/sale/preview-receipt', data);

const salesReview = async (): ApiResponse<SalesReview> =>
  Api.get('/sales/review');

const updateSalePaymentStatus = (id: any): ApiResponse<any> =>
  Api.patch(`/sale/updatePaymentStatus/${id}`, {
    isPaymentReceived: true,
  });

export const SalesApi = {
  getSales,
  createSale,
  editSale,
  detailsSale,
  deleteSale,
  updateSale,
  shareSaleEmailReceipt,
  salePreviewReceipt,
  shareSaleEmailReceiptProvider,
  salesReview,
  updateSalePaymentStatus,
};
