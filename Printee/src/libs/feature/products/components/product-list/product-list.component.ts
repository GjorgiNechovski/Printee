import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../../models/product.models';
import { ProductFacade } from '../../state/product.state.facade';
import { Router } from '@angular/router';
import { CartService } from 'src/libs/feature/cart/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  constructor(
    private productFacade: ProductFacade,
    private router: Router,
    private cartService: CartService
  ) {}

  products: Product[] = [];

  ngOnInit(): void {
    this.productFacade
      .getProducts()
      .subscribe((x) => (this.products = x.content));
  }

  putToState(product: Product): void {
    this.productFacade.putSelectedProductInState(product);
    this.router.navigate(['/product', product.uid]);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
