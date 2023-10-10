import { all, call, fork, put, takeEvery, select } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { SocialIntegrationApi } from 'api/social';
import { toast } from 'shared/toast';
import { updateProviderFacebookDetails, updateProviderTwitterDetails } from 'store/actions/provider';
import { FacebookPostParams, InstagramPostParams, PostOnAllPlatformPayload, PostTweetParams, RequestPageTokenParams, TwitterAuthParams } from 'types/social';

import {
  requestTwitterAuth,
  requestTwitterAuthFailure,
  requestTwitterAuthSuccess,
  getTwitterAuthSuccess,
  getTwitterAuthFailure,
  getTwitterAuth,
  shareToTwitter,
  shareToTwitterSuccess,
  shareToTwitterFailure,
  shareToFbPageSuccess,
  shareToFbPageFailure,
  shareToFbPage,
  getPageDetails,
  getPageDetailsSuccess,
  getPageDetailsFailure,
  shareToAllPlatforms,
  isTwitterIntegrated,
  isFacebookIntegrated,
  shareToInstagram,
  shareToInstagramSuccess,
  shareToInstagramFailure
} from './slice';
import { updateSalesSpecial } from '../salesSpecial';

function* handleRequestTwitterAuth() {
  try {
    const { data } = yield call(SocialIntegrationApi.requestTwitterAuthorization);
    var secretTokenArr = data.split('&');
    var oathToken = secretTokenArr[0].substring(secretTokenArr[0].indexOf('=') + 1);

    yield put(requestTwitterAuthSuccess(oathToken));
  } catch (error: any) {
    toast.info(error?.message);
    yield put(requestTwitterAuthFailure());
  }
}

function* handleGetTwitterAuth({
  payload,
}: PayloadAction<TwitterAuthParams>) {
  try {
    const { data } = yield call(SocialIntegrationApi.getTwitterAuthorization, payload);

    var secretTokenArr = data.split('&');
    var oathToken = secretTokenArr[0].substring(secretTokenArr[0].indexOf('=') + 1);
    var oathTokenSecret = secretTokenArr[1].substring(secretTokenArr[1].indexOf('=') + 1);
    var userId = secretTokenArr[2].substring(secretTokenArr[2].indexOf('=') + 1);
    var userName = secretTokenArr[3].substring(secretTokenArr[3].indexOf('=') + 1);

    if (userId) {
      yield put(updateProviderTwitterDetails({
        twiOauthToken: oathToken,
        twiOauthTokenSecret: oathTokenSecret,
        twiUsername: userId,
        twitterLink: `https://www.twitter.com/${userName}`,
        disable: false
      }));
      yield put(isTwitterIntegrated(true));
    }

    yield put(getTwitterAuthSuccess({
      accessToken: oathToken,
      accessTokenSecret: oathTokenSecret,
      userId: userId
    }));

  } catch (error: any) {
    toast.info(error?.message);
    yield put(getTwitterAuthFailure());
  }
}

function* handleShareToTwitter({
  payload,
}: PayloadAction<PostTweetParams>) {
  try {
    const { data } = yield call(SocialIntegrationApi.shareToTwitter, payload);
    if (data) {
      toast.info('Shared to twitter successfully.');
    }
    if(payload?.isSocial == false) {
      yield put(updateSalesSpecial({isSocial: true, id: payload?.id}));
    }
    yield put(shareToTwitterSuccess());
  } catch (error: any) {
    toast.info(error?.message);
    yield put(shareToTwitterFailure());
  }
}

function* handleGetPageDetails({
  payload,
}: PayloadAction<RequestPageTokenParams>) {
  try {
    const { data } = yield call(SocialIntegrationApi.getFbPageDetails, payload);

    yield put(getPageDetailsSuccess(data));
    if (data) {
      yield put(updateProviderFacebookDetails({
        fbSocialToken: data?.access_token,
        fbSocialId: data?.id,
        fbLink: `https://www.facebook.com/${data?.id}`,
        disable: false
      }));
      yield put(isFacebookIntegrated(true));
    }
  } catch (error: any) {
    toast.info(error?.message);
    yield put(getPageDetailsFailure());
  }
}

function* handleShareToFbPage({
  payload,
}: PayloadAction<FacebookPostParams>) {
  try {
    const { data } = yield call(SocialIntegrationApi.shareToFbPage, payload);
    if (data) {
      toast.info('Shared to Fb page successfully.');
    }
    if(payload?.isSocial == false) {
      yield put(updateSalesSpecial({isSocial: true, id: payload?.id}));
    }
    yield put(shareToFbPageSuccess());
  } catch (error: any) {
    toast.info(error?.message);
    yield put(shareToFbPageFailure());
  }
}

function* handleShareToInstagram({
  payload,
}: PayloadAction<InstagramPostParams>) {
  try {
    const { data } = yield call(SocialIntegrationApi.shareToInstagram, payload);

    if (data) {
      toast.info('Shared to Instagram page successfully.');
    }
    if(payload?.isSocial == false) {
      yield put(updateSalesSpecial({isSocial: true, id: payload?.id}));
    }
    yield put(shareToInstagramSuccess());
  } catch (error: any) {
    toast.info(error?.message);
    yield put(shareToInstagramFailure());
  }
}

function* handleShareAllPlatforms({
  payload,
}: PayloadAction<PostOnAllPlatformPayload>) {
  try {
    // if (payload?.twitterDetails?.userToken && payload?.twitterDetails?.userTokenSecret) {
    //   yield call(SocialIntegrationApi.shareToTwitter, payload?.twitterDetails);
    // }

    if (payload?.fbDetails?.pageId && payload?.fbDetails?.pageAccessToken) {
      yield call(SocialIntegrationApi.shareToFbPage, payload?.fbDetails);
    }

    if (payload?.instaDetails?.pageId && payload?.instaDetails?.pageAccessToken) {
      const { data } = yield call(SocialIntegrationApi.createInstagramContainer, payload?.instaDetails);
      if (data?.id) {
        yield call(SocialIntegrationApi.shareToInstagram, {
          pageId: payload?.instaDetails?.pageId,
          pageAccessToken: payload?.instaDetails?.pageAccessToken,
          creationId: data?.id
        });
      }
    }

    toast.info('Shared to all enabled social platforms successfully.');
    
    if(payload?.isSocial == false) {
      yield put(updateSalesSpecial({isSocial: true, id: payload?.id}));
    }

    yield put(shareToFbPageSuccess());
  } catch (error: any) {
    toast.info(error?.message);
    yield put(shareToFbPageFailure());
  }
}

function* watchFetchRequests() {
  yield takeEvery(requestTwitterAuth, handleRequestTwitterAuth);
  yield takeEvery(getTwitterAuth, handleGetTwitterAuth);
  yield takeEvery(shareToTwitter, handleShareToTwitter);
  yield takeEvery(shareToFbPage, handleShareToFbPage);
  yield takeEvery(shareToInstagram, handleShareToInstagram);
  yield takeEvery(getPageDetails, handleGetPageDetails);
  yield takeEvery(shareToAllPlatforms, handleShareAllPlatforms);
}

export function* sociaIntegrationSaga() {
  yield all([fork(watchFetchRequests)]);
}
