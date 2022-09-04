import { Route } from '@angular/router';

import { UtilisationComponent } from './utilisation.component';

export const UTILISATION_ROUTE: Route = {
  path: '',
  component: UtilisationComponent,
  data: {
    pageTitle: 'utilisation.title',
  },
};
