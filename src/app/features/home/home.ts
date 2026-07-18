import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Hero } from './hero/hero';
import { About } from '../about/about';
import { ProjectsSection } from '../projects/projects-section/projects-section';
import { Contact } from '../contact/contact';
import { PROFILE } from '../../core/data/profile';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-home',
  imports: [Hero, About, ProjectsSection, Contact],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-about />
    <app-projects-section />
    <app-contact />
  `,
})
export class Home {
  constructor() {
    inject(SeoService).update({
      title: `${PROFILE.name} · ${PROFILE.role}`,
      description: PROFILE.tagline,
    });
  }
}
