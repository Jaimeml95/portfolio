import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
    title: 'Inicio · Portfolio',
  },
  // Rutas futuras (Sobre mí, Proyectos, Contacto) se añadirán en próximas fases.
  {
    path: '**',
    redirectTo: '',
  },
];
