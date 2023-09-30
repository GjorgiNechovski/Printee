import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/environment/appConfig';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { AuthUser } from 'src/models/user.models';
import { Observable, filter, switchMap } from 'rxjs';
import { Product } from 'src/models/product.models';

@Injectable({
  providedIn: 'root',
})
export class UploadProductsService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthenticationService
  ) {}

  uploadObject(name: string, description: string, price: string, image: File, stock: string, categoryUid: string): Observable<Product> {
    let user: AuthUser | null;

    return this.authService.user.pipe(
      filter((authenticatedUser) => !!authenticatedUser),
      switchMap((authenticatedUser) => {
        user = authenticatedUser;

        const data = new FormData();
        data.append('name', name);
        data.append('description', description);
        data.append('price', price);
        data.append('image', image);
        data.append('stock', stock);
        data.append('categoryUid', categoryUid);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        data.append('studioUid', user!.uid);

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');

        return this.httpClient.post<Product>(apiUrl + '/uploadObject', data, { headers });
      })
    );
  }
}
