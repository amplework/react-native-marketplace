import { Api } from 'api';
import { ApiResponse } from 'types/api';
import { ReportRequest } from 'types/report';

const generateTransactionListing = (data: ReportRequest): ApiResponse<void> =>
  Api.post('/provider/generate-transaction-listing-report', data);

const generateTransactionSummary = (data: ReportRequest): ApiResponse<void> =>
  Api.post('/provider/generate-transaction-summary-report', data);

export const ReportApi = {
  generateTransactionListing,
  generateTransactionSummary,
};
