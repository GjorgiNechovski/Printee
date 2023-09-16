import { createReducer, on } from '@ngrx/store';
import { initialState } from './print-studio-state.state';
import * as PrintStudioActions from './print-studio-state.actions';

export const PrintStudioReducer = createReducer(
  initialState,
  on(PrintStudioActions.fetchStudiosSuccess, (state, { studios }) => {
    return {
      ...state,
      printStudios: studios,
    };
  })
);
