import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NavigationModule } from 'src/libs/feature/navigation/navigation.module';
import { ProductsModule } from 'src/libs/feature/products/products.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { CartModule } from 'src/libs/feature/cart/cart.module';
import { PrintStudioModule } from 'src/libs/feature/print-studio/print-studio.module';
import { AuthenticationModule } from 'src/libs/feature/authentication/authentication.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    NavigationModule,
    ProductsModule,
    CartModule,
    PrintStudioModule,
    AuthenticationModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    RouterModule.forRoot([]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
