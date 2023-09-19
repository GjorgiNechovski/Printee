import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/libs/feature/authentication/services/authentication.service';
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
    private printStudioFacade: PrintStudioFacade,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.productFacade.fetchProducts();
    this.productFacade.fetchCategories();
    this.printStudioFacade.fetchPrintStudios();
    this.authService.getAuthenticatedUser();
  }

  title = 'Printee';
}
