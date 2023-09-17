import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { apiUrl } from 'src/environment/appConfig';
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
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    // this.productFacade.fetchProducts();
    // this.productFacade.fetchCategories();
    // this.printStudioFacade.fetchPrintStudios();

    const credentials = {
      email: 'user1@printstudio.com',
      password: 'password1',
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    this.httpClient.post(apiUrl + '/login', credentials, httpOptions).forEach((x) => console.log(x));
  }

  title = 'Printee';
}
