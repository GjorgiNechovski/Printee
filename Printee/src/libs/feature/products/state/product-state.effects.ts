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
      switchMap(() =>
        this.service
          .getProducts()
          .pipe(
            map((response) =>
              ProductActions.fetchProductsSuccess({ products: response })
            )
          )
      )
    );
  });
}
