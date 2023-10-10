import { Api, LIMIT } from 'api';
import { calculateEstimateTotal } from 'components/invoiceEstimates/helpers/utils';
// import { calculateEstimateTotal } from 'components/invoices/helpers/utils';
import { ShareEmailRequest } from 'types/api';
import { ApiResponse, PageableApiResponse } from 'types/api';
import {
  DetailedEstimate,
  Estimate,
  EstimatePreview,
  EstimatesReview,
  EstimateValues,
  GetEstimatesRequest,
  GetEstimatesResponse,
  isCloudImage,
  isImageOrVideo,
  UpdateEstimateStatus,
} from 'types/estimates';

import {
  formalizeEditEstimate,
  formalizeEstimate,
  formatToBinaryImages,
} from './utils';

const getEstimates = (
  params: GetEstimatesRequest,
): ApiResponse<GetEstimatesResponse> => {
  return Api.get('/estimate', {
    params: {
      offset: 0,
      orderBy: 'expDate',
      limit: LIMIT,
      ...params,
    },
  });
};

const getEstimatesWithMultipleStatuses = (
  status: string,
  additionalStatus: string,
  limit: number,
  clientSubprofileId?: number,
): PageableApiResponse<Estimate[]> =>
  Api.get(
    `/estimate?status=${status}&status=${additionalStatus}&limit=${limit}`,
    { params: { clientSubprofileId } },
  );

const getEstimate = (id: number): ApiResponse<DetailedEstimate> =>
  Api.get(`/estimate/${id}`);

const createEstimate = (estimate: EstimateValues): ApiResponse<void> => {
  const data = formalizeEstimate(estimate);
  const imageFiles = formatToBinaryImages(estimate.imageFiles);

  if (estimate.isNewClient) {
    data.append('newClient[firstName]', estimate.firstName);
    data.append('newClient[lastName]', estimate.lastName);
    data.append('newClient[phoneNumber]', estimate.phoneNumber);
    data.append('newClient[countryCode]', estimate.countryCode);
  } else {
    data.append('clientSubprofileId', estimate.subClient?.id);
  }

  imageFiles.map((image, index) => data.append(`imageFiles[${index}]`, image));

  if (estimate.payment) {
    const { isFullPayment, paymentMethodId, total } = estimate.payment;
    const payment = {
      paymentMethodId,
      total: isFullPayment ? calculateEstimateTotal(estimate) : Number(total),
    };

    data.append('payment', JSON.stringify(payment));
  }
  return Api.post('/estimate', data);
};

const editEstimate = (
  id: number,
  estimate: EstimateValues,
): ApiResponse<void> => {
  const data = formalizeEditEstimate(estimate);
  const oldImages = estimate.imageFiles.filter(isCloudImage);
  const oldImagesIds = oldImages.map((image) => image.id);
  const newImages = estimate.imageFiles.filter(isImageOrVideo);
  const newImageFiles = formatToBinaryImages(newImages);

  data.append('imageIds', JSON.stringify(oldImagesIds));
  data.append('approvalStatus', null);

  newImageFiles.map((image, index) =>
    data.append(`imageFiles[${index}]`, image),
  );

  return Api.put(`/estimate/${id}`, data);
};

const updateEstimateStatus = ({
  id,
  approveStatus,
}: UpdateEstimateStatus): ApiResponse<void> =>
  Api.patch(`/estimate/updateStatus/${id}`, { approveStatus: approveStatus });

const deleteEstimate = (id: number): ApiResponse<void> =>
  Api.delete(`/estimate/${id}`);

const getEstimatesReview = (): ApiResponse<EstimatesReview | any> =>
  Api.get('/estimate/estimates/review');

const shareEstimate = ({ id, email }: ShareEmailRequest): ApiResponse<void> =>
  Api.post(`/estimate/${id}/share`, { email });

const previewEstimate = (
  estimate: EstimateValues,
): ApiResponse<EstimatePreview> => {
  const data = formalizeEstimate(estimate);
  const oldImages = estimate.imageFiles.filter(isCloudImage);
  const oldImagesIds = oldImages.map((image) => image.id);
  const newImages = estimate.imageFiles.filter(isImageOrVideo);
  const newImageFiles = formatToBinaryImages(newImages);

  if (estimate.isNewClient) {
    data.append('newClient[firstName]', estimate.firstName);
    data.append('newClient[lastName]', estimate.lastName);
    data.append('newClient[phoneNumber]', estimate.phoneNumber);
  } else {
    data.append('clientSubprofileId', estimate.subClient?.id);
  }

  data.append('imageIds', JSON.stringify(oldImagesIds));

  newImageFiles.map((image, index) =>
    data.append(`imageFiles[${index}]`, image),
  );

  return Api.post('/estimate/preview', data);
};

const updateEstimatePaymentStatus = (id: any): ApiResponse<any> =>
  Api.patch(`/estimate/updateStatus/${id}`, {
    isPaymentSuccess: true,
  });

const convertEstimate = (id: any): ApiResponse<any> =>
  Api.post(`/estimate/create-invoice/${id}`);

export const EstimatesApi = {
  getEstimates,
  getEstimatesWithMultipleStatuses,
  getEstimate,
  createEstimate,
  deleteEstimate,
  editEstimate,
  getEstimatesReview,
  shareEstimate,
  previewEstimate,
  convertEstimate,
  updateEstimateStatus,
  updateEstimatePaymentStatus,
};
