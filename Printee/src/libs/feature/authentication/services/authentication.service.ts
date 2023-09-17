import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { apiUrl, headers } from 'src/environment/appConfig';
import { AuthUser } from 'src/models/user.models';
import { Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  user: AuthUser | null = null;

  showMessage = new Subject<boolean>();

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {}

  public authenticate(email: string, password: string): void {
    const credentials = {
      email: email,
      password: password,
    };

    this.httpClient
      .post<AuthUser>(apiUrl + '/login', credentials, { headers: headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.router.navigate(['/login']);
          }
          this.showMessage.next(true);
          return of(null);
        })
      )
      .subscribe((x) => {
        if (x !== null) {
          this.user = x;

          const expirationDate = new Date();
          expirationDate.setTime(expirationDate.getTime() + 2 * 60 * 60 * 1000);
          document.cookie = `token=GMB-printee; expires=${expirationDate.toUTCString()}`;

          this.router.navigate(['/products']);
        }
      });
  }

  public logOut(): void {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    this.user = null;
    this.router.navigate(['/login']);
  }
}
