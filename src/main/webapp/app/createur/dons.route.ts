import { Route } from '@angular/router';

import { DonsComponent } from './dons.component';
import { CreateurAfricainRoutingResolveService } from './resolvers/createur-africain-routing-resolve.service';

export const DONS_ROUTE: Route = {
  path: ':pagelien',
  component: DonsComponent,
  data: {
    pageTitle: 'dons.title',
  },
  resolve: {
    createurAfricain: CreateurAfricainRoutingResolveService,
  },
};
