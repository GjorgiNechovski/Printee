import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../../../environment/appConfig';
import { PaginatedProducts, Product } from '../../../../models/product.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<PaginatedProducts> {
    return this.httpClient.get<PaginatedProducts>(apiUrl + '/products');
  }

  getProductByUid(uid: string): Observable<Product> {
    return this.httpClient.get<Product>(apiUrl + `/product/${uid}`);
  }
}
