import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl, headers } from 'src/environment/appConfig';

@Injectable({
  providedIn: 'root',
})
export class UploadProductsService {
  constructor(private httpClient: HttpClient) {}

  uploadObject(name: string, description: string, price: number, image: File, stock: number): void {
    const object = { name: name, description: description, price: price, image: image, stock: stock };
    this.httpClient.post(apiUrl + '/uploadObject', object, { headers }).subscribe();
  }
}
