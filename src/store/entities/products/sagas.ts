import {
  all,
  call,
  debounce,
  fork,
  put,
  takeEvery,
} from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { ProductsApi } from 'api/products';
import I18n, { t } from 'locales';
import { Navigator } from 'service/navigator';
import { alert } from 'shared/alert';
import { toast } from 'shared/toast';
import { CreateProductAction, IEditProductRequest } from 'types/products';
import { capitalize } from 'utils/strings';

import {
  closeEditModal,
  createProduct,
  createProductFailure,
  createProductSuccess,
  deleteProduct,
  deleteProductFailure,
  deleteProductSuccess,
  editProduct,
  editProductFailure,
  editProductSuccess,
  getProducts,
  getProductsById,
  getProductsByIdFailure,
  getProductsByIdSuccess,
  getProductsFailure,
  getProductsSuccess,
  skipServices,
  skipServicesFailure,
  skipServicesSuccess,
  toggleActive,
  toggleActiveFailure,
} from './slice';

function* handleGetProducts() {
  try {
    const { data } = yield call(ProductsApi.getProducts);

    yield put(getProductsSuccess(data));
  } catch (error) {
    toast.info(I18n.t('common.errors.load'));

    yield put(getProductsFailure());
  }
}

function* handleGetProductsById(action: any) {
  try {
    const { data } = yield call(ProductsApi.getProductsById, action.payload.id);

    yield put(getProductsByIdSuccess(data));
  } catch (error) {
    toast.info(I18n.t('common.errors.load'));

    yield put(getProductsByIdFailure());
  }
}

function* handleCreateProduct({ payload }: PayloadAction<CreateProductAction>) {
  try {
    const { data } = yield call(ProductsApi.createProduct, payload.values);

    toast.info(
      I18n.t('common.messages.creation', {
        entity: I18n.t('common.entities.service'),
      }),
    );

    // yield put(skipServices({
    //   isServices: false,
    // }))

    if (payload.onSuccess) {
      yield payload.onSuccess(data);
    }

    yield put(createProductSuccess(data));
    yield put(closeEditModal());
  } catch (error) {
    toast.info(
      I18n.t('common.errors.process', {
        process: I18n.t('common.processes.create'),
        entity: I18n.t('common.entities.service'),
      }),
    );

    yield put(createProductFailure());
  }
}

function* handleEditProduct(action: PayloadAction<IEditProductRequest>) {
  try {
    const { data } = yield call(ProductsApi.editProduct, action.payload);

    toast.info(
      I18n.t('common.messages.edition', {
        entity: capitalize(I18n.t('common.entities.service')),
      }),
    );

    yield put(editProductSuccess(data));
    yield put(closeEditModal());
  } catch (error: any) {
    if(error?.statusCode == 406) {
      alert.info(I18n.t(error?.message))
    } else {
      toast.info(
        I18n.t('common.errors.process', {
          process: I18n.t('common.processes.edit'),
          entity: I18n.t('common.entities.service'),
        }),
      );
    }
    yield put(editProductFailure());
  }
}

function* handleToggleActive(action: PayloadAction<IEditProductRequest>) {
  try {
    yield call(ProductsApi.editProduct, action.payload);
  } catch (error: any) {
    if(error?.statusCode == 406) {
      alert.info(I18n.t(error?.message))
    } else {
      toast.info(
        I18n.t('common.errors.process', {
          process: I18n.t('common.processes.edit'),
          entity: I18n.t('common.entities.service'),
        }),
      );
    }
    yield put(toggleActiveFailure(action.payload));
  }
}

function* handleSkipServices(action: any) {  
  try {
    const { data } = yield call(
      ProductsApi.skipServices,
      action.payload,
    );

    if(data) {
      Navigator.goBack();
    }

    yield put(skipServicesSuccess());
  } catch (error) {
    console.log("yield put(skipServicesSuccess); error ==>>> ", error);
    
    yield put(skipServicesFailure());
  }
}

function* handleDeleteProduct({ payload }: PayloadAction<number>) {
  try {
    yield call(ProductsApi.deleteProduct, payload);

    toast.info(
      I18n.t('common.messages.deletion', {
        entity: capitalize(I18n.t('common.entities.service')),
      }),
    );

    yield put(deleteProductSuccess(payload));
    yield put(closeEditModal());
  } catch (error: any) {
    const process = I18n.t('common.processes.delete');
    const entity = I18n.t('common.entities.service');
    const message = I18n.t('common.errors.process', { process, entity });

    toast.info(error?.message || message);

    yield put(deleteProductFailure());
  }
}

function* watchFetchRequests() {
  yield takeEvery(getProducts, handleGetProducts);
  yield takeEvery(getProductsById, handleGetProductsById);
  yield takeEvery(createProduct, handleCreateProduct);
  yield takeEvery(editProduct, handleEditProduct);
  yield debounce(200, toggleActive, handleToggleActive);
  yield takeEvery(deleteProduct, handleDeleteProduct);
  yield takeEvery(skipServices, handleSkipServices);
}

export function* productsSaga() {
  yield all([fork(watchFetchRequests)]);
}
