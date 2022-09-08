import { Routes } from '@angular/router';
import { navbarRoute } from '../navbar/navbar.route';

export const FenStartLayoutRoutes: Routes = [
  {
    path: 'account',
    loadChildren: () => import('../../account/account.module').then(m => m.AccountModule),
  },
  {
    path: 'login',
    loadChildren: () => import('../../login/login.module').then(m => m.LoginModule),
  },

  {
    path: 'create-page',
    loadChildren: () => import(`../../feature/creer-page/creer-page.module`).then(m => m.CreerPageModule),
  },
  {
    path: 'a-propos',
    loadChildren: () => import(`../../a-propos/a-propos.module`).then(m => m.AProposModule),
  },
  {
    path: 'vie-privee',
    loadChildren: () => import(`../../vie-prive/vie-prive.module`).then(m => m.ViePriveModule),
  },
  {
    path: 'regle-conditions',
    loadChildren: () => import(`../../regle-condition/regle-condition.module`).then(m => m.RegleConditionModule),
  },
  {
    path: 'utilisation',
    loadChildren: () => import(`../../utilisation/utilisation.module`).then(m => m.UtilisationModule),
  },
  {
    path: 'aide',
    loadChildren: () => import(`../../aide/aide.module`).then(m => m.AideModule),
  },
  {
    path: 'premium',
    loadChildren: () => import(`../../premium/premium.module`).then(m => m.PremiumModule),
  },
  {
    path: 'createur',
    loadChildren: () => import(`../../createur/dons.module`).then(m => m.DonsModule),
  },
  navbarRoute,
];
