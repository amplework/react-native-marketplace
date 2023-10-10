import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { ClientReward } from './types';

const initialState: ClientReward = {
  clientReward: [],
  clientBirthdayReward: null,
  clientLoyaltyReward: null,
  loading: false,
};

const clientReward = createSlice({
  name: 'clientReward',
  initialState,
  reducers: {
    getClientReward: (state, _action: PayloadAction<any>) => {
      state.loading = true;
    },
    getClientRewardSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      if (action.payload.type == 'birthday') {
        state.clientBirthdayReward = action.payload;
      } else if (action.payload.type == 'loyalty') {
        state.clientLoyaltyReward = action.payload;
      }
    },
    getClientRewardFailure: (state) => {
      state.loading = false;
    },

    addClientReward: (state, _action: PayloadAction<any>) => {
      state.loading = true;
    },
    addClientRewardSuccess: (state) => {
      state.loading = false;
    },
    addClientRewardFailure: (state) => {
      state.loading = false;
    },

    updateClientReward: (state, _action: PayloadAction<any>) => {
      state.loading = true;
    },
    updateClientRewardSuccess: (state) => {
      state.loading = false;
    },
    updateClientRewardFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  actions: {
    getClientReward,
    getClientRewardFailure,
    getClientRewardSuccess,
    addClientReward,
    addClientRewardSuccess,
    addClientRewardFailure,
    updateClientReward,
    updateClientRewardFailure,
    updateClientRewardSuccess,
  },
  reducer: clientRewardReducer,
} = clientReward;
