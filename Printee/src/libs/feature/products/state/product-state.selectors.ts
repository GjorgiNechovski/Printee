import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IProductState, PRODUCT__STORE_KEY } from './product-state.state';

const state = createFeatureSelector<IProductState>(PRODUCT__STORE_KEY);

export const productState = createSelector(state, (state1: IProductState) => state1.products);
export const categories = createSelector(state, (state1: IProductState) => state1.categories);
export const selectedProduct = createSelector(state, (state1: IProductState) => state1.selectedProduct);
export const ownProducts = createSelector(state, (state1: IProductState) => state1.ownProducts);
