import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Hero } from './hero/hero';
import { About } from '../about/about';

@Component({
  selector: 'app-home',
  imports: [Hero, About],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-about />
    <!-- Proyectos y Contacto se añadirán en las próximas fases. -->
  `,
})
export class Home {}
