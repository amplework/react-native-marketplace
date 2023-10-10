import {
  all,
  call,
  debounce,
  fork,
  put,
  takeEvery,
} from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { SettingsProviderApi } from 'api/settings';
import I18n from 'locales';
import { toast } from 'shared/toast';
import {
  ActiveEntityRequest,
  IPaymentMethod,
  PaymentMethodValues,
} from 'types/settings';
import { capitalize } from 'utils/strings';

import {
  closeEditModal,
  createPaymentMethod,
  createPaymentMethodFailure,
  createPaymentMethodSuccess,
  deletePaymentMethod,
  deletePaymentMethodFailure,
  deletePaymentMethodSuccess,
  editPaymentMethod,
  editPaymentMethodFailure,
  editPaymentMethodSuccess,
  getPaymentMethods,
  getPaymentMethodsFailure,
  getPaymentMethodsSuccess,
  toggleActive,
  toggleActiveFailure,
} from './slice';

function* handleGetPaymentMethods({
  payload,
}: PayloadAction<ActiveEntityRequest>) {
  try {
    const { data } = yield call(SettingsProviderApi.getPaymentMethods, payload);

    yield put(getPaymentMethodsSuccess(data));
  } catch (error) {
    toast.info(I18n.t('common.errors.load'));

    yield put(getPaymentMethodsFailure());
  }
}

function* handleCreatePaymentMethod({
  payload,
}: PayloadAction<PaymentMethodValues>) {
  try {
    const { data } = yield call(
      SettingsProviderApi.createPaymentMethod,
      payload,
    );

    toast.info(
      I18n.t('common.messages.creation', {
        entity: I18n.t('common.entities.paymentMethod'),
      }),
    );

    yield put(createPaymentMethodSuccess(data));
    yield put(closeEditModal());
  } catch (error) {
    toast.info(
      I18n.t('common.errors.process', {
        process: I18n.t('common.processes.create'),
        entity: I18n.t('common.entities.paymentMethod'),
      }),
    );

    yield put(createPaymentMethodFailure());
  }
}

function* handleEditPaymentMethod({ payload }: PayloadAction<IPaymentMethod>) {
  try {
    const { data } = yield call(SettingsProviderApi.editPaymentMethod, payload);

    toast.info(
      I18n.t('common.messages.edition', {
        entity: capitalize(I18n.t('common.entities.paymentMethod')),
      }),
    );

    yield put(editPaymentMethodSuccess(data));
    yield put(closeEditModal());
  } catch (error) {
    toast.info(
      I18n.t('common.errors.process', {
        process: I18n.t('common.processes.edit'),
        entity: I18n.t('common.entities.paymentMethod'),
      }),
    );

    yield put(editPaymentMethodFailure());
  }
}

function* handleToggleActive({ payload }: PayloadAction<IPaymentMethod>) {
  try {
    yield call(SettingsProviderApi.editPaymentMethod, payload);
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

function* handleDeletePaymentMethod({ payload }: PayloadAction<number>) {
  try {
    yield call(SettingsProviderApi.deletePaymentMethod, payload);

    toast.info(
      I18n.t('common.messages.deletion', {
        entity: capitalize(I18n.t('common.entities.paymentMethod')),
      }),
    );

    yield put(deletePaymentMethodSuccess(payload));
    yield put(closeEditModal());
  } catch (error: any) {
    const process = I18n.t('common.processes.delete');
    const entity = I18n.t('common.entities.paymentMethod');
    const message =
      error?.message || I18n.t('common.errors.process', { process, entity });

    toast.info(message);

    yield put(deletePaymentMethodFailure());
  }
}

function* watchFetchRequests() {
  //@ts-ignore
  yield takeEvery(getPaymentMethods, handleGetPaymentMethods);
  yield takeEvery(createPaymentMethod, handleCreatePaymentMethod);
  yield takeEvery(editPaymentMethod, handleEditPaymentMethod);
  yield debounce(200, toggleActive, handleToggleActive);
  yield takeEvery(deletePaymentMethod, handleDeletePaymentMethod);
}

export function* paymentMethodsSaga() {
  yield all([fork(watchFetchRequests)]);
}
