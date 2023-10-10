import {
  all,
  call,
  fork,
  put,
  select,
  takeEvery,
} from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { InvoicesApi } from 'api/invoices';
import { getQueryParams } from 'components/invoices/helpers/utils';
import I18n from 'locales';
import { Navigator } from 'service/navigator';
import { toast } from 'shared/toast';
import { ShareEmailRequest } from 'types/api';
import {
  CreateInvoiceAction,
  DeleteInvoiceAction,
  DetailedInvoice,
  EditInvoiceAction,
  GetInvoicesRequest,
  InvoiceTab,
  InvoiceValues,
} from 'types/invoices';
import { capitalize } from 'utils/strings';

import { invoicesSelectors } from './selectors';
import {
  createInvoice,
  createInvoiceFailure,
  createInvoiceForClient,
  createInvoiceSuccess,
  deleteInvoice,
  deleteInvoiceFailure,
  deleteInvoiceSuccess,
  editInvoice,
  editInvoiceFailure,
  editInvoiceSuccess,
  getInvoice,
  getInvoiceFailure,
  getInvoices,
  getInvoicesFailure,
  getInvoicesReview,
  getInvoicesReviewFailure,
  getInvoicesReviewSuccess,
  getInvoicesSuccess,
  getInvoiceSuccess,
  loadMoreInvoices,
  loadMoreInvoicesFailure,
  loadMoreInvoicesSearchResults,
  loadMoreInvoicesSearchResultsFailure,
  loadMoreInvoicesSearchResultsSuccess,
  loadMoreInvoicesSuccess,
  previewInvoice,
  previewInvoiceFailure,
  previewInvoiceSuccess,
  resetInvoices,
  searchInvoices,
  searchInvoicesFailure,
  searchInvoicesSuccess,
  shareInvoice,
  updateInvoicePaymentStatus,
  updateInvoicePaymentStatusSuccess,
  updateInvoicePaymentStatusFailure,
} from './slice';

function* handleGetInvoices({ payload }: PayloadAction<GetInvoicesRequest>) {      
  try {
    yield put(resetInvoices())
    const { data } = yield call(InvoicesApi.getInvoices, payload);

    yield put(getInvoicesSuccess(data));
  } catch (error) {
    toast.info(I18n.t('common.errors.load'));

    yield put(getInvoicesFailure());
  }
}

function* handleLoadMoreInvoices({
  payload,
}: PayloadAction<GetInvoicesRequest>) {
  try {
    const { data } = yield call(InvoicesApi.getInvoices, payload);

    yield put(loadMoreInvoicesSuccess(data));
  } catch (error) {
    toast.info(I18n.t('common.errors.load'));

    yield put(loadMoreInvoicesFailure());
  }
}

function* handleGetInvoice(action: PayloadAction<number>) {
  try {
    const { data } = yield call(InvoicesApi.getInvoice, action.payload);

    yield put(getInvoiceSuccess(data));
  } catch (error: any) {
    if (error.statusCode !== 404) {
      toast.info(I18n.t('common.errors.load'));
    }

    yield put(getInvoiceFailure(new Error(error.message)));
  }
}

function* handleCreateInvoice({ payload }: PayloadAction<CreateInvoiceAction>) {
  const tab: InvoiceTab = yield select(invoicesSelectors.tab);  

  try {
    yield call(InvoicesApi.createInvoice, payload.invoice);

    toast.info(
      I18n.t('common.messages.creation', {
        entity: I18n.t('common.entities.invoice'),
      }),
    );

    Navigator.goBack();

    if (payload.onSuccess) {
      yield payload.onSuccess();
    }

    yield put(getInvoices(getQueryParams(tab)));

    yield put(createInvoiceSuccess());
  } catch (error: any) {
    if(error?.message == "dueDate should be the same or later than the invoice date") {
      toast.info('Due date should be the same or later than the invoice date')
    } else {
      toast.info(capitalize(error.message));
    }

    yield put(createInvoiceFailure());
  }
}

function* handleCreateInvoiceForClient({ payload }: PayloadAction<CreateInvoiceAction>) {
  try {
    yield call(InvoicesApi.createInvoice, payload.invoice);

    toast.info(
      I18n.t('common.messages.creation', {
        entity: I18n.t('common.entities.invoice'),
      }),
    );

    Navigator.goBack();

    if (payload.onSuccess) {
      yield payload.onSuccess();
    }

    yield put(createInvoiceSuccess());
  } catch (error: any) {
    toast.info(error.message);

    yield put(createInvoiceFailure());
  }
}

function* handleDeleteInvoice({ payload }: PayloadAction<DeleteInvoiceAction>) {
  const tab: InvoiceTab = yield select(invoicesSelectors.tab);

  try {
    yield call(InvoicesApi.deleteInvoice, payload.id);

    toast.info(
      I18n.t('common.messages.deletion', {
        entity: capitalize(I18n.t('common.entities.invoice')),
      }),
    );

    yield put(deleteInvoiceSuccess());

    Navigator.goBack();

    if (payload.onSuccess) {
      yield payload.onSuccess();
    }

    yield put(getInvoices(getQueryParams(tab)));
  } catch (error) {
    toast.info(
      I18n.t('common.errors.process', {
        process: I18n.t('common.processes.delete'),
        entity: I18n.t('common.entities.invoice'),
      }),
    );

    yield put(deleteInvoiceFailure());
  }
}

function* handleEditInvoice({ payload }: PayloadAction<EditInvoiceAction>) {
  const tab: InvoiceTab = yield select(invoicesSelectors.tab);
  const invoice: DetailedInvoice = yield select(invoicesSelectors.invoice);

  try {
    yield call(InvoicesApi.editInvoice, payload.id, payload.invoice);

    toast.info(
      I18n.t('common.messages.edition', {
        entity: capitalize(I18n.t('common.entities.invoice')),
      }),
    );

    Navigator.goBack();

    if (payload.onSuccess) {
      yield payload.onSuccess();
    }

    yield put(getInvoice(invoice.id));
    yield put(getInvoices(getQueryParams(tab)));

    yield put(editInvoiceSuccess());
  } catch (error: any) {
    if(error?.message == "dueDate should be the same or later than the invoice date") {
      toast.info('Due date should be the same or later than the invoice date')
    } else {
      toast.info(capitalize(error.message));
    }
    yield put(editInvoiceFailure());
  }
}

function* handleGetInvoicesReview() {
  try {
    const { data } = yield call(InvoicesApi.getInvoicesReview);

    yield put(getInvoicesReviewSuccess(data));
  } catch (error) {
    toast.info(I18n.t('common.errors.load'));

    yield put(getInvoicesReviewFailure());
  }
}

function* handleSearchInvoices({ payload }: PayloadAction<GetInvoicesRequest>) {
  try {
    const { data } = yield call(InvoicesApi.getInvoices, payload);

    yield put(searchInvoicesSuccess(data));
  } catch (error) {
    toast.info(I18n.t('common.errors.load'));

    yield put(searchInvoicesFailure());
  }
}

function* handleLoadMoreInvoicesSearchResults({
  payload,
}: PayloadAction<GetInvoicesRequest>) {
  try {
    const { data } = yield call(InvoicesApi.getInvoices, payload);

    yield put(loadMoreInvoicesSearchResultsSuccess(data));
  } catch (error) {
    toast.info(I18n.t('common.errors.load'));

    yield put(loadMoreInvoicesSearchResultsFailure());
  }
}

function* handleShareInvoice(action: PayloadAction<ShareEmailRequest>) {
  try {
    yield call(InvoicesApi.shareInvoice, action.payload);

    toast.info(
      I18n.t('common.messages.sharing', {
        entity: capitalize(I18n.t('common.entities.invoice')),
      }),
    );
  } catch (error) {
    toast.info(I18n.t('common.errors.save'));
  }
}

function* handlePreviewInvoice({ payload }: PayloadAction<InvoiceValues>) {
  try {
    const { data } = yield call(InvoicesApi.previewInvoice, payload);

    yield put(previewInvoiceSuccess(data));
  } catch (error) {        
    toast.info(I18n.t('common.errors.save'));

    yield put(previewInvoiceFailure());
  }
}

function* handleUpdateInvoicePaymentStatus({ payload }: PayloadAction<any>) {
  try {
    console.log("INV_PAYLOAD -> ", payload);
    const { data } = yield call(InvoicesApi.updateInvoicePaymentStatus, payload);
    console.log("INV_DATA -> ", data);

    yield put(updateInvoicePaymentStatusSuccess(data));

    Navigator.goBack();
  } catch (error: any) {
    console.log("INV_ERROR -> ", {...error});
    toast.info(error?.message);

    yield put(updateInvoicePaymentStatusFailure());
  }
}

function* watchFetchRequests() {
  yield takeEvery(getInvoices, handleGetInvoices);
  yield takeEvery(loadMoreInvoices, handleLoadMoreInvoices);

  yield takeEvery(getInvoice, handleGetInvoice);
  yield takeEvery(deleteInvoice, handleDeleteInvoice);

  yield takeEvery(createInvoice, handleCreateInvoice);
  yield takeEvery(createInvoiceForClient, handleCreateInvoiceForClient);
  yield takeEvery(editInvoice, handleEditInvoice);

  yield takeEvery(getInvoicesReview, handleGetInvoicesReview);

  yield takeEvery(searchInvoices, handleSearchInvoices);
  yield takeEvery(
    loadMoreInvoicesSearchResults,
    handleLoadMoreInvoicesSearchResults,
  );

  yield takeEvery(shareInvoice, handleShareInvoice);
  yield takeEvery(previewInvoice, handlePreviewInvoice);
  yield takeEvery(updateInvoicePaymentStatus, handleUpdateInvoicePaymentStatus);
}

export function* invoicesSaga() {
  yield all([fork(watchFetchRequests)]);
}
