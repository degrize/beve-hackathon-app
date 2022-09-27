import { Route } from '@angular/router';

import { CreerPageComponent } from './creer-page.component';
import { HomeCreateurAfricainRoutingResolveService } from '../../home/resolver/home-createur-africain-routing-resolve.service';

export const CREATE_PAGE_ROUTE: Route = {
  path: '',
  component: CreerPageComponent,
  data: {
    pageTitle: 'create-page.title',
  },
  resolve: {
    createursAfricains: HomeCreateurAfricainRoutingResolveService,
  },
};
