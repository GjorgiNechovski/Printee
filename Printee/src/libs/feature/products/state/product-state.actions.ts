import { createAction, props } from '@ngrx/store';
import { PaginatedProducts, Product } from '../../../../models/product.models';

export const fetchProducts = createAction('[ProductsList] Fetch Products');

export const fetchProductsSuccess = createAction(
  '[ProductsList] Fetch Products Success',
  props<{ products: PaginatedProducts }>()
);

export const fetchProduct = createAction(
  '[Product] Fetch Product',
  props<{ productUid: string }>()
);

export const fetchProductSuccess = createAction(
  '[Product] Fetch Product Success',
  props<{ product: Product }>()
);
