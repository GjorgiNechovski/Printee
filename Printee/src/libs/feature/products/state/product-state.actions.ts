import { createAction, props } from '@ngrx/store';
import { PaginatedProducts, Product } from '../../../../models/product.models';

export const fetchProducts = createAction('[ProductsList] Fetch Products');

export const fetchProductsSuccess = createAction(
  '[ProductsList] Fetch Products Success',
  props<{ products: PaginatedProducts }>()
);

export const putProductInState = createAction(
  '[ProductList] Put Product In State',
  props<{ product: Product }>()
);
