export interface ITaxHistory {
  effectiveEndDate: string;
  effectiveStartDate: string;
  rate: number;
}

export interface ITax {
  id: number;
  shortName: string;
  description: string;
  rate: number;
  shouldApplyToTransactions: boolean | null;
  effectiveDate?: string | null;
  rateHistory: ITaxHistory[] | null;
}

export type TaxValues = {
  shortName: string;
  description: string;
  rate: number | string;
  shouldApplyToTransactions: boolean | null;
  effectiveDate?: string | null;
};

export interface IEditTaxRequest extends TaxValues {
  id: number;
}

export type TaxSnapshot = {
  id: number;
  rate: number;
  shortName: string;
};
