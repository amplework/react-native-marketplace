import { IExpenseTypeState } from './types';

const all = (state: IExpenseTypeState) => state.expenseTypes;

const expenseTypes = (state: IExpenseTypeState) => all(state).expenseTypes;

const loading = (state: IExpenseTypeState) => all(state).loading;

const isModalOpened = (state: IExpenseTypeState) => all(state).isModalOpened;

const expenseType = (state: IExpenseTypeState) => all(state).expenseType;

const expenseTypeLoading = (state: IExpenseTypeState) =>
  all(state).expenseTypeLoading;

export const expenseTypesSelectors = {
  expenseTypes,
  loading,
  isModalOpened,
  expenseType,
  expenseTypeLoading,
};
