import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRequestAppleSignup, IRequestSocialSignup, IRequestToken, IRequestTokenApple, SecureCodePayload } from 'types/auth';
import { SignUpProviderRequest } from 'types/signUpFlow';

import { SignUpProviderInitialState } from './types';

const initialState: SignUpProviderInitialState = {
  accessTokenFacebook: null,
  accessTokenGoogle: null,
  accessTokenApple: null,
  loading: false,
  social: false,
  step: 0,
};

const signUpProvider = createSlice({
  name: 'signUpProvider',
  initialState,
  reducers: {
    changeStepProvider: (state, { payload }: PayloadAction<number>) => {    
      state.step = payload;
      state.social = !payload ? false : state.social;
      state.accessTokenGoogle = !payload ? null : state.accessTokenGoogle;
      state.accessTokenFacebook = !payload ? null : state.accessTokenFacebook;
    },
    signUpProviderAction: (
      state,
      _action: PayloadAction<SignUpProviderRequest>,
    ) => {
      state.loading = true;
    },
    signUpProviderSuccess: (state) => {
      state.loading = false;
    },
    signUpProviderFailure: (state) => {
      state.loading = false;
    },
    signUpProviderGoogle: (_state, _action: PayloadAction<IRequestSocialSignup>) => {},
    signUpProviderGoogleSuccess: (
      state,
      { payload }: PayloadAction<string>,
    ) => {
      state.step = 2;
      state.social = true;
      state.accessTokenGoogle = payload;
    },
    signUpProviderFacebook: (
      _state,
      _action: PayloadAction<IRequestSocialSignup>,
    ) => {},
    signUpProviderFacebookSuccess: (
      state,
      { payload }: PayloadAction<string>,
    ) => {
      state.step = 2;
      state.social = true;
      state.accessTokenFacebook = payload;
    },
    signUpProviderApple: (
      _state,
      _action: PayloadAction<IRequestAppleSignup>,
    ) => {},
    signUpProviderAppleSuccess: (
      state,
      { payload }: PayloadAction<string>,
    ) => {
      state.step = 2;
      state.social = true;
      state.accessTokenApple = payload;
    },
    verifyEmail: (_state, _action: PayloadAction<string>) => {},
    verifySecureCode: (_state, _action: PayloadAction<SecureCodePayload>) => {},
  },
});

export const {
  actions: {
    changeStepProvider,
    signUpProviderAction,
    signUpProviderSuccess,
    signUpProviderFailure,
    signUpProviderGoogle,
    signUpProviderGoogleSuccess,
    signUpProviderFacebook,
    signUpProviderFacebookSuccess,
    signUpProviderApple,
    signUpProviderAppleSuccess,
    verifyEmail,
    verifySecureCode,
  },
  reducer: signUpProviderReducer,
} = signUpProvider;
