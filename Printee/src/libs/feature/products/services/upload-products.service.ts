import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/environment/appConfig';

@Injectable({
  providedIn: 'root',
})
export class UploadProductsService {
  constructor(private httpClient: HttpClient) {}

  uploadObject(name: string, description: string, price: number, image: File, stock: number): void {
    const data = new FormData();
    data.append('name', name);
    data.append('description', description);
    data.append('price', price.toString());
    data.append('image', image);
    data.append('stock', stock.toString());

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    this.httpClient.post(apiUrl + '/uploadObject', data, { headers }).subscribe();
  }
}
