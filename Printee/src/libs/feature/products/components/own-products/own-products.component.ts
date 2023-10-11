import { Component, OnInit } from '@angular/core';
import { ProductFacade } from '../../state/product.state.facade';
import { Product } from 'src/models/product.models';

@Component({
  selector: 'app-own-products',
  templateUrl: './own-products.component.html',
  styleUrls: ['./own-products.component.css'],
})
export class OwnProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productFacade: ProductFacade) {}

  ngOnInit(): void {
    this.productFacade.fetchOwnProducts();
    this.productFacade.getOwnProducts().subscribe((x) => (this.products = x.content));
  }
}
