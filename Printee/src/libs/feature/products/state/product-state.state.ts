import { ProductCategory } from 'src/models/product-category.models';
import { PaginatedProducts, Product } from '../../../../models/product.models';

export const PRODUCT__STORE_KEY = 'product-state';

export interface IProductState {
  products: PaginatedProducts | null;
  categories: ProductCategory[];
  selectedProduct: Product | null;
  ownProducts: PaginatedProducts | null;
}

export const initialState: IProductState = {
  products: null,
  categories: [],
  selectedProduct: null,
  ownProducts: null,
};
