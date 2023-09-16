import { Product } from '../../../../models/product.models';

export const PRODUCT__STORE_KEY = 'product-state';

export interface IProductState {
  products: Product[];
  selectedProduct: Product | null;
}

export const initialState: IProductState = {
  products: [],
  selectedProduct: null,
};
