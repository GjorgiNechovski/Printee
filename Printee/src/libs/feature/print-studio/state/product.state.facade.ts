import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IPrintStudioState } from './print-studio-state.state';
import * as PrintStudioActions from './print-studio-state.actions';
import * as PrintStudioSelectors from './product-state.selectors';
import { Observable } from 'rxjs';
import { PrintStudio } from 'src/models/print-studio.models';

@Injectable({
  providedIn: 'root',
})
export class PrintStudioFacade {
  public constructor(private readonly store: Store<IPrintStudioState>) {}

  public fetchPrintStudios(): void {
    this.store.dispatch(PrintStudioActions.fetchStudios());
  }

  public getPrintStudios(): Observable<PrintStudio[]> {
    return this.store.select(PrintStudioSelectors.productState);
  }
}
