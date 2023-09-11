import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../../../environment/appConfig'
import { Observable } from 'rxjs';
import { ProductCategory } from '../models/product-category.models';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(apiUrl + '/productCategories');
  }
}
