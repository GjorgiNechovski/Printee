import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter } from 'rxjs/operators';
import { Router } from '@angular/router';

import { apiUrl, headers } from 'src/environment/appConfig';
import { AuthUser, User } from 'src/models/user.models';
import { Observable, Subject, of } from 'rxjs';
import { PrintStudio } from 'src/models/print-studio.models';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  user: Observable<AuthUser | null> = of(null);

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
          this.user = of(x);

          const expirationDate = new Date();
          expirationDate.setTime(expirationDate.getTime() + 2 * 60 * 60 * 1000);
          document.cookie = `token=${x.uid}; expires=${expirationDate.toUTCString()}`;

          this.router.navigate(['/products']);
        }
      });
  }

  public getAuthenticatedUser(): void {
    const uid = this.getCookie('token');

    if (uid !== null) {
      this.user = this.httpClient.get<AuthUser>(apiUrl + `/self?uid=${uid}`).pipe(filter((x) => x !== null));
    }
  }

  public createUserAccount(account: User): void {
    this.httpClient.post(apiUrl + '/createUser', account, { headers: headers });
  }

  public createStudioAccount(account: PrintStudio): void {
    this.httpClient.post(apiUrl + '/createStudio', account, { headers: headers });
  }

  public logOut(): void {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    this.user = of(null);
    this.router.navigate(['/login']);
  }

  private getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  }
}
