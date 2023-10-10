import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { TaxesApi } from 'api/taxes';
import I18n from 'locales';
import { toast } from 'shared/toast';
import { IEditTaxRequest, TaxValues } from 'types/taxes';
import { capitalize } from 'utils/strings';

import {
  closeEditModal,
  createTax,
  createTaxFailure,
  createTaxSuccess,
  deleteTax,
  deleteTaxFailure,
  deleteTaxSuccess,
  editTax,
  editTaxFailure,
  editTaxSuccess,
  getTaxes,
  getTaxesFailure,
  getTaxesSuccess,
} from './slice';

function* handleGetTaxes() {
  try {
    const { data } = yield call(TaxesApi.getTaxes);
    yield put(getTaxesSuccess(data));
  } catch (error: any) {
    toast.info(error?.message);
    yield put(getTaxesFailure());
  }
}

function* handleCreateTax(action: PayloadAction<TaxValues>) {
  try {
    const { data } = yield call(TaxesApi.createTax, action.payload);
    toast.info(
      I18n.t('common.messages.creation', {
        entity: I18n.t('common.entities.tax'),
      }),
    );
    yield put(createTaxSuccess(data));
    yield put(closeEditModal());
  } catch (error: any) {
    toast.info(error?.message);
    yield put(createTaxFailure());
  }
}

function* handleEditTax(action: PayloadAction<IEditTaxRequest>) {
  try {
    const { data } = yield call(TaxesApi.editTax, action.payload);
    toast.info(
      I18n.t('common.messages.edition', {
        entity: capitalize(I18n.t('common.entities.tax')),
      }),
    );
    yield put(editTaxSuccess(data));
    yield put(closeEditModal());
  } catch (error: any) {
    toast.info(error?.message);
    yield put(editTaxFailure());
  }
}

function* handleDeleteTax(action: PayloadAction<number>) {
  try {
    yield call(TaxesApi.deleteTax, action.payload);

    toast.info(I18n.t('taxes.deleteSuccess'));

    yield put(deleteTaxSuccess());
    yield put(closeEditModal());
  } catch (error: any) {
    toast.info(error?.message);
    yield put(deleteTaxFailure());
  }
}

function* watchFetchRequests() {
  yield takeEvery(getTaxes, handleGetTaxes);
  yield takeEvery(createTax, handleCreateTax);
  yield takeEvery(editTax, handleEditTax);
  yield takeEvery(deleteTax, handleDeleteTax);
}

export function* taxesSaga() {
  yield all([fork(watchFetchRequests)]);
}
