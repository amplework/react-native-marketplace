import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BottomMenu } from 'types/settings';

import { BottomMenuSlice } from './types';

const initialState: BottomMenuSlice = {
  settings: {
    bottomMenuSettings: 'clients',
  },
  loading: false,
};

const bottomMenu = createSlice({
  name: 'bottomMenu',
  initialState,
  reducers: {
    setBottomMenuSettings: (state, { payload }: PayloadAction<BottomMenu>) => {
      state.settings = payload;
    },
    editBottomMenuSettings: (state, _action: PayloadAction<BottomMenu>) => {
      state.loading = true;
    },
    editBottomMenuSettingsSuccess: (state) => {
      state.loading = false;
    },
    editBottomMenuSettingsFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  actions: {
    setBottomMenuSettings,
    editBottomMenuSettings,
    editBottomMenuSettingsFailure,
    editBottomMenuSettingsSuccess,
  },
  reducer: bottomMenuReducer,
} = bottomMenu;
