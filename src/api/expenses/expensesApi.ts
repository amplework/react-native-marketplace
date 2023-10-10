import { Api } from 'api';
import { LIMIT } from 'api/api';
import { toast } from 'shared/toast';
import { ApiResponse } from 'types/api';
import {
  DetailedExpense,
  EditExpenseRequest,
  ExpenseData,
  ExpensesReview,
  ExpenseValuesRequest,
  GetExpensesRequest,
} from 'types/expenses';

const getExpenses = (params?: GetExpensesRequest): ApiResponse<ExpenseData[]> =>
  Api.get('/expenses', { params: { ...params, limit: LIMIT } })
  .then((res) => {
    return res;
  }).catch((error) => {
    toast.info(error.message)
    return error;
  })

const createExpense = (data: ExpenseValuesRequest): ApiResponse<void> =>
  Api.post('/expense', data);

const editExpense = ({ id, ...data }: EditExpenseRequest): ApiResponse<void> =>
  Api.put(`/expense/${id}`, data);

const getExpense = (id: number): ApiResponse<DetailedExpense> =>
  Api.get(`/expense/${id}`);

const deleteExpense = (id: number): ApiResponse<void> =>
  Api.delete(`/expense/${id}`);

const getExpensesReview = (): ApiResponse<ExpensesReview> =>
  Api.get('/expenses/review');

export const ExpensesApi = {
  getExpenses,
  createExpense,
  getExpense,
  editExpense,
  deleteExpense,
  getExpensesReview,
};
