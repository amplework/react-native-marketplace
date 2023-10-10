import { IVendor, VendorsReview } from 'types/vendors';

export type VendorsState = {
  vendors: Vendors;
};

export type Vendors = {
  vendors: IVendor[];
  loading: boolean;
  vendor: IVendor | null;
  vendorLoading: boolean;
  error: Error | null;
  addEditLoading: boolean;
  deleteLoading: boolean;
  searchResults: IVendor[];
  searchLoading: boolean;
  review: VendorsReview | null;
  reviewLoading: boolean;
};
