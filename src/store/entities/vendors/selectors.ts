import { VendorsState } from './types';

const all = (state: VendorsState) => state.vendors;

const vendors = (state: VendorsState) => all(state).vendors;

const loading = (state: VendorsState) => all(state).loading;

const vendor = (state: VendorsState) => all(state).vendor;

const vendorLoading = (state: VendorsState) => all(state).vendorLoading;

const error = (state: VendorsState) => all(state).error;

const addEditLoading = (state: VendorsState) => all(state).addEditLoading;

const deleteLoading = (state: VendorsState) => all(state).deleteLoading;

const searchResults = (state: VendorsState) => all(state).searchResults;

const searchLoading = (state: VendorsState) => all(state).searchLoading;

const vendorsReview = (state: VendorsState) => all(state).review;

const reviewLoading = (state: VendorsState) => all(state).reviewLoading;

export const vendorsSelectors = {
  vendors,
  loading,
  vendor,
  vendorLoading,
  error,
  addEditLoading,
  deleteLoading,
  searchResults,
  searchLoading,
  vendorsReview,
  reviewLoading,
};
