import { Route } from '@angular/router';

import { DonsComponent } from './dons.component';

export const DONS_ROUTE: Route = {
  path: '',
  component: DonsComponent,
  data: {
    pageTitle: 'dons.title',
  },
};
