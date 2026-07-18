import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectsService } from '../../../core/services/projects.service';
import { SeoService } from '../../../core/services/seo.service';
import { Icon } from '../../../shared/components/icon/icon';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="mx-auto max-w-3xl px-6 py-16">
      <a
        [routerLink]="'/'"
        [fragment]="'proyectos'"
        class="mb-8 inline-flex items-center gap-1 text-sm font-medium text-muted transition hover:text-brand"
      >
        <app-icon name="arrow-right" class="h-4 w-4 rotate-180" />
        Volver a proyectos
      </a>

      @if (projectsService.isLoading()) {
        <div class="space-y-4">
          <div class="h-10 w-2/3 animate-pulse rounded-lg bg-surface"></div>
          <div class="h-48 w-full animate-pulse rounded-xl bg-surface"></div>
          <div class="h-24 w-full animate-pulse rounded-lg bg-surface"></div>
        </div>
      } @else if (project(); as p) {
        <p class="text-sm font-medium text-muted">{{ formattedDate() }}</p>
        <h1 class="mt-2 text-4xl font-extrabold tracking-tight text-foreground">
          {{ p.title }}
        </h1>
        <p class="mt-4 text-lg text-muted">{{ p.summary }}</p>

        <ul class="mt-6 flex flex-wrap gap-2">
          @for (tech of p.technologies; track tech) {
            <li
              class="rounded-lg border border-border bg-surface px-3 py-1 text-sm font-medium text-foreground"
            >
              {{ tech }}
            </li>
          }
        </ul>

        <!-- Enlaces -->
        <div class="mt-8 flex flex-wrap gap-3">
          @if (p.repoUrl) {
            <a
              [href]="p.repoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 font-semibold text-foreground transition hover:bg-surface-2"
            >
              <app-icon name="github" class="h-5 w-5" />
              Ver código
            </a>
          }
          @if (p.demoUrl) {
            <a
              [href]="p.demoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 font-semibold text-brand-foreground transition hover:bg-brand-strong"
            >
              <app-icon name="external-link" class="h-5 w-5" />
              Ver demo
            </a>
          }
        </div>

        <div class="mt-10 border-t border-border pt-8">
          <h2 class="mb-3 text-xl font-bold text-foreground">Descripción</h2>
          <p class="text-lg leading-relaxed text-muted">{{ p.description }}</p>
        </div>
      } @else {
        <!-- No encontrado -->
        <div class="py-16 text-center">
          <h1 class="text-2xl font-bold text-foreground">Proyecto no encontrado</h1>
          <p class="mt-2 text-muted">
            El proyecto que buscas no existe o ha cambiado de dirección.
          </p>
          <a
            [routerLink]="'/'"
            [fragment]="'proyectos'"
            class="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 font-semibold text-brand-foreground transition hover:bg-brand-strong"
          >
            Ver todos los proyectos
          </a>
        </div>
      }
    </article>
  `,
})
export class ProjectDetail {
  protected readonly projectsService = inject(ProjectsService);
  private readonly seo = inject(SeoService);

  /** id del proyecto, enlazado desde el parámetro de ruta :id. */
  readonly id = input.required<string>();

  protected readonly project = this.projectsService.getById(this.id);

  constructor() {
    // Actualiza el SEO en cuanto el proyecto está disponible.
    effect(() => {
      const project = this.project();
      if (project) {
        this.seo.update({
          title: `${project.title} · Portfolio`,
          description: project.summary,
        });
      }
    });
  }

  protected readonly formattedDate = computed(() => {
    const project = this.project();
    if (!project) return '';
    return new Date(project.date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
    });
  });
}
