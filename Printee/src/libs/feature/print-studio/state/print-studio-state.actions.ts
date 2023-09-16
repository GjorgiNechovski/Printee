import { createAction, props } from '@ngrx/store';
import { PrintStudio } from 'src/models/print-studio.models';

export const fetchProducts = createAction('[PrintStudio] Fetch Print Studios');

export const fetchProductsSuccess = createAction('[PrintStudio] Fetch Print Studios Success', props<{ studios: PrintStudio[] }>);
