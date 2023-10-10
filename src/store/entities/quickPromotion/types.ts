export interface IQuickPromoState {
  quickPromotions: IQuickPromotions;
}

export interface IQuickPromotions {
  loading: boolean,
  quickPromotionModal: boolean,
  quickPromotions: any,
  quickPromotion: any,
}
