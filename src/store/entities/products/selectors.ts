import { IProductsState } from './types';

const all = (state: IProductsState) => state.products;

const products = (state: IProductsState) => all(state).products;

const loading = (state: IProductsState) => all(state).loading;

const isModalOpened = (state: IProductsState) => all(state).isModalOpened;

const product = (state: IProductsState) => all(state).product;

const productLoading = (state: IProductsState) => all(state).productLoading;

export const productsSelectors = {
  products,
  loading,
  isModalOpened,
  product,
  productLoading,
};
