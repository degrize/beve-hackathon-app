import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { Authority } from '../../config/authority.constants';
import { UserRouteAccessService } from '../../core/auth/user-route-access.service';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { EtatCompteComponent } from '../../etat-compte/etat-compte.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'premium-dashboard', component: EtatCompteComponent },
  {
    path: '',
    loadChildren: () => import(`../../entities/entity-routing.module`).then(m => m.EntityRoutingModule),
  },
  {
    path: 'dons-createur',
    loadChildren: () => import(`../../dons-createur/dons-createur.module`).then(m => m.DonsCreateurModule),
  },
  {
    path: 'account',
    loadChildren: () => import('../../account/accountDashboard.module').then(m => m.AccountDashboardModule),
  },
  {
    path: 'admin',
    data: {
      authorities: [Authority.ADMIN],
    },
    canActivate: [UserRouteAccessService],
    loadChildren: () => import('../../admin/admin-routing.module').then(m => m.AdminRoutingModule),
  },
];
