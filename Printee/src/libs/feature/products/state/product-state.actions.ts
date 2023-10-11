import { createAction, props } from '@ngrx/store';
import { PaginatedProducts, Product } from '../../../../models/product.models';
import { ProductCategory } from 'src/models/product-category.models';

export const fetchProducts = createAction('[ProductsList] Fetch Products', props<{ productFilter: string | null }>());
export const fetchProductsSuccess = createAction('[ProductsList] Fetch Products Success', props<{ products: PaginatedProducts }>());

export const fetchCategories = createAction('[ProductsList] Fetch Categories');
export const fetchCategoriesSuccess = createAction('[ProductsList] Fetch Categories Success', props<{ categories: ProductCategory[] }>());

export const fetchProduct = createAction('[Product] Fetch Product', props<{ productUid: string }>());
export const fetchProductSuccess = createAction('[Product] Fetch Product Success', props<{ product: Product }>());

export const uploadNewObject = createAction(
  '[Product] Upload New Object',
  props<{
    name: string;
    description: string;
    price: string;
    image: File;
    stock: string;
    category: string;
  }>()
);
export const uploadNewObjectSuccess = createAction('[Product] Upload New Object Success', props<{ product: Product }>());

export const fetchOwnProducts = createAction('[ProductsList] Fetch Own Products');
export const fetchOwnProductsSuccess = createAction('[ProductsList] Fetch Own Products Success', props<{ products: PaginatedProducts }>());
