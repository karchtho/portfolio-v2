import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/layout/layout').then((m) => m.Layout),
    children: [
      { path: '', loadComponent: () => import('./pages/home/home').then((m) => m.Home) },
      {
        path: 'projects',
        loadComponent: () => import('./pages/projects/projects').then((m) => m.Projects),
      },
      // { path: 'about', loadComponent: () => import('./pages/about/about').then((m) => m.About) },

      // Routes protégées
      {
        path: 'admin',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/admin/admin').then((m) => m.Admin),
      },
    ],
  },

  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
];
