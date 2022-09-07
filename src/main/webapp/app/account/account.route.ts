import { Routes } from '@angular/router';

import { activateRoute } from './activate/activate.route';
import { passwordResetFinishRoute } from './password-reset/finish/password-reset-finish.route';
import { passwordResetInitRoute } from './password-reset/init/password-reset-init.route';
import { registerRoute } from './register/register.route';

const ACCOUNT_ROUTES = [activateRoute, passwordResetFinishRoute, passwordResetInitRoute, registerRoute];

export const accountState: Routes = [
  {
    path: '',
    children: ACCOUNT_ROUTES,
  },
];
