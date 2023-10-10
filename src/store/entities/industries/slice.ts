import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IIndustry } from 'types/industries';

import { Industries } from './type';

const initialState: Industries = {
  industries: [],
  loading: false,
};

const industries = createSlice({
  name: 'industries',
  initialState,
  reducers: {
    getIndustries: (state) => {
      state.loading = true;
    },
    getIndustriesSuccess: (state, action: PayloadAction<IIndustry[]>) => {
      state.loading = false;
      state.industries = action.payload;
    },
    getIndustriesFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  actions: { getIndustries, getIndustriesFailure, getIndustriesSuccess },
  reducer: industriesReducer,
} = industries;
