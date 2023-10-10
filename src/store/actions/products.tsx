import * as type from 'store/types';

export function getProducts(action: { type: string }) {
  return {
    type: type.GET_PRODUCTS_APPOINTMENT,
    action,
  };
}

export function getProductsById(action: any) {
  return {
    type: type.GET_PRODUCTS_BY_ID,
    action,
  };
}
