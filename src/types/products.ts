export type ProductType = 'service' | 'item';

export interface IProduct {
  id: number;
  name: string;
  description: string | null;
  type: ProductType;
  price: number;
  isQuickSale: boolean | null;
  time: number | null;
  isActive: boolean;
  saleSpecial?: any,
}

export type ProductValues = {
  name: string;
  description: string;
  type: ProductType;
  price: string;
  isQuickSale: boolean;
  time: string;
  isActive: boolean;
};

export type CreateProductAction = {
  values: ProductValues;
  onSuccess?: (product: IProduct) => void;
};

export interface IEditProductRequest extends ProductValues {
  id: number;
}

export type ProductSnapshot = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;
};

export type AdditionalProduct = {
  productId: number;
  quantity: number;
  price: number;
};

export type SignUpProduct = {
  name: string;
  description: string;
  type: string;
  price: number;
  isQuickSale: boolean;
  isActive: boolean;
  time: number;
  imageFiles: any[];
};
