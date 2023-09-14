import { Component, OnInit } from '@angular/core';
import { ProductFacade } from 'src/libs/feature/products/state/product.state.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private productFacade: ProductFacade) {}

  ngOnInit(): void {
    this.productFacade.fetchProducts();
  }

  title = 'Printee';
}
