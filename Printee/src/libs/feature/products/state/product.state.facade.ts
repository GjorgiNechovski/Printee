import { Injectable } from '@angular/core';
import { IProductState } from './product-state.state';
import { Store } from '@ngrx/store';
import * as ProductActions from './product-state.actions';
import * as ProductSelectors from './product-state.selectors';
import { Observable, filter } from 'rxjs';
import { PaginatedProducts, Product } from '../../../../models/product.models';

@Injectable({
  providedIn: 'root',
})
export class ProductFacade {
  public constructor(private readonly store: Store<IProductState>) {}

  public fetchProducts(): void {
    this.store.dispatch(ProductActions.fetchProducts());
  }

  public putSelectedProductInState(product: Product): void {
    this.store.dispatch(ProductActions.putProductInState({ product }));
  }

  public getProducts(): Observable<PaginatedProducts> {
    return this.store
      .select(ProductSelectors.productState)
      .pipe(filter((x): x is PaginatedProducts => !!x));
  }

  public getSelectedProduct(): Observable<Product | null> {
    return this.store.select(ProductSelectors.selectedProduct);
  }
}
