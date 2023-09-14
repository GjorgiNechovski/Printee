import { Injectable } from '@angular/core';
import { Product } from '../../products/models/product.models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private priceSubject: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );
  public price: Observable<number> = this.priceSubject.asObservable();

  private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([]);
  public products$: Observable<Product[]> = this.productsSubject.asObservable();

  public addToCart(product: Product): void {
    this.productsSubject.next([...this.productsSubject.value, product]);
    this.calculatePrice();
  }

  private calculatePrice(): void {
    let totalPrice = 0;
    this.productsSubject.value.forEach((x) => {
      totalPrice += x.unitPrice;
    });
    this.priceSubject.next(totalPrice);
  }
}
