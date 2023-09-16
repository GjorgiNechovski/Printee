import { createAction, props } from '@ngrx/store';
import { PrintStudio } from 'src/models/print-studio.models';

export const fetchStudios = createAction('[PrintStudio] Fetch Print Studios');

export const fetchStudiosSuccess = createAction('[PrintStudio] Fetch Print Studios Success', props<{ studios: PrintStudio[] }>());
