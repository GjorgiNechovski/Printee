import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product.models';

export const fetchProducts = createAction('[ProductsList] Fetch Products');

export const fetchProductsSuccess = createAction(
  '[ProductsList] Fetch Products Success',
  props<{ products: Product[] }>()
);

export const putProductInState = createAction(
  '[ProductList] Put Product In State',
  props<{ product: Product }>()
);
