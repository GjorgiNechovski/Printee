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
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateObjectComponent } from './components/create-object/create-object.component';
import { OwnProductsComponent } from './components/own-products/own-products.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { DeleteProductComponent } from './components/delete-product/delete-product.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    CreateObjectComponent,
    OwnProductsComponent,
    EditProductComponent,
    DeleteProductComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    StoreModule.forFeature(PRODUCT__STORE_KEY, ProductReducer),
    EffectsModule.forFeature([ProductEffects]),
    PageLabelModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [ProductComponent, RouterModule, ProductListComponent, CreateObjectComponent],
})
export class ProductsModule {}
