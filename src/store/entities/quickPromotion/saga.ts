import { all, call, fork, put, select, takeEvery } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { QuickPromotionApi } from 'api/quickPromotion';
import I18n from 'locales';
import { toast } from 'shared/toast';
import { capitalize } from 'utils/strings';
import { quickPromotionSelectors } from './selectors';
import { 
  addQuickPromotion, 
  addQuickPromotionFailure, 
  addQuickPromotionSuccess, 
  closeQuickPromoModal, 
  deleteQuickPromotion, 
  deleteQuickPromotionFailure, 
  deleteQuickPromotionSuccess, 
  editQuickPromotion, 
  editQuickPromotionFailure, 
  editQuickPromotionSuccess, 
  getQuickPromotions, 
  getQuickPromotionsFailure, 
  getQuickPromotionsSuccess 
} from './slice';

function* handleGetQuickPromotions() {
  try {
    const { data } = yield call(QuickPromotionApi.getQuickPromotions);
    yield put(getQuickPromotionsSuccess(data));
  } catch (error: any) {
    yield put(getQuickPromotionsFailure());
  }
}

function* handleAddQuickPromotion(action: PayloadAction<any>): any {
  try {
    // const user = yield select(userSelectors.user);
    const { data } = yield call(QuickPromotionApi.addQuickPromotion, action.payload);    
    
    toast.info(
      I18n.t('common.messages.creation', {
        entity: I18n.t('common.entities.quickPromotion'),
      }),
    );

    if (data) {
      const { data } = yield call(QuickPromotionApi.getQuickPromotions);
      yield put(getQuickPromotionsSuccess(data));
      yield put(addQuickPromotionSuccess());
      yield put(closeQuickPromoModal());
    }
  } catch (error: any) {    
    toast.info(error?.message);
    yield put(addQuickPromotionFailure());
  }
}

function* handleEditQuickPromotion(action: PayloadAction<any>) {
  try {
    const { id } = yield select(quickPromotionSelectors.quickPromotion);

    yield call(QuickPromotionApi.editQuickPromotion, id, action.payload);
    toast.info(
      I18n.t('common.messages.edition', {
        entity: capitalize(I18n.t('common.entities.quickPromotion')),
      }),
    );

    const { data } = yield call(QuickPromotionApi.getQuickPromotions);
    yield put(getQuickPromotionsSuccess(data));
    yield put(editQuickPromotionSuccess());
    yield put(closeQuickPromoModal());
  } catch (error: any) {
    toast.info(error?.message);
    yield put(editQuickPromotionFailure());
  }
}

function* handleDeleteQuickPromotion(action: PayloadAction<number>) {
  try {
    yield call(QuickPromotionApi.deleteQuickPromotion, action.payload);

    toast.info(I18n.t('salesSpecial.deleteSuccess'));

    const { data } = yield call(QuickPromotionApi.getQuickPromotions);
    yield put(getQuickPromotionsSuccess(data));
    yield put(deleteQuickPromotionSuccess());
    yield put(closeQuickPromoModal());
  } catch (error: any) {
    toast.info(error?.message);
    yield put(deleteQuickPromotionFailure());
  }
}

function* watchFetchRequests() {
  yield takeEvery(addQuickPromotion, handleAddQuickPromotion);
  yield takeEvery(editQuickPromotion, handleEditQuickPromotion);
  yield takeEvery(getQuickPromotions, handleGetQuickPromotions);
  yield takeEvery(deleteQuickPromotion, handleDeleteQuickPromotion);
}

export function* quickPromotionSaga() {
  yield all([fork(watchFetchRequests)]);
}