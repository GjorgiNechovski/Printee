import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes.routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [NavigationComponent],
  imports: [CommonModule, NgbModule, RouterModule.forRoot(routes)],
  exports: [RouterModule, NgbModule],
})
export class NavigationModule {}
