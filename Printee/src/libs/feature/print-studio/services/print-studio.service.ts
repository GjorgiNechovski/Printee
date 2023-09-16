import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/environment/appConfig';
import { PrintStudio } from 'src/models/print-studio.models';

@Injectable({
  providedIn: 'root',
})
export class PrintStudioService {
  constructor(private httpClient: HttpClient) {}

  public getPrintStudios(): Observable<PrintStudio[]> {
    return this.httpClient.get<PrintStudio[]>(apiUrl + '/printStudios');
  }
}
