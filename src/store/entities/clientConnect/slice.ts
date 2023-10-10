import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { CreateBlastAction } from 'types/clientBlast';

import { ClientConnect } from './type';

const initialState: ClientConnect = {
  instaShare: false,
  fbShare: false,
  shareWithOther: false,
  shareWithClients: false,
  clientConnect: [],
  clientBlast: null,
  clientSocialMediaPost: null,
  loading: false,
  isModalOpened: false,
  clientChecked: [],
  blastLoading: false,
};

const clientConnect = createSlice({
  name: 'clientReward',
  initialState,
  reducers: {
    getClientConnect: (state, action) => {
      state.loading = true;
    },
    getClientConnectSuccess: (state, action) => {
      state.loading = false;
    },
    getClientConnectFailure: (state, action) => {
      state.loading = false;
    },
    openClientModal: (state) => {
      state.isModalOpened = true;
    },
    closeClientModal: (state) => {
      state.isModalOpened = false;
    },
    setClientBlastList: (state, action) => {
      state.clientChecked = action.payload;
      state.isModalOpened = false;
    },
    resetClientBlastList: (state) => {
      state.clientChecked = [];
    },
    deleteClientChecked: (state, action) => {
      const remainingList = state.clientChecked.filter(
        (item: any) => item.id !== action.payload,
      );
      state.clientChecked = remainingList;
      state.shareWithClients = remainingList?.length
        ? state.shareWithClients
        : false;
    },
    createBlast: (state, _action: PayloadAction<CreateBlastAction>) => {
      state.blastLoading = true;
    },
    createBlastSuccess: (state) => {
      state.blastLoading = false;
    },
    createBlastFailure: (state) => {
      state.blastLoading = false;
    },
    toggleFbShare: (state, _action: PayloadAction<boolean>) => {
      state.fbShare = _action.payload;
    },
    toggleInstaShare: (state, _action: PayloadAction<boolean>) => {
      state.instaShare = _action.payload;
    },
    toggleShareWithOthers: (state, _action: PayloadAction<boolean>) => {
      state.shareWithOther = _action.payload;
    },
    toggleShareOnApp: (state, _action: PayloadAction<boolean>) => {
      state.shareWithClients = _action.payload;
    },
  },
});

export const {
  actions: {
    getClientConnect,
    getClientConnectSuccess,
    getClientConnectFailure,
    openClientModal,
    closeClientModal,
    setClientBlastList,
    resetClientBlastList,
    deleteClientChecked,
    createBlast,
    createBlastSuccess,
    createBlastFailure,
    toggleFbShare,
    toggleInstaShare,
    toggleShareOnApp,
    toggleShareWithOthers,
  },
  reducer: clientConnectdReducer,
} = clientConnect;
