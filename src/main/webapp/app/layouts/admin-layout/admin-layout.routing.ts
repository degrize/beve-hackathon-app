import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { Authority } from '../../config/authority.constants';
import { UserRouteAccessService } from '../../core/auth/user-route-access.service';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },

  {
    path: '',
    loadChildren: () => import(`../../entities/entity-routing.module`).then(m => m.EntityRoutingModule),
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
