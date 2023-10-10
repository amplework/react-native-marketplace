import { IService } from './service';

export type IndustryName =
  | 'Art & Design'
  | 'Automotive'
  | 'Delivery Service'
  | 'Cleaning Service'
  | 'Education'
  | 'Entertainment'
  | 'Food Service'
  | 'General Service'
  | 'Hair & Beauty'
  | 'Health & Fitness'
  | 'Other';

export interface IIndustry {
  id: number;
  name: IndustryName;
  services: IService[];
  position: number | null;
}
