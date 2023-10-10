export interface ISaleSpecialState {
  salesSpecials: ISalesSpecials;
}

export interface ISalesSpecials {
  loading: boolean,
  saleSpecialLoading: boolean,
  salesSpecialsLoading: boolean,
  isModalOpened: boolean;
  isSalesDetailModalOpened: boolean;
  salesSpecials: any,
  clientSalesSpecials: any,
  salesSpecialsByProvider: any,
  salesSpecialsDetailsList: any,
  saleSpecial: any | null,
  salesSpecialById: any | null,
}
