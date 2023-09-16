import { PaginatedProducts, Product } from '../../../../models/product.models';

export const PRODUCT__STORE_KEY = 'product-state';

export interface IProductState {
  products: PaginatedProducts | null;
  selectedProduct: Product | null;
}

export const initialState: IProductState = {
  products: null,
  selectedProduct: null,
};
