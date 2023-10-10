import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { SettingsProviderApi } from 'api/settings';
import I18n from 'locales';
import { Navigator } from 'service/navigator';
import { toast } from 'shared/toast';

import {
  editInvoiceNotes,
  editInvoiceNotesFailure,
  editInvoiceNotesSuccess,
} from './slice';

function* handleEditInvoiceNotes(action: PayloadAction<string>) {
  try {
    yield call(SettingsProviderApi.editInvoiceNotes, action.payload);

    toast.info(I18n.t('invoiceNotes.successMessage'));

    Navigator.goBack();

    yield put(editInvoiceNotesSuccess());
  } catch (error) {
    toast.info(I18n.t('common.errors.action'));

    yield put(editInvoiceNotesFailure());
  }
}

function* watchFetchRequests() {
  yield takeEvery(editInvoiceNotes, handleEditInvoiceNotes);
}

export function* invoiceNotesSaga() {
  yield all([fork(watchFetchRequests)]);
}
