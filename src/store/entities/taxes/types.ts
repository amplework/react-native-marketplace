import { ITax } from 'types/taxes';

export interface ITaxState {
  taxes: ITaxes;
}

export interface ITaxes {
  taxes: ITax[];
  loading: boolean;
  isModalOpened: boolean;
  tax: ITax | null;
  taxLoading: boolean;
}
