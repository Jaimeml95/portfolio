import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
    // El título y el SEO los gestiona SeoService desde el componente.
  },
  {
    path: 'proyectos/:id',
    loadComponent: () =>
      import('./features/projects/project-detail/project-detail').then(
        (m) => m.ProjectDetail,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
