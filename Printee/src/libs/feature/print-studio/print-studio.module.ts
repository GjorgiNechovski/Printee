import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { PRINT_STUDIO__STORE_KEY } from './state/print-studio-state.state';
import { PrintStudioReducer } from './state/product-state.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PrintStudioEffects } from './state/product-state.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(PRINT_STUDIO__STORE_KEY, PrintStudioReducer),
    EffectsModule.forFeature([PrintStudioEffects]),
  ],
})
export class PrintStudioModule {}
