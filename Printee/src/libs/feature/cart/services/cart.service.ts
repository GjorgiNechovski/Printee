import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/models/product.models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public cartItems$: Observable<Product[]> = this.cartItemsSubject.asObservable();

  private totalPriceSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public totalPrice$: Observable<number> = this.totalPriceSubject.asObservable();

  getCartItems(): Product[] {
    return this.cartItemsSubject.value;
  }

  getTotalPrice(): number {
    return this.totalPriceSubject.value;
  }

  addToCart(product: Product, quantity = 1) {
    const currentCartItems = this.getCartItems();
    const existingCartItemIndex = currentCartItems.findIndex((item) => item.id === product.id);

    if (existingCartItemIndex !== -1) {
      currentCartItems[existingCartItemIndex].quantity += quantity;
    } else {
      const productWithQuantity = { ...product, quantity };
      currentCartItems.push(productWithQuantity);
    }

    const newTotalPrice = currentCartItems.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
    this.totalPriceSubject.next(newTotalPrice);

    this.cartItemsSubject.next([...currentCartItems]);
  }

  updateCartItems(updatedCartItems: Product[]) {
    const newTotalPrice = updatedCartItems.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
    this.totalPriceSubject.next(newTotalPrice);

    this.cartItemsSubject.next([...updatedCartItems]);
  }
}
