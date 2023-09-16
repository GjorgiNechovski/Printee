import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../../../models/product.models';
import { ProductFacade } from '../../state/product.state.facade';
import { Router } from '@angular/router';
import { CartService } from 'src/libs/feature/cart/services/cart.service';
import {
  Subject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  takeUntil,
} from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductCategory } from 'src/models/product-category.models';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  public currentPage = 1;
  public dataLength = 0;
  pageSize = 6;

  searchForm: FormGroup = new FormGroup({
    search: new FormControl<string>(''),
    categories: new FormControl(),
    printStudios: new FormControl(),
  });

  categoriesList = new Array<ProductCategory>();

  constructor(
    private productFacade: ProductFacade,
    private router: Router,
    private cartService: CartService
  ) {}

  products: Product[] = [];

  ngOnInit(): void {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((formValue) => {
        const queryParams: string[] = [];

        if (formValue.categories) {
          queryParams.push(`categoryUid=${formValue.categories}`);
        }

        if (formValue.search) {
          queryParams.push(`printStudioUid=${formValue.numberOfProducts}`);
        }

        const queryString = queryParams.join('&');

        this.productFacade.fetchProducts(queryString);
      });

    combineLatest([
      this.productFacade.getProducts(),
      this.productFacade.getCategories(),
    ])
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(([productsResponse, categories]) => {
        this.products = productsResponse.content;
        this.dataLength = productsResponse.totalElements;
        this.categoriesList = categories;
      });
  }

  putToState(product: Product): void {
    this.router.navigate(['/product', product.uid]);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  getProductsToDisplay(): Product[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    return this.products.slice(startIndex, endIndex);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
