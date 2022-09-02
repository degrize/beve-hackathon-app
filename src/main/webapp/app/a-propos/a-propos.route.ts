import { Route } from '@angular/router';

import { AProposComponent } from './a-propos.component';

export const CREATE_PAGE_ROUTE: Route = {
  path: '',
  component: AProposComponent,
  data: {
    pageTitle: 'a-propos.title',
  },
};
