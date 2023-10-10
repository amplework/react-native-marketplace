import { VendorValues } from "types/vendors";

export const adaptVendor = (vendor: any): VendorValues => ({
  name: vendor?.name,
  email: vendor?.email,
  phoneNumber: vendor?.phoneNumber,
  address: vendor?.address,
  notes: vendor?.notes,
  countryCode: vendor?.countryCode,
});