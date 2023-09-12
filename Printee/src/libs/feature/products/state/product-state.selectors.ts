import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IProductState, PRODUCT__STORE_KEY } from './product-state.state';

const state = createFeatureSelector<IProductState>(PRODUCT__STORE_KEY);

export const productState = createSelector(
  state,
  (state1: IProductState) => state1.products
);
