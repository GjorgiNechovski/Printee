// authentication.component.ts
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  searchForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  showMessage = false;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.showMessage.subscribe((x) => (this.showMessage = x));
  }

  authenticate(): void {
    const email = this.searchForm.controls['email'].value;
    const password = this.searchForm.controls['password'].value;
    this.authService.authenticate(email, password);
  }
}
