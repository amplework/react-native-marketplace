import { all, call, fork, put, takeEvery, select } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import I18n from 'locales';
import { toast } from 'shared/toast';
import { capitalize } from 'utils/strings';
import { SalesSpecialApi } from 'api/salesSpecial';
import {
  openAddModal,
  closeAddModal,
  getSalesSpecials,
  getSalesSpecialsSuccess,
  getSalesSpecialsFailure,
  getSalesSpecialById,
  getSalesSpecialByIdSuccess,
  getSalesSpecialByIdFailure,
  getClientSalesSpecials,
  getClientSalesSpecialsSuccess,
  getClientSalesSpecialsFailure,
  loadMoreClientSalesSpecials,
  loadMoreClientSalesSpecialsSuccess,
  loadMoreClientSalesSpecialsFailure,
  getSalesSpecialsByProvider,
  getSalesSpecialsByProviderSuccess,
  getSalesSpecialsByProviderFailure,
  addSaleSpecial,
  addSaleSpecialSuccess,
  addSaleSpecialFailure,
  editSaleSpecial,
  editSaleSpecialSuccess,
  editSaleSpecialFailure,
  deleteSaleSpecial,
  deleteSaleSpecialSuccess,
  deleteSaleSpecialFailure,
  getClientMoreSpecials,
  getClientMoreSpecialsSuccess,
  getClientMoreSpecialsFailure,
  updateSalesSpecial,
} from './slice';
import { salesSpecialSelectors } from './selectors';
import { shareToAllPlatforms } from '../social';
import moment from 'moment';
import { userSelectors } from '../user';

function* handleGetSalesSpecials() {
  try {
    const { data } = yield call(SalesSpecialApi.getSalesSpecials);
    yield put(getSalesSpecialsSuccess(data));
  } catch (error: any) {
    toast.info(error?.message);
    yield put(getSalesSpecialsFailure());
  }
}

function* handleGetSalesSpecialById(action: PayloadAction<any>) {
  try {
    const { data } = yield call(SalesSpecialApi.getSalesSpecialById, action.payload.id);
    yield put(getSalesSpecialByIdSuccess(data));
  } catch (error: any) {
    toast.info(error?.message);
    yield put(getSalesSpecialByIdFailure());
  }
}

function* handleGetClientSalesSpecials() {
  try {
    const { data } = yield call(SalesSpecialApi.getClientSalesSpecials, 0);    
    yield put(getClientSalesSpecialsSuccess(data));
  } catch (error: any) {
    toast.info(error?.message);
    yield put(getClientSalesSpecialsFailure());
  }
}

function* handleGetClientMoreSpecials() {
  try {
    const { data } = yield call(SalesSpecialApi.getClientMoreSpecials);    
    yield put(getClientMoreSpecialsSuccess(data));
  } catch (error: any) {
    toast.info(error?.message);
    yield put(getClientMoreSpecialsFailure());
  }
}

function* handleLoadMoreClientSalesSpecials(action: PayloadAction<any>) {
  try {
    const { data } = yield call(SalesSpecialApi.getClientSalesSpecials, action.payload);
    yield put(loadMoreClientSalesSpecialsSuccess(data));
  } catch (error: any) {
    toast.info(error?.message);
    yield put(loadMoreClientSalesSpecialsFailure());
  }
}

function* handleGetSalesSpecialsByProvider(action: PayloadAction<any>) {
  try {
    const { data } = yield call(SalesSpecialApi.getSalesSpecialsByProvider, action.payload.id);
    yield put(getSalesSpecialsByProviderSuccess(data));
  } catch (error: any) {
    toast.info(error?.message);
    yield put(getSalesSpecialsByProviderFailure());
  }
}

function* handleAddSaleSpecial(action: PayloadAction<any>): any {
  try {
    const user = yield select(userSelectors.user);
    const { data } = yield call(SalesSpecialApi.addSaleSpecial, action.payload);    
    
    toast.info(
      I18n.t('common.messages.creation', {
        entity: I18n.t('common.entities.salesSpecial'),
      }),
    );

    if(data && action?.payload?.sendOfferToSocialMediaPages) {
      let dealPrice = action?.payload?.salePrice;
      let actualPrice = action?.payload?.service?.price;
      let difference = Number(actualPrice) - Number(dealPrice);
      let percentOff = (difference / Number(actualPrice)) * 100;

      let offerText = `Sale Special Offer: ${(Math.round(percentOff * 100) / 100).toFixed(0)}% off on ${action?.payload?.service?.name}.\nTo access this offer book your appointments with\nus on the Alpha Pro app.\n\nApp Download Link:\nhttps://play.google.com/store/apps/details?id=com.alphaPro\n \nPosted on: ${moment().format('llll')}`
      const defaultImageForSocialMedia = "https://pbs.twimg.com/profile_images/1440110218852065286/MnWcJKB3_400x400.jpg"

      yield put(shareToAllPlatforms({
        fbDetails: {
          pageId: user?.fbSocialId,
          pageAccessToken: user?.fbSocialToken,
          message: offerText,
          url: data.presetBanner?.url || defaultImageForSocialMedia
        },
        twitterDetails: {
          data: {
            text: offerText,
          },
          userToken: user?.twiOauthToken,
          userTokenSecret: user?.twiOauthTokenSecret
        },
        instaDetails: {
          pageId: user?.instagramBusinessId,
          pageAccessToken: user?.instagramAccessToken,
          caption: offerText,
          url: data?.presetBanner?.url || defaultImageForSocialMedia
        }
      }));
    }
    
    if (data) {
      const { data } = yield call(SalesSpecialApi.getSalesSpecials);
      yield put(getSalesSpecialsSuccess(data));
      yield put(addSaleSpecialSuccess());
      yield put(closeAddModal());
    }
  } catch (error: any) {    
    toast.info(error?.message);
    yield put(addSaleSpecialFailure());
  }
}

function* handleEditSaleSpecial(action: PayloadAction<any>) {
  try {
    const { id } = yield select(salesSpecialSelectors.saleSpecial);

    yield call(SalesSpecialApi.editSaleSpecial, id, action.payload);
    toast.info(
      I18n.t('common.messages.edition', {
        entity: capitalize(I18n.t('common.entities.salesSpecial')),
      }),
    );

    const { data } = yield call(SalesSpecialApi.getSalesSpecials);
    yield put(getSalesSpecialsSuccess(data));
    yield put(editSaleSpecialSuccess());
    yield put(closeAddModal());
  } catch (error: any) {
    toast.info(error?.message);
    yield put(editSaleSpecialFailure());
  }
}

function* handleUpdateSaleSpecial(action: PayloadAction<any>) {
  try {
    yield call(SalesSpecialApi.updateSaleSpecial, action.payload);
    yield put(getSalesSpecials());
  } catch (error: any) {
    // toast.info(error?.message);
    yield put(editSaleSpecialFailure());
  }
}

function* handleDeleteSaleSpecial(action: PayloadAction<number>) {
  try {
    yield call(SalesSpecialApi.deleteSaleSpecial, action.payload);

    toast.info(I18n.t('salesSpecial.deleteSuccess'));

    const { data } = yield call(SalesSpecialApi.getSalesSpecials);
    yield put(getSalesSpecialsSuccess(data));
    yield put(deleteSaleSpecialSuccess());
    yield put(closeAddModal());
  } catch (error: any) {
    toast.info(error?.message);
    yield put(deleteSaleSpecialFailure());
  }
}

function* watchFetchRequests() {
  yield takeEvery(getSalesSpecials, handleGetSalesSpecials);
  yield takeEvery(getSalesSpecialById, handleGetSalesSpecialById);
  yield takeEvery(getClientSalesSpecials, handleGetClientSalesSpecials);
  yield takeEvery(getClientMoreSpecials, handleGetClientMoreSpecials);
  yield takeEvery(loadMoreClientSalesSpecials, handleLoadMoreClientSalesSpecials);
  yield takeEvery(getSalesSpecialsByProvider, handleGetSalesSpecialsByProvider);
  yield takeEvery(addSaleSpecial, handleAddSaleSpecial);
  yield takeEvery(editSaleSpecial, handleEditSaleSpecial);
  yield takeEvery(updateSalesSpecial, handleUpdateSaleSpecial);
  yield takeEvery(deleteSaleSpecial, handleDeleteSaleSpecial);
}

export function* salesSpecialSaga() {
  yield all([fork(watchFetchRequests)]);
}
