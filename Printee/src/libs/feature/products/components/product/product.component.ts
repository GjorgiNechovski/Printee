import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.models';
import { ProductFacade } from '../../state/product.state.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  product!: Product;
  constructor(
    private productFacade: ProductFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productFacade.getSelectedProduct().subscribe((x) => this.checkNull(x));
  }

  checkNull(x: Product | null): void {
    if (x) {
      this.product = x;
    } else {
      this.productFacade.getProducts().subscribe((products) => {
        const url = window.location.href.split('/')[4];
        const foundProduct = products.find((product) => product.uid === url);

        if (foundProduct) {
          this.product = foundProduct;
        } else {
          this.router.navigate(['/products']);
        }
      });
    }
  }
}
