import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Hero } from './hero/hero';
import { About } from '../about/about';
import { ProjectsSection } from '../projects/projects-section/projects-section';

@Component({
  selector: 'app-home',
  imports: [Hero, About, ProjectsSection],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-about />
    <app-projects-section />
    <!-- Contacto se añadirá en la próxima fase. -->
  `,
})
export class Home {}
