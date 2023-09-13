import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.models';
import { ProductFacade } from '../../state/product.state.facade';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  constructor(private productFacade: ProductFacade) {}

  products: Product[] = [];

  ngOnInit(): void {
    this.productFacade.fetchProducts();
    this.productFacade.getProducts().subscribe((x) => (this.products = x));
  }

  putToState(product: Product): void {
    this.productFacade.putSelectedProductInState(product);
  }
}
