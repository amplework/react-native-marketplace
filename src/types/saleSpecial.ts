export type SaleSpecialProduct = {
  active: boolean;
  actualPrice: number;
  bgColor: string | null;
  date: string | null;
  id: number;
  isCombination: boolean;
  isDateRestrication: boolean;
  isDayRestrication: boolean;
  isExistingClient: boolean;
  isExpired: boolean;
  isSocial: boolean;
  isTimeRestrication: boolean;
  restricationDay: string[];
  restricationEndDate: string | null;
  restricationEndTime: string | null;
  restricationStartDate: string | null;
  restricationStartTime: string | null;
  saleDescription: string;
  salePrice: number;
  saleShareWithClientApp: boolean;
  saleToday: boolean;
  title: string;
}

export type SaleSpecialList = SaleSpecialProduct[]





