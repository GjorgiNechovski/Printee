import { Injectable } from '@angular/core';
import { IProductState } from './product-state.state';
import { Store } from '@ngrx/store';
import * as ProductActions from './product-state.actions';
import * as ProductSelectors from './product-state.selectors';
import { Observable } from 'rxjs';
import { Product } from '../models/product.models';

@Injectable({
  providedIn: 'root',
})
export class ProductFacade {
  public constructor(private readonly store: Store<IProductState>) {}

  public fetchProducts(): void {
    this.store.dispatch(ProductActions.fetchProducts());
  }

  public getProducts(): Observable<Product[]> {
    return this.store.select(ProductSelectors.productState);
  }
}
