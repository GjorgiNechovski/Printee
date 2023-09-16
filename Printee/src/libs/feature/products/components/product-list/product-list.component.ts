import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../../../models/product.models';
import { ProductFacade } from '../../state/product.state.facade';
import { Router } from '@angular/router';
import { CartService } from 'src/libs/feature/cart/services/cart.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private productFacade: ProductFacade,
    private router: Router,
    private cartService: CartService
  ) {}

  products: Product[] = [];

  ngOnInit(): void {
    this.productFacade
      .getProducts()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((x) => (this.products = x.content));
  }

  putToState(product: Product): void {
    this.router.navigate(['/product', product.uid]);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
