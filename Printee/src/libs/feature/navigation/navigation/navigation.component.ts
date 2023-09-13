import { Component } from '@angular/core';
import { logo } from 'src/environment/appConfig';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  logo = logo;
}
