import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../../models/product.models';
import { ProductFacade } from '../../state/product.state.facade';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from 'src/libs/feature/cart/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  product!: Product;

  productForm: FormGroup = new FormGroup({
    numberOfProducts: new FormControl(1),
  });

  constructor(
    private productFacade: ProductFacade,
    private router: Router,
    private cartService: CartService
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

  addToCart(): void {
    console.log('called');

    this.cartService.addMultipleToCart(
      this.product,
      this.productForm.controls['numberOfProducts'].value
    );
  }
}
