import { Api } from 'api';
import { ApiResponse } from 'types/api';
import { PerformancePreview, PerformanceRequest, PerformanceReview } from 'types/home';

const getPerformancePreview = (
  params: PerformanceRequest,
): ApiResponse<PerformancePreview> =>
  Api.get('/home/provider/performance-preview', { params });

const getPerformanceReview = (
  params: PerformanceRequest,
): ApiResponse<PerformanceReview> =>
  Api.get('/home/provider/performance-overview', { params, timeout: 60000 });
  
export const HomeApi = {
  getPerformancePreview,
  getPerformanceReview,
};
