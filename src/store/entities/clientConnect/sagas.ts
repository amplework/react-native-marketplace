import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { ClientBlastApi } from 'api/clientBlast';
import { toast } from 'shared/toast';
import { CreateBlastAction } from 'types/clientBlast';

import { createBlast, createBlastFailure, createBlastSuccess } from './slice';

const defaultImageForSocialMedia =
  'https://pbs.twimg.com/profile_images/1440110218852065286/MnWcJKB3_400x400.jpg';

function* handleCreateBlast({ payload }: PayloadAction<CreateBlastAction>) {
  try {
    const { clientBlastPayload, onSuccess } = payload;
    if (typeof clientBlastPayload?.photo === 'string') {
      try {
        yield call(ClientBlastApi.createBlast, clientBlastPayload);
        yield onSuccess(clientBlastPayload?.photo);
        yield put(createBlastSuccess());
      } catch (error: any) {
        toast.info(error?.message);
        yield put(createBlastFailure());
      }
    } else {
      try {
        const { data } = yield call(ClientBlastApi.uploadImage, {
          photo: clientBlastPayload?.photo,
        });
        const bannerImage = data?.url;

        yield call(ClientBlastApi.createBlast, {
          clientSubprofileIds: clientBlastPayload?.clientSubprofileIds,
          shareOneApp: clientBlastPayload.shareOneApp,
          message: clientBlastPayload.message,
          photo: bannerImage || defaultImageForSocialMedia,
        });
        yield onSuccess(bannerImage);
        yield put(createBlastSuccess());
      } catch (error: any) {
        toast.info(error?.message);
        yield put(createBlastFailure());
      }
    }
  } catch (error: any) {
    toast.info(error?.message);
    yield put(createBlastFailure());
  }
}

function* watchFetchRequests() {
  yield takeEvery(createBlast, handleCreateBlast);
}

export function* clientConnectSaga() {
  yield all([fork(watchFetchRequests)]);
}
