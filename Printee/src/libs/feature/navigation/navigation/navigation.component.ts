import { Component, OnInit } from '@angular/core';
import { logo } from 'src/environment/appConfig';
import { AuthenticationService } from '../../authentication/services/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  name? = '';
  constructor(private auth: AuthenticationService) {}

  logo = logo;

  ngOnInit(): void {
    this.auth.user?.subscribe((x) => (this.name = x?.name));
  }

  logOut() {
    this.auth.logOut();
  }
}
