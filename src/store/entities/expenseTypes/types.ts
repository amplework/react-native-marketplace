import { IExpenseType } from 'types/settings';

export interface IExpenseTypeState {
  expenseTypes: IExpenseTypes;
}

export interface IExpenseTypes {
  expenseTypes: IExpenseType[];
  loading: boolean;
  isModalOpened: boolean;
  expenseType: IExpenseType | null;
  expenseTypeLoading: boolean;
}
