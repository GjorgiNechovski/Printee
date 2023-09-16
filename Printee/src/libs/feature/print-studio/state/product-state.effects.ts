import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { PrintStudioService } from '../services/print-studio.service';
import * as PrintStudioActions from './print-studio-state.actions';

@Injectable()
export class PrintStudioEffects {
  constructor(
    private actions$: Actions,
    private service: PrintStudioService
  ) {}

  fetchStudios$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PrintStudioActions.fetchStudios),
      switchMap(() => this.service.getPrintStudios().pipe(map((response) => PrintStudioActions.fetchStudiosSuccess({ studios: response }))))
    );
  });
}
