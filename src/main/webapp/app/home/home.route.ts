import { Route } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeCreateurAfricainRoutingResolveService } from './resolver/home-createur-africain-routing-resolve.service';
import { HomeCategrorieRoutingResolveService } from './resolver/home-categorie-routing-resolve.service';

export const HOME_ROUTE: Route = {
  path: '',
  component: HomeComponent,
  data: {
    pageTitle: 'home.title',
  },
  resolve: {
    categorieCreateurs: HomeCategrorieRoutingResolveService,
  },
};
