import { IProduct } from 'types/products';

export interface IProductsState {
  products: IProducts;
}

export interface IProducts {
  products: IProduct[];
  loading: boolean;
  isModalOpened: boolean;
  product: IProduct | null;
  productLoading: boolean;
}
