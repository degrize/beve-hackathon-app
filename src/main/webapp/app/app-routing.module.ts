import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { Authority } from 'app/config/authority.constants';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          data: {
            authorities: [Authority.ADMIN],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule),
        },
        {
          path: 'account',
          loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        },
        {
          path: 'login',
          loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
        },
        {
          path: '',
          loadChildren: () => import(`./entities/entity-routing.module`).then(m => m.EntityRoutingModule),
        },
        {
          path: 'create-page',
          loadChildren: () => import(`./feature/creer-page/creer-page.module`).then(m => m.CreerPageModule),
        },
        {
          path: 'a-propos',
          loadChildren: () => import(`./a-propos/a-propos.module`).then(m => m.AProposModule),
        },

        {
          path: 'vie-prive',
          loadChildren: () => import(`./vie-prive/vie-prive.module`).then(m => m.ViePriveModule),
        },
        {
          path: 'regle-condition',
          loadChildren: () => import(`./regle-condition/regle-condition.module`).then(m => m.RegleConditionModule),
        },
        {
          path: 'utilisation',
          loadChildren: () => import(`./utilisation/utilisation.module`).then(m => m.UtilisationModule),
        },
        navbarRoute,
        ...errorRoute,
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
