import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { StoreModule } from '@ngrx/store';
import { PRODUCT__STORE_KEY } from './state/product-state.state';
import { ProductReducer } from './state/product-state.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './state/product-state.effects';
import { ProductListComponent } from './components/product-list/product-list.component';
import { PageLabelModule } from 'src/ui/page-label/page-label.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ProductComponent, ProductListComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(PRODUCT__STORE_KEY, ProductReducer),
    EffectsModule.forFeature([ProductEffects]),
    PageLabelModule,
    RouterModule,
  ],
  exports: [ProductComponent, RouterModule, ProductListComponent],
})
export class ProductsModule {}
