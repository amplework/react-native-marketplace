import { IPlace } from 'types/address';
import { IAppointment } from 'types/appointments';
import { Estimate } from 'types/estimates';
import { Invoice } from 'types/invoices';
import { PaymentPreview } from 'types/payments';
import { Sale } from 'types/sales';
import { IProvider, IProviderPublicProfile } from 'types/users';

export interface IProvidersState {
  providers: IProviders;
}

export interface IProviders {
  providers: IProvider[];
  blockedProviders: IProvider[];
  loading: boolean;
  refreshing: boolean;
  offset: number;
  total: number;
  shortlistLoading: boolean;
  provider: IProviderPublicProfile | null;
  providerLoading: boolean;
  providerError: Error | null;
  appointments: PaginationList<IAppointment>;
  search: ISearch;
  salesSpecialsByProviders: ISalesSpecialsByProviders;
  invoices: PaginationList<Invoice>;
  estimates: PaginationList<Estimate>;
  sales: PaginationList<Sale>;
  payments: PaginationList<PaymentPreview>;
  providerPlanId?: any;
  locationFilter?: boolean;
}

interface ISearch {
  list: IProvider[];
  loading: boolean;
  loadingMore: boolean;
  offset: number;
  total: number;
  place: IPlace | null;
  previousPlaces: IPlace[];
  isModalOpened: boolean;
}

interface ISalesSpecialsByProviders {
  list: any;
  loading: boolean;
}

type PaginationList<T> = {
  list: T[];
  loading: boolean;
  refreshing: boolean;
  offset: number;
  total: number;
  refundRequestOnPaymentLoading?: boolean;
};
