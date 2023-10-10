import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FacebookPostParams, InstagramPostParams, PostOnAllPlatformPayload, PostTweetParams, RequestPageTokenParams, TwitterAuthParams, TwitterAuthSuccessParams } from 'types/social';

import { ISocials } from './types';

const initialState: ISocials = {
  socialList: [],
  loading: false,
  oOathToken: null,
  isVisible: false,
  fbPageDetails: null,
  twitterUserId: null,
  isTwitterEnabled: false,
  isFacebookEnabled: false,
  isInstagramEnabled: false,
  twitterAccessToken: null,
  isFacebookModalVisible: false,
  twitterAccessTokenSecret: null,
};

const social = createSlice({
  name: 'social',
  initialState,
  reducers: {
    socialToggle: (state, { payload }: PayloadAction<any>) => {      
      const index = state.socialList.findIndex(({ id }) => id === payload.id);
      state.socialList[index].isActive = payload.isActive;
    },
    isModalOpened: (state, { payload }: PayloadAction<any>) => {            
      state.isVisible = payload?.isVisible;
    },
    isFbModalOpened: (state, { payload }: PayloadAction<any>) => {                  
      state.isFacebookModalVisible = payload?.isVisible;
    },
    isTwitterIntegrated: (state, { payload }: PayloadAction<any>) => {                  
      state.isTwitterEnabled = payload;
    }, 
    isFacebookIntegrated: (state, { payload }: PayloadAction<any>) => {      
      state.isFacebookEnabled = payload;
    }, 
    isInstagramIntegrated: (state, { payload }: PayloadAction<any>) => {            
      state.isInstagramEnabled = payload;
    },
    requestTwitterAuth: (state) => {
      state.loading = true;
      state.oOathToken = null;
    },
    requestTwitterAuthSuccess: (state, action: PayloadAction<any | null>) => {
      state.loading = false;
      state.oOathToken = action.payload;
      state.isVisible = true;
    },
    requestTwitterAuthFailure: (state) => {
      state.loading = false;
      state.oOathToken = null;
    },
    getTwitterAuth: (state, _action: PayloadAction<TwitterAuthParams>) => {
      state.loading = true;
    },
    getTwitterAuthSuccess: (state, action: PayloadAction<TwitterAuthSuccessParams>) => {
      state.loading = false;
      state.twitterAccessToken = action.payload.accessToken;
      state.twitterAccessTokenSecret = action.payload.accessTokenSecret;
      state.twitterUserId = action.payload.userId;
    },
    getTwitterAuthFailure: (state) => {
      state.loading = false;
    },
    shareToTwitter: (state, _action: PayloadAction<PostTweetParams>) => {
      state.loading = true;
    },
    shareToTwitterSuccess: (state) => {
      state.loading = false;
    },
    shareToTwitterFailure: (state) => {
      state.loading = false;
    },
    getPageDetails: (state, _action: PayloadAction<RequestPageTokenParams>) => {
      state.loading = true;
    },
    getPageDetailsSuccess: (state, _action: PayloadAction<any>) => {
      state.loading = false;
      state.fbPageDetails = _action.payload;
    },
    getPageDetailsFailure: (state) => {
      state.loading = false;
    },
    removePageDetails: (state) => {
      state.fbPageDetails = null;
    },
    shareToFbPage: (state, _action: PayloadAction<FacebookPostParams>) => {
      state.loading = true;
    },
    shareToFbPageSuccess: (state) => {
      state.loading = false;
    },
    shareToFbPageFailure: (state) => {
      state.loading = false;
    },
    shareToInstagram: (state, _action: PayloadAction<InstagramPostParams>) => {
      state.loading = true;
    },
    shareToInstagramSuccess: (state) => {
      state.loading = false;
    },
    shareToInstagramFailure: (state) => {
      state.loading = false;
    },
    shareToAllPlatforms: (state, _action: PayloadAction<PostOnAllPlatformPayload>) => {
      state.loading = true;
    },
    shareToAllPlatformsSuccess: (state) => {
      state.loading = false;
    },
    shareToAllPlatformsFailure: (state) => {
      state.loading = false;
    }
  }
});

export const {
  actions: {
    socialToggle,
    isModalOpened,
    isFbModalOpened,
    requestTwitterAuth,
    isTwitterIntegrated,
    isFacebookIntegrated,
    isInstagramIntegrated,
    requestTwitterAuthSuccess,
    requestTwitterAuthFailure,
    shareToTwitter,
    shareToTwitterSuccess,
    shareToTwitterFailure,
    getTwitterAuth,
    getTwitterAuthSuccess,
    getTwitterAuthFailure,
    shareToFbPage,
    shareToFbPageFailure,
    shareToFbPageSuccess,
    shareToInstagram,
    shareToInstagramFailure,
    shareToInstagramSuccess,
    getPageDetails,
    getPageDetailsSuccess,
    getPageDetailsFailure,
    removePageDetails,
    shareToAllPlatforms,
    shareToAllPlatformsSuccess,
    shareToAllPlatformsFailure
  },
  reducer: socialReducer,
} = social;