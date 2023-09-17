import { Component } from '@angular/core';
import { logo } from 'src/environment/appConfig';
import { AuthenticationService } from '../../authentication/services/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  constructor(private auth: AuthenticationService) {}

  logo = logo;

  logOut() {
    this.auth.logOut();
  }
}
