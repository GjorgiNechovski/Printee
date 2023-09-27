import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl, headers } from 'src/environment/appConfig';
import { UploadObject } from '../models/upload.models';

@Injectable({
  providedIn: 'root',
})
export class UploadProductsService {
  constructor(private httpClient: HttpClient) {}

  uploadObject(object: UploadObject): unknown {
    return this.httpClient.post(apiUrl + '/upload', object, { headers }).subscribe();
  }
}
