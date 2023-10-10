import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { SettingsProviderApi } from 'api/settings';
import I18n from 'locales';
import { toast } from 'shared/toast';
import {
  ActiveEntityRequest,
  ExpenseTypeValues,
  IExpenseType,
} from 'types/settings';
import { capitalize } from 'utils/strings';

import {
  closeEditModal,
  createExpenseType,
  createExpenseTypeFailure,
  createExpenseTypeSuccess,
  deleteExpenseType,
  deleteExpenseTypeFailure,
  deleteExpenseTypeSuccess,
  editExpenseType,
  editExpenseTypeFailure,
  editExpenseTypeSuccess,
  getExpenseTypes,
  getExpenseTypesFailure,
  getExpenseTypesSuccess,
  toggleActive,
  toggleActiveFailure,
} from './slice';

function* handleGetExpenseTypes({
  payload,
}: PayloadAction<ActiveEntityRequest>) {
  try {
    const { data } = yield call(SettingsProviderApi.getExpenseTypes, payload);

    yield put(getExpenseTypesSuccess(data));
  } catch (error) {
    toast.info(I18n.t('common.errors.load'));

    yield put(getExpenseTypesFailure());
  }
}

function* handleCreateExpenseType({
  payload,
}: PayloadAction<ExpenseTypeValues>) {
  try {
    const { data } = yield call(SettingsProviderApi.createExpenseType, payload);

    toast.info(
      I18n.t('common.messages.creation', {
        entity: I18n.t('common.entities.expenseType'),
      }),
    );

    yield put(createExpenseTypeSuccess(data));
    yield put(closeEditModal());
  } catch (error) {
    toast.info(
      I18n.t('common.errors.process', {
        process: I18n.t('common.processes.create'),
        entity: I18n.t('common.entities.expenseType'),
      }),
    );

    yield put(createExpenseTypeFailure());
  }
}

function* handleEditExpenseType({ payload }: PayloadAction<IExpenseType>) {
  try {
    yield call(SettingsProviderApi.editExpenseType, payload);

    toast.info(
      I18n.t('common.messages.edition', {
        entity: capitalize(I18n.t('common.entities.expenseType')),
      }),
    );

    yield put(editExpenseTypeSuccess(payload));
    yield put(closeEditModal());
  } catch (error) {
    toast.info(
      I18n.t('common.errors.process', {
        process: I18n.t('common.processes.edit'),
        entity: I18n.t('common.entities.expenseType'),
      }),
    );

    yield put(editExpenseTypeFailure());
  }
}

function* handleToggleActive({ payload }: PayloadAction<IExpenseType>) {
  try {
    yield call(SettingsProviderApi.editExpenseType, payload);
  } catch (error) {
    toast.info(
      I18n.t('common.errors.process', {
        process: I18n.t('common.processes.edit'),
        entity: I18n.t('common.entities.paymentMethod'),
      }),
    );

    yield put(toggleActiveFailure(payload));
  }
}

function* handleDeleteExpenseType({ payload }: PayloadAction<number>) {
  try {
    yield call(SettingsProviderApi.deleteExpenseType, payload);

    toast.info(
      I18n.t('common.messages.deletion', {
        entity: capitalize(I18n.t('common.entities.expenseType')),
      }),
    );

    yield put(deleteExpenseTypeSuccess(payload));
    yield put(closeEditModal());
  } catch (error) {
    const process = I18n.t('common.processes.delete');
    const entity = I18n.t('common.entities.expenseType');
    const message =
      error?.message || I18n.t('common.errors.process', { process, entity });

    toast.info(message);

    yield put(deleteExpenseTypeFailure());
  }
}

function* watchFetchRequests() {
  yield takeEvery(getExpenseTypes, handleGetExpenseTypes);
  yield takeEvery(createExpenseType, handleCreateExpenseType);
  yield takeEvery(editExpenseType, handleEditExpenseType);
  yield takeEvery(toggleActive, handleToggleActive);
  yield takeEvery(deleteExpenseType, handleDeleteExpenseType);
}

export function* expenseTypesSaga() {
  yield all([fork(watchFetchRequests)]);
}
