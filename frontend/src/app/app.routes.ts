import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/layout/layout').then((m) => m.Layout),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      { path: 'home', loadComponent: () => import('./pages/home/home').then((m) => m.Home) },
    {path: 'projects',
      loadComponent: () => import('./pages/projects/projects').then((m) => m.Projects)
    }
    ],
  },
];
