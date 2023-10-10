import { IIndustry } from 'types/industries';

export type IndustriesState = {
  industries: Industries;
};

export type Industries = {
  industries: IIndustry[];
  loading: boolean;
};
