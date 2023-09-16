import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../../../models/product.models';
import { ProductFacade } from '../../state/product.state.facade';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from 'src/libs/feature/cart/services/cart.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
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
    this.checkIfProductExists();
  }

  checkIfProductExists(): void {
    const uid = window.location.href.split('/')[4];

    this.productFacade.fetchProductByUid(uid);

    this.productFacade
      .getProducts()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((products) => {
        const foundProduct = products.content.find(
          (product: Product) => product.uid === uid
        );

        if (foundProduct) {
          this.product = foundProduct;
        } else {
          this.router.navigate(['/products']);
        }
      });
  }

  addToCart(): void {
    this.cartService.addMultipleToCart(
      this.product,
      this.productForm.controls['numberOfProducts'].value
    );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
