import { Route } from '@angular/router';

import { CreerPageComponent } from './creer-page.component';

export const CREATE_PAGE_ROUTE: Route = {
  path: '',
  component: CreerPageComponent,
  data: {
    pageTitle: 'create-page.title',
  },
};
