import { Injectable } from '@angular/core';
import { Product } from '../../../../models/product.models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private priceSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public price: Observable<number> = this.priceSubject.asObservable();

  private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public products$: Observable<Product[]> = this.productsSubject.asObservable();

  public addToCart(product: Product): void {
    this.productsSubject.next([...this.productsSubject.value, product]);
    this.calculatePrice();
  }

  public addMultipleToCart(product: Product, amount: number): void {
    const updatedProducts = [...this.productsSubject.value];

    for (let i = 0; i < amount; i++) {
      updatedProducts.push(product);
    }

    this.productsSubject.next(updatedProducts);
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
