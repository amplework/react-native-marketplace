import moment from 'moment';
import {
  DetailedExpense,
  ExpenseValues,
  ExpenseValuesLite,
  GetExpensesRequest,
  SearchExpensesValues,
} from 'types/expenses';
import { formatApiDate, parseDate } from 'utils/dates';
import { getValueOrNA } from 'utils/fields';

export const formatExpenseQueryParameters = (
  parameters: SearchExpensesValues,
): GetExpensesRequest => ({
  ...parameters,
  fromDate: formatApiDate(parameters.fromDate),
  toDate: formatApiDate(parameters.toDate),
});

export const adaptExpense = (expense: DetailedExpense): ExpenseValues => ({
  description: expense.description,
  vendorId: expense.vendor?.id || null,
  expenseTypeId: expense.expenseType.id,
  paymentMethodId: expense.paymentMethod.id,
  date: expense.date,
  total: expense.total.toString(),
  invoiceNumber: expense.invoiceNumber || '',
  vendorName: getValueOrNA(expense.vendor?.name) || expense?.vendorName,
  notes: expense.notes || '',
});
