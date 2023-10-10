import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DeleteVendorPayload,
  EditVendorPayload,
  GetVendorRequest,
  GetVendorsRequest,
  IVendor,
  VendorsReview,
  VendorValues,
} from 'types/vendors';

import { Vendors } from './types';

const initialState: Vendors = {
  vendors: [],
  loading: false,
  vendor: null,
  vendorLoading: false,
  error: null,
  addEditLoading: false,
  deleteLoading: false,
  searchResults: [],
  searchLoading: false,
  review: null,
  reviewLoading: false,
};

const vendors = createSlice({
  name: 'vendors',
  initialState,
  reducers: {
    getVendors: (
      state,
      _action: PayloadAction<GetVendorsRequest>,
    ) => {
      state.loading = true;
    },
    getVendorsSuccess: (state, { payload }: PayloadAction<IVendor[]>) => {
      state.loading = false;
      state.vendors = payload;
    },
    getVendorsFailure: (state) => {
      state.loading = false;
    },
    getVendor: (state, _action: PayloadAction<GetVendorRequest>) => {
      state.vendorLoading = true;
    },
    getVendorSuccess: (state, { payload }: PayloadAction<IVendor>) => {
      state.vendorLoading = false;
      state.vendor = payload;
    },
    getVendorFailure: (state, { payload }: PayloadAction<Error>) => {
      state.vendorLoading = false;
      state.error = payload;
    },
    createVendor: (state, _action: PayloadAction<VendorValues>) => {
      state.addEditLoading = true;
    },
    createVendorSuccess: (state) => {
      state.addEditLoading = false;
    },
    createVendorFailure: (state) => {
      state.addEditLoading = false;
    },
    editVendor: (state, _action: PayloadAction<EditVendorPayload>) => {
      state.addEditLoading = true;
    },
    editVendorSuccess: (state) => {
      state.addEditLoading = false;
    },
    editVendorFailure: (state) => {
      state.addEditLoading = false;
    },
    deleteVendor: (state, _action: PayloadAction<DeleteVendorPayload>) => {
      state.deleteLoading = true;
    },
    deleteVendorSuccess: (state) => {
      state.deleteLoading = false;
    },
    deleteVendorFailure: (state) => {
      state.deleteLoading = false;
    },
    searchVendors: (state, _action: PayloadAction<GetVendorsRequest>) => {
      state.searchLoading = true;
    },
    searchVendorsSuccess: (state, { payload }: PayloadAction<IVendor[]>) => {
      state.searchLoading = false;
      state.searchResults = payload;
    },
    searchVendorsFailure: (state) => {
      state.searchLoading = false;
    },
    resetSearchResults: (state) => {
      state.searchResults = [];
    },
    getVendorsReview: (state) => {
      state.reviewLoading = true;
    },
    getVendorsReviewSuccess: (
      state,
      { payload }: PayloadAction<VendorsReview>,
    ) => {
      state.reviewLoading = false;
      state.review = payload;
    },
    getVendorsReviewFailure: (state) => {
      state.reviewLoading = false;
    },
  },
});

export const {
  actions: {
    getVendors,
    getVendorsFailure,
    getVendorsSuccess,
    getVendor,
    getVendorFailure,
    getVendorSuccess,
    createVendor,
    createVendorFailure,
    createVendorSuccess,
    editVendor,
    editVendorFailure,
    editVendorSuccess,
    deleteVendor,
    deleteVendorFailure,
    deleteVendorSuccess,
    searchVendors,
    searchVendorsFailure,
    searchVendorsSuccess,
    resetSearchResults,
    getVendorsReview,
    getVendorsReviewFailure,
    getVendorsReviewSuccess,
  },
  reducer: vendorsReducer,
} = vendors;
