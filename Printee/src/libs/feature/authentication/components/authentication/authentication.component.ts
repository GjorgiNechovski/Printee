// authentication.component.ts
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent {
  searchForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  constructor(private authService: AuthenticationService) {}

  authenticate(): void {
    const email = this.searchForm.controls['email'].value;
    const password = this.searchForm.controls['password'].value;
    this.authService.authenticate(email, password);
  }
}
