import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CreateProductAction,
  IEditProductRequest,
  IProduct,
} from 'types/products';
import { compareBy } from 'utils/array';

import { IProducts } from './types';

const initialState: IProducts = {
  products: [],
  loading: false,
  isModalOpened: false,
  product: null,
  productLoading: false,
};

const products = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProducts: (state) => {
      state.loading = true;
    },
    getProductsSuccess: (state, action: PayloadAction<IProduct[]>) => {
      state.loading = false;
      state.products = action.payload;
    },
    getProductsFailure: (state) => {
      state.loading = false;
    },
    getProductsById: (state, _action: PayloadAction<any>) => {
      state.loading = true;
    },
    getProductsByIdSuccess: (state, action: PayloadAction<IProduct[]>) => {
      state.loading = false;
      state.products = action.payload;
    },
    getProductsByIdFailure: (state) => {
      state.loading = false;
    },
    openEditModal: (state, action: PayloadAction<IProduct | null>) => {
      state.isModalOpened = true;
      state.product = action.payload;
    },
    closeEditModal: (state) => {
      state.isModalOpened = false;
      state.product = null;
    },
    createProduct: (state, _action: PayloadAction<CreateProductAction>) => {
      state.productLoading = true;
    },
    createProductWebUser: (state, _action: PayloadAction<any>) => {
      state.productLoading = true;
    },
    createProductSuccess: (state, action: PayloadAction<IProduct>) => {
      state.productLoading = false;
      state.products.push(action.payload);
      state.products.sort(compareBy('name'));
    },
    createProductFailure: (state) => {
      state.productLoading = false;
    },
    editProduct: (state, _action: PayloadAction<IEditProductRequest>) => {
      state.productLoading = true;
    },
    editProductSuccess: (state, action: PayloadAction<IProduct>) => {
      state.productLoading = false;

      const index = state.products.findIndex(
        ({ id }) => id === action.payload.id,
      );

      state.products[index] = action.payload;
      state.products.sort(compareBy('name'));
    },
    editProductFailure: (state) => {
      state.productLoading = false;
    },
    toggleActive: (state, { payload }: PayloadAction<IEditProductRequest>) => {
      const index = state.products.findIndex(({ id }) => id === payload.id);

      state.products[index].isActive = payload.isActive;
    },
    toggleActiveFailure: (
      state,
      { payload }: PayloadAction<IEditProductRequest>,
    ) => {
      const index = state.products.findIndex(({ id }) => id === payload.id);

      state.products[index].isActive = !payload.isActive;
    },
    deleteProduct: (state, _action: PayloadAction<number>) => {
      state.productLoading = true;
    },
    deleteProductSuccess: (state, { payload }: PayloadAction<number>) => {
      const index = state.products.findIndex(({ id }) => id === payload);

      state.productLoading = false;
      state.products.splice(index, 1);
    },
    deleteProductFailure: (state) => {
      state.productLoading = false;
    },
    skipServices: (state, _action) => {
      state.productLoading = true;
    },
    skipServicesSuccess: (state) => {
      state.productLoading = false;
    },
    skipServicesFailure: (state) => {
      state.productLoading = false;
    }
  },
});

export const {
  actions: {
    getProducts,
    getProductsFailure,
    getProductsSuccess,
    closeEditModal,
    openEditModal,
    createProduct,
    createProductFailure,
    createProductSuccess,
    editProduct,
    editProductFailure,
    editProductSuccess,
    toggleActive,
    toggleActiveFailure,
    getProductsById,
    getProductsByIdFailure,
    getProductsByIdSuccess,
    deleteProduct,
    skipServices,
    skipServicesSuccess,
    skipServicesFailure,
    createProductWebUser,
    deleteProductFailure,
    deleteProductSuccess,
  },
  reducer: productsReducer,
} = products;
