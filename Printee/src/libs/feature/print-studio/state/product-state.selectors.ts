import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IPrintStudioState, PRINT_STUDIO__STORE_KEY } from './print-studio-state.state';

const state = createFeatureSelector<IPrintStudioState>(PRINT_STUDIO__STORE_KEY);

export const productState = createSelector(state, (state1: IPrintStudioState) => state1.printStudios);
