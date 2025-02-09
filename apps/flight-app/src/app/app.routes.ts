import { ExtraOptions, Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { HomeComponent } from './home/home.component';
import { FlightTypeaheadComponent } from './flight-booking/flight-typeahead/flight-typeahead.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'basket',
    component: BasketComponent,
    outlet: 'aux'
  },
  {
    path: 'flight-typeahead',
    component: FlightTypeaheadComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
