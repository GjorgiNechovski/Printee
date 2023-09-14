import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/libs/feature/cart/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.css'],
})
export class CartIconComponent implements OnInit {
  price = 0;
  constructor(
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.price.subscribe((x) => (this.price = x));
  }

  openCart(): void {
    this.router.navigate(['/cart']);
  }
}
