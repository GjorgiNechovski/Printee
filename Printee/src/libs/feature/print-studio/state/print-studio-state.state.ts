import { PrintStudio } from 'src/models/print-studio.models';

export const PRINT_STUDIO__STORE_KEY = 'print-studio-state';

export interface IPrintStudioState {
  printStudios: PrintStudio[];
}

export const initialState: IPrintStudioState = {
  printStudios: [],
};
