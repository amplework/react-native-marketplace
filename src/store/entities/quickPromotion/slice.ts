import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LIMIT } from 'api';
import _ from 'lodash';
import { IQuickPromotions } from './types';

const initialState: IQuickPromotions = {
  loading: false,
  quickPromotionModal: false,
  quickPromotions: null,
  quickPromotion: null,
};

const quickPromotions = createSlice({
  name: 'salesSpecial',
  initialState,
  reducers: {
    getQuickPromotions: (state) => {
      state.loading = true;
    },
    getQuickPromotionsSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.quickPromotions = _.orderBy(action.payload, 'active', ['desc']);
    },
    getQuickPromotionsFailure: (state) => {
      state.loading = false;
    },
    addQuickPromotion: (state, _action: PayloadAction<any>) => {
      state.loading = true;
    },
    addQuickPromotionSuccess: (state) => {
      state.loading = false;
    },
    addQuickPromotionFailure: (state) => {
      state.loading = false;
    },
    editQuickPromotion: (state, _action: PayloadAction<any>) => {
      state.loading = true;
    },
    editQuickPromotionSuccess: (state) => {
      state.loading = false;
    },
    editQuickPromotionFailure: (state) => {
      state.loading = false;
    },
    openQuickPromoModal: (state, action: PayloadAction<any | null>) => {
      state.quickPromotionModal = true;
      state.quickPromotion = action.payload;
    },
    closeQuickPromoModal: (state) => {
      state.quickPromotionModal = false;
    },
    deleteQuickPromotion: (state, _action: PayloadAction<number>) => {
      state.loading = true;
    },
    deleteQuickPromotionSuccess: (state) => {
      state.loading = false;
    },
    deleteQuickPromotionFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  actions: {
    getQuickPromotions,
    getQuickPromotionsSuccess,
    getQuickPromotionsFailure,
    addQuickPromotion,
    addQuickPromotionSuccess,
    addQuickPromotionFailure,
    editQuickPromotion,
    editQuickPromotionSuccess,
    editQuickPromotionFailure,
    openQuickPromoModal,
    closeQuickPromoModal,
    deleteQuickPromotion,
    deleteQuickPromotionSuccess,
    deleteQuickPromotionFailure
  },
  reducer: quickPromotionReducer,
} = quickPromotions;
