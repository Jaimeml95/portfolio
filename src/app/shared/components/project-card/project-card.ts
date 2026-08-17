import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../../core/models/project.model';
import { Icon } from '../icon/icon';

/** Degradado sobrio para el banner cuando el proyecto no tiene imagen. */
const GRADIENT = 'from-slate-700 to-slate-900';

/** Logo de la tecnología principal, mostrado sobre el degradado cuando no hay imagen. */
const LOGOS: Record<string, string> = {
  'portfolio-angular': 'images/tech/angular.svg',
  'api-rest-spring-boot': 'images/tech/spring.svg',
  'app-android-java': 'images/tech/android-studio.svg',
};

@Component({
  selector: 'app-project-card',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      [routerLink]="['/proyectos', project().id]"
      class="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background transition duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-lg"
    >
      <!-- Banner -->
      <div class="relative h-40 overflow-hidden">
        @if (project().image) {
          <img
            [src]="project().image"
            [alt]="project().title"
            class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        } @else {
          <div
            class="flex h-full w-full items-center justify-center bg-linear-to-br {{ GRADIENT }}"
          >
            @if (logo(); as logoSrc) {
              <img [src]="logoSrc" alt="" class="h-16 w-16 drop-shadow-lg" />
            } @else {
              <app-icon name="code" class="h-12 w-12 text-white/80" />
            }
          </div>
        }
        @if (project().featured) {
          <span
            class="absolute left-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm"
          >
            Destacado
          </span>
        }
      </div>

      <!-- Contenido -->
      <div class="flex flex-1 flex-col p-5">
        <h3
          class="text-lg font-bold text-foreground transition group-hover:text-brand"
        >
          {{ project().title }}
        </h3>
        <p class="mt-2 flex-1 text-sm text-muted">{{ project().summary }}</p>

        <ul class="mt-4 flex flex-wrap gap-1.5">
          @for (tech of project().technologies; track tech) {
            <li
              class="rounded-md bg-surface px-2 py-0.5 text-xs font-medium text-muted"
            >
              {{ tech }}
            </li>
          }
        </ul>

        <span
          class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand"
        >
          Ver detalle
          <app-icon
            name="arrow-right"
            class="h-4 w-4 transition group-hover:translate-x-1"
          />
        </span>
      </div>
    </a>
  `,
})
export class ProjectCard {
  readonly project = input.required<Project>();

  protected readonly GRADIENT = GRADIENT;

  protected readonly logo = computed(() => LOGOS[this.project().id] ?? null);
}
