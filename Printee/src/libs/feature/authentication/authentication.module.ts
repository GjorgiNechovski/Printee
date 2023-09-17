import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [AuthenticationComponent],
})
export class AuthenticationModule {}
