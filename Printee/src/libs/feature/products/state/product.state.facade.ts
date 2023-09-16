import { Injectable } from '@angular/core';
import { IProductState } from './product-state.state';
import { Store } from '@ngrx/store';
import * as ProductActions from './product-state.actions';
import * as ProductSelectors from './product-state.selectors';
import { Observable, filter } from 'rxjs';
import { PaginatedProducts, Product } from '../../../../models/product.models';
import { ProductCategory } from 'src/models/product-category.models';

@Injectable({
  providedIn: 'root',
})
export class ProductFacade {
  public constructor(private readonly store: Store<IProductState>) {}

  public fetchProducts(productFilter: string | null = null): void {
    this.store.dispatch(
      ProductActions.fetchProducts({ productFilter: productFilter })
    );
  }

  public fetchProductByUid(uid: string): void {
    this.store.dispatch(ProductActions.fetchProduct({ productUid: uid }));
  }

  public fetchCategories(): void {
    this.store.dispatch(ProductActions.fetchCategories());
  }

  public getCategories(): Observable<ProductCategory[]> {
    return this.store
      .select(ProductSelectors.categories)
      .pipe(filter((x): x is ProductCategory[] => !!x));
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
