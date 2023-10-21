import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl, headers } from '../../../../environment/appConfig';
import { PaginatedProducts, Product } from '../../../../models/product.models';
import { Observable, switchMap } from 'rxjs';
import { ProductCategory } from 'src/models/product-category.models';
import { AuthenticationService } from '../../authentication/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthenticationService
  ) {}

  getProducts(productFilter: string | null): Observable<PaginatedProducts> {
    if (productFilter) {
      return this.httpClient.get<PaginatedProducts>(apiUrl + '/products?' + productFilter);
    } else {
      return this.httpClient.get<PaginatedProducts>(apiUrl + '/products');
    }
  }

  getProductByUid(uid: string): Observable<Product> {
    return this.httpClient.get<Product>(apiUrl + `/product/${uid}`);
  }

  getCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(apiUrl + '/productCategories');
  }

  getOwnProducts(): Observable<PaginatedProducts> {
    return this.authService.user.pipe(
      switchMap((user) => {
        if (user?.role === 'user') {
          return this.httpClient.get<PaginatedProducts>(apiUrl + '/productsByUser/' + user?.uid);
        }
        {
          return this.httpClient.get<PaginatedProducts>(apiUrl + '/productsByPrintStudio/' + user?.uid);
        }
      })
    );
  }

  editProduct(uid: string, changes: Product): Observable<Product> {
    return this.httpClient.patch<Product>(apiUrl + `/${uid}/edit`, changes, { headers });
  }

  deleteProduct(uid: string): Observable<void> {
    return this.httpClient.delete<void>(apiUrl + `/${uid}/delete`);
  }

  changeProductImage(productUid: string, image: File): Observable<void> {
    const form = new FormData();

    form.append('image', image);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.httpClient.patch<void>(apiUrl + `/${productUid}/changeImage`, form, { headers });
  }
}
