import { Api } from 'api/api';
import { toast } from 'shared/toast';
import { ApiResponse } from 'types/api';
import { IIndustry } from 'types/industries';
import { IEditProductRequest, IProduct, ProductValues } from 'types/products';
import { IProviderUser } from 'types/users';

const getProducts = (): ApiResponse<IProduct[]> => Api.get('/products');

const getProductsById = (id: number): ApiResponse<IIndustry[]> =>
  Api.get(`/provider/${id}/products`);

const formalizeProduct = (product: ProductValues) => {
  const data = new FormData();

  data.append('isActive', product.isActive);
  data.append('type', product.type);
  data.append('name', product.name);
  data.append('description', product.description);
  data.append('price', product.price);
  data.append('isQuickSale', product.isQuickSale);

  if (product.type === 'service') {
    data.append('time', product.time);
  }

  return data;
};

const createProduct = (product: ProductValues): ApiResponse<IProduct> =>
  Api.post('/product', formalizeProduct(product));

const editProduct = (product: IEditProductRequest): ApiResponse<IProduct> =>
  Api.put(`/product/${product.id}`, formalizeProduct(product));

const deleteProduct = (id: number): ApiResponse<void> =>
  Api.delete(`/product/${id}`);

const skipServices = (profileData: any): ApiResponse<IProviderUser> => {  
  return Api.patch('provider/updateTwitter', profileData, {
    headers: { 'Content-Type': 'application/json' },
  });
}

export const ProductsApi = {
  getProducts,
  getProductsById,
  createProduct,
  editProduct,
  deleteProduct,
  skipServices,
};
