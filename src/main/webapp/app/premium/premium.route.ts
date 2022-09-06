import { Route } from '@angular/router';

import { PremiumComponent } from './premium.component';

export const PREMIUM_ROUTE: Route = {
  path: '',
  component: PremiumComponent,
  data: {
    pageTitle: 'premium.title',
  },
};
