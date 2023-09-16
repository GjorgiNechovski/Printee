import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product-state.actions';
import { map, switchMap } from 'rxjs';
import { ProductService } from '../services/product.service';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private service: ProductService
  ) {}

  fetchProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.fetchProducts),
      switchMap((action) =>
        this.service
          .getProducts(action.productFilter)
          .pipe(
            map((response) =>
              ProductActions.fetchProductsSuccess({ products: response })
            )
          )
      )
    );
  });

  fetchProduct = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.fetchProduct),
      switchMap((action) =>
        this.service
          .getProductByUid(action.productUid)
          .pipe(
            map((response) =>
              ProductActions.fetchProductSuccess({ product: response })
            )
          )
      )
    );
  });

  fetchCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.fetchCategories),
      switchMap(() =>
        this.service
          .getCategories()
          .pipe(
            map((response) =>
              ProductActions.fetchCategoriesSuccess({ categories: response })
            )
          )
      )
    );
  });
}
