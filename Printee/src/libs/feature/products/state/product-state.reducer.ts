import { createReducer, on } from '@ngrx/store';
import { initialState } from './product-state.state';
import * as ProductActions from './product-state.actions';

export const ProductReducer = createReducer(
  initialState,
  on(ProductActions.fetchProductsSuccess, (state, { products }) => {
    return {
      ...state,
      products: products,
    };
  }),
  on(ProductActions.fetchProductSuccess, (state, { product }) => {
    return {
      ...state,
      selectedProduct: product,
    };
  }),
  on(ProductActions.fetchCategoriesSuccess, (state, { categories }) => {
    return {
      ...state,
      categories: categories,
    };
  })
);
