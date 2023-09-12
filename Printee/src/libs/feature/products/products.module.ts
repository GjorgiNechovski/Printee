import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product.component';
import { StoreModule } from '@ngrx/store';
import { PRODUCT__STORE_KEY } from './state/product-state.state';
import { ProductReducer } from './state/product-state.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './state/product-state.effects';

@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(PRODUCT__STORE_KEY, ProductReducer),
    EffectsModule.forFeature([ProductEffects])
  ],
  exports: [
    ProductComponent
  ]
})
export class ProductsModule { }
