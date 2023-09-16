import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../../../environment/appConfig';
import { PaginatedProducts, Product } from '../../../../models/product.models';
import { Observable } from 'rxjs';
import { ProductCategory } from 'src/models/product-category.models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getProducts(productFilter: string | null): Observable<PaginatedProducts> {
    if (productFilter) {
      return this.httpClient.get<PaginatedProducts>(
        apiUrl + '/products?' + productFilter
      );
    } else {
      return this.httpClient.get<PaginatedProducts>(apiUrl + '/products');
    }
  }

  getProductByUid(uid: string): Observable<Product> {
    return this.httpClient.get<Product>(apiUrl + `/product/${uid}`);
  }

  getCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(
      apiUrl + '/productCategories'
    );
  }
}
