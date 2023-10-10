import { DetailedExpense, ExpenseData, ExpensesReview } from 'types/expenses';

export type ExpensesState = {
  expenses: ExpensesInitialState;
};

export type ExpensesInitialState = {
  expenses: ExpenseData[];
  loading: boolean;
  loadingMore: boolean;
  expense: DetailedExpense | null;
  expenseLoading: boolean;
  expenseError: Error | null;
  addEditLoading: boolean;
  deleteLoading: boolean;
  total: number;
  offset: number;
  totalSum: number;
  fromDate: Date;
  toDate: Date;
  searchResults: ExpenseData[];
  searchLoading: boolean;
  searchLoadingMore: boolean;
  searchOffset: number;
  searchTotal: number;
  review: ExpensesReview;
  reviewLoading: boolean;
};
