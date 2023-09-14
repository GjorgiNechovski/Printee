import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { ProductFacade } from '../state/product.state.facade';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductRouteGuard {
  constructor(
    private productFacade: ProductFacade,
    private router: Router
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.productFacade.getSelectedProduct().map((selectedProduct) => {
      if (selectedProduct === null) {
        return this.router.createUrlTree(['/products']);
      }
      return true;
    });
  }
}
