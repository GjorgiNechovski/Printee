import { HttpHeaders } from '@angular/common/http';

export const apiUrl = 'http://localhost:8080/api';
export const logo = '../assets/images/logo.png';

export const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Accept: 'application/json',
});

export const headersImage = new HttpHeaders({
  Accept: 'application/json',
});
