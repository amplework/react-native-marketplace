import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { SalesApi } from 'api/sales';
import { t, translations } from 'locales';
import { Navigator } from 'service/navigator';
import { toast } from 'shared/toast';
import { ShareEmailRequest } from 'types/api';
import { CreateSaleRequest, GetSalesRequest } from 'types/sales';
import { capitalize } from 'utils/strings';

import {
  createSale,
  createSaleFailure,
  createSaleSuccess,
  deleteSale,
  getSaleDetails,
  getSaleDetailsFailure,
  getSaleDetailsSuccess,
  getSales,
  getSalesFailure,
  getSalesSuccess,
  shareSale,
  shareSaleProvider,
  updateSale,
  updateSaleFailure,
  updateSalePaymentStatus,
  updateSalePaymentStatusSuccess,
  updateSalePaymentStatusFailure,
} from './slice';

function* handleGetSales(action: PayloadAction<GetSalesRequest>) {
  try {
    // yield put(resetSales())
    const { data } = yield call(SalesApi.getSales, action.payload);
    yield put(getSalesSuccess(data));
  } catch (error: any) {
    error?.toString() == 'Error: Cannot load an empty url' ?
      toast.info('Connection was Interrupted!') : toast.info(error?.message)
    yield put(getSalesFailure());
  }
}

function* handleGetSalesDetails(action: { payload: number }) {
  try {
    const { data } = yield call(SalesApi.detailsSale, action.payload);
    yield put(getSaleDetailsSuccess(data));
  } catch (error: any) {
    if (error.statusCode !== 404) {
      toast.info(error?.message);
    }

    yield put(getSaleDetailsFailure());
  }
}

function* handleCreateSale(action: PayloadAction<CreateSaleRequest>) {
  try {
    yield call(SalesApi.createSale, action.payload);

    toast.info(
      t(translations.common.messages.creation, {
        entity: t(translations.common.entities.sale),
      }),
    );

    Navigator.goBack();
    yield put(createSaleSuccess());
  } catch (error: any) {
    toast.info(error?.message)
    yield put(createSaleFailure());
  }
}

function* handleUpdateSale(action: PayloadAction<CreateSaleRequest>) {
  try {
    const { id, ...updatedSale } = action.payload;
    // @ts-ignore
    yield call(SalesApi.updateSale, updatedSale, id);
    // @ts-ignore
    yield put(getSaleDetails(id));

    toast.info(
      t(translations.common.messages.edition, {
        entity: capitalize(t(translations.common.entities.sale)),
      }),
    );

    Navigator.goBack();
  } catch (error: any) {
    toast.info(error?.message);

    yield put(updateSaleFailure());
  }
}

function* handleSaleDelete(action: { payload: number }) {
  try {
    yield call(SalesApi.deleteSale, action.payload);
    Navigator.goBack();
  } catch (error: any) {
    toast.info(error?.message);
  }
}

function* handleShareSale({ payload }: PayloadAction<ShareEmailRequest>) {
  try {
    yield call(SalesApi.shareSaleEmailReceipt, payload);

    toast.info(
      t(translations.common.messages.sharing, {
        entity: capitalize(t(translations.common.entities.saleReceipt)),
      }),
    );
  } catch (error) {
    toast.info(
      t(translations.common.errors.process, {
        process: t(translations.common.processes.share),
        entity: t(translations.common.entities.saleReceipt),
      }),
    );
  }
}

function* handleShareSaleProvider({ payload }: PayloadAction<ShareEmailRequest>) {
  try {
    yield call(SalesApi.shareSaleEmailReceiptProvider, payload);

    toast.info(
      t(translations.common.messages.sharing, {
        entity: capitalize(t(translations.common.entities.saleReceipt)),
      }),
    );
  } catch (error) {
    toast.info(
      t(translations.common.errors.process, {
        process: t(translations.common.processes.share),
        entity: t(translations.common.entities.saleReceipt),
      }),
    );
  }
}

function* handleUpdateSalePaymentStatus({ payload }: PayloadAction<any>) {
  try {
    console.log("SALE_PAYLOAD -> ", payload);
    const { data } = yield call(SalesApi.updateSalePaymentStatus, payload);
    console.log("SALE_DATA -> ", data);

    yield put(updateSalePaymentStatusSuccess(data));

    Navigator.goBack();
  } catch (error: any) {
    console.log("SALE_ERROR -> ", { ...error });
    toast.info(error?.message);

    yield put(updateSalePaymentStatusFailure());
  }
}

function* watchFetchRequests() {
  yield takeEvery(getSales, handleGetSales);
  yield takeEvery(createSale, handleCreateSale);
  // @ts-ignore
  yield takeEvery(getSaleDetails, handleGetSalesDetails);
  // @ts-ignore
  yield takeEvery(deleteSale, handleSaleDelete);
  yield takeEvery(updateSale, handleUpdateSale);
  yield takeEvery(shareSale, handleShareSale);
  yield takeEvery(shareSaleProvider, handleShareSaleProvider);
  yield takeEvery(updateSalePaymentStatus, handleUpdateSalePaymentStatus);
}

export function* salesSaga() {
  yield all([fork(watchFetchRequests)]);
}
