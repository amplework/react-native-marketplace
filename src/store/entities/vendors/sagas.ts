import { PayloadAction } from '@reduxjs/toolkit';
import { VendorsApi } from 'api/vendors';
import { t, translations } from 'locales';
import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { Navigator } from 'service/navigator';
import { toast } from 'shared/toast';
import {
  DeleteVendorPayload,
  EditVendorPayload,
  GetVendorRequest,
  GetVendorsRequest,
  IVendor,
  VendorValues,
} from 'types/vendors';
import { capitalize } from 'utils/strings';

import { vendorsSelectors } from './selectors';
import {
  createVendor,
  createVendorFailure,
  createVendorSuccess,
  deleteVendor,
  deleteVendorFailure,
  deleteVendorSuccess,
  editVendor,
  editVendorFailure,
  editVendorSuccess,
  getVendor,
  getVendorFailure,
  getVendors,
  getVendorsFailure,
  getVendorsReview,
  getVendorsReviewFailure,
  getVendorsReviewSuccess,
  getVendorsSuccess,
  getVendorSuccess,
  searchVendors,
  searchVendorsFailure,
  searchVendorsSuccess,
} from './slice';

function* handleGetVendors({ payload }: PayloadAction<GetVendorsRequest>) {
  try {
    const {
      data: [result],
    } = yield call(VendorsApi.getVendors, payload);

    yield put(getVendorsSuccess(result));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(getVendorsFailure());
  }
}

function* handleGetVendor({ payload }: PayloadAction<GetVendorRequest>) {
  try {
    const { data } = yield call(VendorsApi.getVendor, payload);

    yield put(getVendorSuccess(data));
  } catch (error: any) {
    toast.info(t(translations.common.errors.load));

    yield put(getVendorFailure(new Error(error.message)));
  }
}

function* handleCreateVendor({ payload }: PayloadAction<VendorValues>) {  
  try {
    yield call(VendorsApi.createVendor, payload);

    toast.info(
      t(translations.common.messages.creation, {
        entity: t(translations.common.entities.vendor),
      }),
    );

    yield put(createVendorSuccess());
    Navigator.goBack();

    yield put(getVendors({query: ''}));
  } catch (error: any) {
    if (
      error.message ===
      'You already have a vendor with the same name. Please choose another name.'
    ) {
      toast.info(t(translations.vendors.errors.unique));
    } else {
      toast.info(
        t(translations.common.errors.process, {
          process: t(translations.common.processes.create),
          entity: t(translations.common.entities.vendor),
        }),
      );
    }

    yield put(createVendorFailure());
  }
}

function* handleEditVendor({ payload }: PayloadAction<EditVendorPayload>) {
  try {
    const { id }: IVendor = yield select(vendorsSelectors.vendor);
    const { values, onSuccess } = payload; 
    
    yield call(VendorsApi.editVendor, { id, ...values });

    toast.info(
      t(translations.common.messages.edition, {
        entity: capitalize(t(translations.common.entities.vendor)),
      }),
    );

    yield put(editVendorSuccess());

    if (onSuccess) {
      yield onSuccess();
    }

    yield put(getVendors({query: ''}));
  } catch (error) {    
    toast.info(
      t(translations.common.errors.process, {
        process: t(translations.common.processes.edit),
        entity: t(translations.common.entities.vendor),
      }),
    );

    yield put(editVendorFailure());
  }
}

function* handleDeleteVendor({ payload }: PayloadAction<DeleteVendorPayload>) {
  try {
    const { id, onSuccess } = payload;

    yield call(VendorsApi.deleteVendor, id);

    toast.info(
      t(translations.common.messages.deletion, {
        entity: capitalize(t(translations.common.entities.vendor)),
      }),
    );

    yield put(deleteVendorSuccess());
    Navigator.goBack();

    if (onSuccess) {
      yield onSuccess();
    }

    yield put(getVendors({query: ''}));
  } catch (error) {
    toast.info(
      t(translations.common.errors.process, {
        process: t(translations.common.processes.delete),
        entity: t(translations.common.entities.vendor),
      }),
    );

    yield put(deleteVendorFailure());
  }
}

function* handleSearchVendors({ payload }: PayloadAction<GetVendorsRequest>) {
  try {
    const {
      data: [result],
    } = yield call(VendorsApi.getVendors, payload);

    yield put(searchVendorsSuccess(result));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(searchVendorsFailure());
  }
}

function* handleGetVendorsReview() {
  try {
    const {
      data: { vendors },
    } = yield call(VendorsApi.getVendorsReview);

    yield put(getVendorsReviewSuccess(vendors));
  } catch (error) {
    toast.info(t(translations.common.errors.load));

    yield put(getVendorsReviewFailure());
  }
}

function* watchFetchRequests() {
  yield takeEvery(getVendors, handleGetVendors);
  yield takeEvery(getVendor, handleGetVendor);
  yield takeEvery(createVendor, handleCreateVendor);
  yield takeEvery(editVendor, handleEditVendor);
  yield takeEvery(deleteVendor, handleDeleteVendor);
  yield takeEvery(searchVendors, handleSearchVendors);
  yield takeEvery(getVendorsReview, handleGetVendorsReview);
}

export function* vendorsSaga() {
  yield all([fork(watchFetchRequests)]);
}
