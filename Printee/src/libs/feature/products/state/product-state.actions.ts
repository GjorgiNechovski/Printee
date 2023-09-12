import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product.models';

export const fetchProducts = createAction('[Products] Fetch Products');
export const fetchProductsSuccess = createAction(
  '[Products] Fetch Products Success',
  props<{ products: Product[] }>()
);
