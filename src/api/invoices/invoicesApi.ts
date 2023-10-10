import { Api, LIMIT } from 'api';
import { calculateInvoiceTotal } from 'components/invoices/helpers/utils';
import { ShareEmailRequest } from 'types/api';
import { ApiResponse, PageableApiResponse } from 'types/api';
import {
  DetailedInvoice,
  GetInvoicesRequest,
  GetInvoicesResponse,
  Invoice,
  InvoicePreview,
  InvoicesReview,
  InvoiceValues,
  isCloudImage,
  isImageOrVideo,
} from 'types/invoices';

import { formalizeEditInvoice, formalizeInvoice, formatToBinaryImages } from './utils';

const getInvoices = (
  params: GetInvoicesRequest,
): ApiResponse<GetInvoicesResponse> =>
  Api.get('/invoices', {
    params: {
      offset: 0,
      orderBy: 'dueDate',
      limit: LIMIT,
      ...params,
    },
  });

const getInvoicesWithMultipleStatuses = (
  status: string,
  additionalStatus: string,
  limit: number,
  clientSubprofileId?: number,
): PageableApiResponse<Invoice[]> =>
  Api.get(
    `/invoices?status=${status}&status=${additionalStatus}&limit=${limit}`,
    { params: { clientSubprofileId } },
  );

const getInvoice = (id: number): ApiResponse<DetailedInvoice> =>
  Api.get(`/invoice/${id}`);

const createInvoice = (invoice: InvoiceValues): ApiResponse<void> => {
  const data = formalizeInvoice(invoice);
  const imageFiles = formatToBinaryImages(invoice.imageFiles);

  if (invoice.isNewClient) {
    data.append('newClient[firstName]', invoice.firstName);
    data.append('newClient[lastName]', invoice.lastName);
    data.append('newClient[phoneNumber]', invoice.phoneNumber);
    data.append('newClient[countryCode]', invoice.countryCode);
  } else {
    data.append('clientSubprofileId', invoice.subClient?.id);
  }

  imageFiles.map((image, index) => data.append(`imageFiles[${index}]`, image));

  if (invoice.payment) {
    const { isFullPayment, paymentMethodId, total } = invoice.payment;
    const payment = {
      paymentMethodId,
      total: isFullPayment ? calculateInvoiceTotal(invoice) : Number(total),
    };

    data.append('payment', JSON.stringify(payment));
  }
  return Api.post('/invoice', data);
};

const editInvoice = (id: number, invoice: InvoiceValues): ApiResponse<void> => {
  const data = formalizeEditInvoice(invoice);
  const oldImages = invoice.imageFiles.filter(isCloudImage);
  const oldImagesIds = oldImages.map((image) => image.id);
  const newImages = invoice.imageFiles.filter(isImageOrVideo);
  const newImageFiles = formatToBinaryImages(newImages);

  data.append('imageIds', JSON.stringify(oldImagesIds));

  newImageFiles.map((image, index) =>
    data.append(`imageFiles[${index}]`, image),
  );

  return Api.put(`/invoice/${id}`, data);
};

const deleteInvoice = (id: number): ApiResponse<void> =>
  Api.delete(`/invoice/${id}`);

const getInvoicesReview = (): ApiResponse<InvoicesReview> =>
  Api.get('/invoices/review');

const shareInvoice = ({ id, email }: ShareEmailRequest): ApiResponse<void> =>
  Api.post(`/invoice/${id}/share`, { email });

const previewInvoice = (
  invoice: InvoiceValues,
): ApiResponse<InvoicePreview> => {
  const data = formalizeInvoice(invoice);
  const oldImages = invoice.imageFiles.filter(isCloudImage);
  const oldImagesIds = oldImages.map((image) => image.id);
  const newImages = invoice.imageFiles.filter(isImageOrVideo);
  const newImageFiles = formatToBinaryImages(newImages);

  if (invoice.isNewClient) {
    data.append('newClient[firstName]', invoice.firstName);
    data.append('newClient[lastName]', invoice.lastName);
    data.append('newClient[phoneNumber]', invoice.phoneNumber);
  } else {
    data.append('clientSubprofileId', invoice.subClient?.id);
  }

  data.append('imageIds', JSON.stringify(oldImagesIds));

  newImageFiles.map((image, index) =>
    data.append(`imageFiles[${index}]`, image),
  );

  return Api.post('/invoice/preview', data);
};

const updateInvoicePaymentStatus = (id: any): ApiResponse<any> =>
  Api.patch(`/invoice/updateStatus/${id}`, {
    isPaymentSuccess: true,
  });

export const InvoicesApi = {
  getInvoices,
  getInvoicesWithMultipleStatuses,
  getInvoice,
  createInvoice,
  deleteInvoice,
  editInvoice,
  getInvoicesReview,
  shareInvoice,
  previewInvoice,
  updateInvoicePaymentStatus,
};
