import { IQuickPromoState } from './types';

const all = (state: IQuickPromoState) => state.quickPromotions;

const loading = (state: IQuickPromoState) => all(state).loading;

const quickPromotions = (state: IQuickPromoState) => all(state).quickPromotions;

const quickPromotion = (state: IQuickPromoState) => all(state).quickPromotion;

const isModalOpened = (state: IQuickPromoState) => all(state).quickPromotionModal;


export const quickPromotionSelectors = {
  loading,
  isModalOpened,
  quickPromotion,
  quickPromotions,
};
