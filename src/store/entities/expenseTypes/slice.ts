import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ActiveEntityRequest,
  ExpenseTypeValues,
  IExpenseType,
} from 'types/settings';
import { compareBy, findIndexById } from 'utils/array';

import { IExpenseTypes } from './types';

const initialState: IExpenseTypes = {
  expenseTypes: [],
  loading: false,
  isModalOpened: false,
  expenseType: null,
  expenseTypeLoading: false,
};

const expenseTypes = createSlice({
  name: 'expenseTypes',
  initialState,
  reducers: {
    getExpenseTypes: (
      state,
      _action: PayloadAction<ActiveEntityRequest | undefined>,
    ) => {
      state.loading = true;
    },
    getExpenseTypesSuccess: (state, action: PayloadAction<IExpenseType[]>) => {
      state.loading = false;
      state.expenseTypes = action.payload;
    },
    getExpenseTypesFailure: (state) => {
      state.loading = false;
    },
    openEditModal: (state, action: PayloadAction<IExpenseType | null>) => {
      state.isModalOpened = true;
      state.expenseType = action.payload;
    },
    closeEditModal: (state) => {
      state.isModalOpened = false;
      state.expenseType = null;
    },
    createExpenseType: (state, _action: PayloadAction<ExpenseTypeValues>) => {
      state.expenseTypeLoading = true;
    },
    createExpenseTypeSuccess: (state, action: PayloadAction<IExpenseType>) => {
      state.expenseTypeLoading = false;
      state.expenseTypes.push(action.payload);
      state.expenseTypes.sort(compareBy('shortName'));
    },
    createExpenseTypeFailure: (state) => {
      state.expenseTypeLoading = false;
    },
    editExpenseType: (state, _action: PayloadAction<IExpenseType>) => {
      state.expenseTypeLoading = true;
    },
    editExpenseTypeSuccess: (
      state,
      { payload }: PayloadAction<IExpenseType>,
    ) => {
      const index = findIndexById(payload.id)(state.expenseTypes);

      state.expenseTypeLoading = false;
      state.expenseTypes[index] = payload;
      state.expenseTypes.sort(compareBy('shortName'));
    },
    editExpenseTypeFailure: (state) => {
      state.expenseTypeLoading = false;
    },
    toggleActive: (state, { payload }: PayloadAction<IExpenseType>) => {
      const index = findIndexById(payload.id)(state.expenseTypes);

      state.expenseTypes[index].isActive = payload.isActive;
    },
    toggleActiveFailure: (state, { payload }: PayloadAction<IExpenseType>) => {
      const index = state.expenseTypes.findIndex(({ id }) => id === payload.id);

      state.expenseTypes[index].isActive = !payload.isActive;
    },
    deleteExpenseType: (state, _action: PayloadAction<number>) => {
      state.expenseTypeLoading = true;
    },
    deleteExpenseTypeSuccess: (state, { payload }: PayloadAction<number>) => {
      const index = findIndexById(payload)(state.expenseTypes);

      state.expenseTypeLoading = false;
      state.expenseTypes.splice(index, 1);
    },
    deleteExpenseTypeFailure: (state) => {
      state.expenseTypeLoading = false;
    },
  },
});

export const {
  actions: {
    getExpenseTypes,
    getExpenseTypesFailure,
    getExpenseTypesSuccess,
    createExpenseType,
    createExpenseTypeFailure,
    createExpenseTypeSuccess,
    editExpenseType,
    editExpenseTypeFailure,
    editExpenseTypeSuccess,
    deleteExpenseType,
    deleteExpenseTypeFailure,
    deleteExpenseTypeSuccess,
    toggleActive,
    toggleActiveFailure,
    openEditModal,
    closeEditModal,
  },
  reducer: expenseTypesReducer,
} = expenseTypes;
