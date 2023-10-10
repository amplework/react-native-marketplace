import { Api } from 'api';
import { LIMIT } from 'api/api';
import { ApiResponse } from 'types/api';
import {
  CashJournal,
  CashJournalRequest,
  CashJournalsReview,
  GetCashJournalsRequest,
  GetCashJournalsResponse,
} from 'types/cashJournals';

const getCashJournals = (
  params: GetCashJournalsRequest,
): ApiResponse<GetCashJournalsResponse> =>
  Api.get('/cash-journals', { params: { ...params, limit: LIMIT } });

const create = (data: CashJournalRequest): ApiResponse<void> =>
  Api.post('/cash-journal', data);

const editCashJournal = (
  id: number,
  data: CashJournalRequest,
): ApiResponse<CashJournal> => Api.put(`/cash-journal/${id}`, data);

const deleteCashJournal = (id: number): ApiResponse<void> =>
  Api.delete(`/cash-journal/${id}`);

const getCashJournalsReview = (): ApiResponse<CashJournalsReview> =>
  Api.get('/cash-journals/review');

export const CashJournalsApi = {
  getCashJournals,
  create,
  editCashJournal,
  deleteCashJournal,
  getCashJournalsReview,
};
