import { Component, OnInit } from '@angular/core';
import { PrintStudioFacade } from 'src/libs/feature/print-studio/state/product.state.facade';
import { ProductFacade } from 'src/libs/feature/products/state/product.state.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private productFacade: ProductFacade,
    private printStudioFacade: PrintStudioFacade
  ) {}

  ngOnInit(): void {
    this.productFacade.fetchProducts();
    this.productFacade.fetchCategories();
    this.printStudioFacade.fetchPrintStudios();
  }

  title = 'Printee';
}
