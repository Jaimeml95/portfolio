import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
    title: 'Inicio · Portfolio',
  },
  {
    path: 'proyectos/:id',
    loadComponent: () =>
      import('./features/projects/project-detail/project-detail').then(
        (m) => m.ProjectDetail,
      ),
    title: 'Proyecto · Portfolio',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
