import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from 'src/models/product.models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: Product[] = [];
  totalQuantity = 0;
  totalPrice = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((x) => {
      this.products = x;
      this.calculateTotal(); // Calculate totalQuantity and totalPrice when the cart items change
    });
  }

  calculateTotal(): void {
    this.totalQuantity = this.products.reduce((total, product) => total + product.quantity, 0);
    this.totalPrice = this.products.reduce((total, product) => total + product.quantity * product.unitPrice, 0);
  }

  incrementQuantity(product: Product) {
    this.cartService.addToCart(product);
  }

  remove(productToRemove: Product) {
    this.products = this.products.filter((product) => product.id !== productToRemove.id);

    this.cartService.updateCartItems(this.products);

    this.calculateTotal();
  }

  decrementQuantity(productToDecrement: Product) {
    const updatedProducts = [...this.products];

    const index = updatedProducts.findIndex((product) => product.id === productToDecrement.id);

    if (index !== -1) {
      updatedProducts[index].quantity -= 1;

      if (updatedProducts[index].quantity === 0) {
        updatedProducts.splice(index, 1);
      }

      this.cartService.updateCartItems(updatedProducts);

      this.calculateTotal();
    }
  }
}
