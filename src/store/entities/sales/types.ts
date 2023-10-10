import { Meta } from 'types/api';
import { Sale } from 'types/sales';

export interface SalesState {
  sales: Sales;
}

export interface Sales {
  sales: Sale[];
  totalSum: number;
  meta: Meta;
  sale: Sale | null;
  loading: boolean;
  updateSalePaymentStatusLoading?: boolean;
}
