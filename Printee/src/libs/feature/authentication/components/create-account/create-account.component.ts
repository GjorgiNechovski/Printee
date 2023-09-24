import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from 'src/models/user.models';
import { PrintStudio } from 'src/models/print-studio.models';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent {
  constructor(private authService: AuthenticationService) {}

  createAccountForm = new FormGroup({
    type: new FormControl(),
    name: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    repeatPassword: new FormControl(),
    card: new FormControl(),
  });

  create(): void {
    if (this.createAccountForm.controls['type'].value === 'User') {
      const user = new User(
        this.createAccountForm.controls['name'].value,
        this.createAccountForm.controls['lastName'].value,
        this.createAccountForm.controls['email'].value,
        this.createAccountForm.controls['password'].value
      );

      this.authService.createUserAccount(user);
    } else {
      const studio = new PrintStudio(
        this.createAccountForm.controls['name'].value,
        this.createAccountForm.controls['email'].value,
        this.createAccountForm.controls['password'].value
      );

      this.authService.createStudioAccount(studio);
    }
  }
}
