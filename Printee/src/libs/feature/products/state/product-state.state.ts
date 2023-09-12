import { Product } from '../models/product.models';

export const PRODUCT__STORE_KEY = 'product-state';

export interface IProductState {
  products: Product[];
}

export const initialState: IProductState = {
  products: [],
};
