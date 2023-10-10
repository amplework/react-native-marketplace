import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Storage } from 'service/localStorage/localStorage';
import { toast } from 'shared/toast';
import { IRequestToken, IRequestTokenApple, SecureCodePayload } from 'types/auth';
import { Credentials, User } from 'types/users';
import { FIRST_LOGIN } from 'utils/constants';

import { UserInitialState } from './types';

const initialState: UserInitialState = {
  user: undefined,
  loading: false,
  tab: 0,
  utcOffset: 120,
  utctimezone:"",
  isWebUser: undefined,
  webUserData: undefined,
  deviceInfo: undefined,
  countryCodeModal: false,
};

async function checkIfFirstLogin(state: any) {
    try {
      const firstLogin = Storage.get(FIRST_LOGIN);
      firstLogin.then((res: any) => {
        if (res !== null) {  
          let response = JSON.parse(res) 
          const found = response.some((el: any) => el.id === state?.id);  
          if(found) {
            return;
          } else {
            state && toast.info(`Hello ${state?.firstName}, Welcome to AlphaPro!`);
          }    
        } else {
          state && toast.info(`Hello ${state?.firstName}, Welcome to AlphaPro!`);
        }
      });      
    } catch (error) {
      return false;
    }
  }

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state) => {
      state.loading = true;
    },
    getUserSuccess: (state, { payload }: PayloadAction<User>) => {
      state.loading = false;
      state.user = payload;
      state.utcOffset = payload.utcOffset;
      state.utctimezone = payload.utctimezone;
      checkIfFirstLogin(payload);
    },
    getUserFailure: (state) => {
      state.loading = false;
    },
    userPlatformWeb: (state) => {
      state.isWebUser = true;
    },
    userPlatformMobile: (state) => {
      state.isWebUser = false;
    },
    verifyWebUser: (_state, _action: PayloadAction<SecureCodePayload>) => {},
    resendCodeWebUser: (state, _action: PayloadAction<Credentials>) => {},
    verifyWebUserSuccess: (state, {payload}) => {
      state.loading = false;
      state.webUserData = payload;
    },
    verifyWebUserFailure: (state) => {
      state.loading = false;
    },
    updateTimezone: (state, action: PayloadAction<number>) => {
      state.utcOffset = action.payload;
    },
    signIn: (state, _action: PayloadAction<Credentials>) => {
      state.loading = true;
    },
    signInGoogle: (state, _action: PayloadAction<IRequestToken>) => {
      state.loading = true;
    },
    signInFacebook: (state, _action: PayloadAction<IRequestToken>) => {
      state.loading = true;
    },
    signInApple: (state, _action: PayloadAction<IRequestTokenApple>) => {
      state.loading = true;
    },
    authSuccess: (state) => {
      state.loading = false;
    },
    authFailure: (state) => {
      state.loading = false;
    },
    logout: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.user = undefined;
      state.loading = false;
    },
    logoutFailure: (state) => {
      state.loading = false;
    },
    changeTab: (state, { payload }: PayloadAction<number>) => {
      state.tab = payload;
    },
    getDeviceInfo: () => {
      // state.deviceInfo = payload;
    },
    getDeviceInfoSuccess: (state, { payload }: PayloadAction<any>) => {
      state.deviceInfo = payload;
    },
    openCountryModal: (state) => {
      state.countryCodeModal = true;
    },
    closeCountryModal: (state) => {
      state.countryCodeModal = false;
    },
    updateUserDetails: (state, { payload }: any) => {
      state.user = payload;
    },
    deleteAccount: (state) => {
      state.loading = true;
    },
    deleteAccountSuccess: (state) => {
      state.user = undefined;
      state.loading = false;
    },
    deleteAccountFailure: (state) => {
      state.loading = false;
    }
  },
});

export const {
  actions: {
    getUser,
    getUserFailure,
    getUserSuccess,
    signIn,
    signInGoogle,
    signInFacebook,
    signInApple,
    authFailure,
    authSuccess,
    logout,
    logoutFailure,
    logoutSuccess,
    changeTab,
    userPlatformWeb,
    userPlatformMobile,
    updateTimezone,
    verifyWebUser,
    resendCodeWebUser,
    verifyWebUserFailure,
    verifyWebUserSuccess,
    getDeviceInfo,
    getDeviceInfoSuccess,
    openCountryModal,
    closeCountryModal,
    updateUserDetails,
    deleteAccount,
    deleteAccountSuccess,
    deleteAccountFailure,
  },
  reducer: userReducer,
} = user;
