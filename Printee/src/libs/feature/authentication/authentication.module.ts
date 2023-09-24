import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CreateAccountComponent } from './components/create-account/create-account.component';

@NgModule({
  declarations: [AuthenticationComponent, CreateAccountComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [AuthenticationComponent, CreateAccountComponent],
})
export class AuthenticationModule {}
