import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ProjectsService } from '../../../core/services/projects.service';
import { ProjectCard } from '../../../shared/components/project-card/project-card';

@Component({
  selector: 'app-projects-section',
  imports: [ProjectCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="proyectos" class="scroll-mt-16 py-20">
      <div class="mx-auto max-w-6xl px-6">
        <div class="mb-10 text-center">
          <h2 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Proyectos
          </h2>
          <div class="mx-auto mt-3 h-1 w-16 rounded-full bg-brand"></div>
          <p class="mx-auto mt-4 max-w-xl text-muted">
            Una selección de trabajos. Filtra por tecnología para explorar.
          </p>
        </div>

        <!-- Filtro por tecnología -->
        @if (!projectsService.isLoading() && !projectsService.error()) {
          <div class="mb-8 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              (click)="setFilter(null)"
              [class.bg-brand]="activeTech() === null"
              [class.text-brand-foreground]="activeTech() === null"
              [class.border-brand]="activeTech() === null"
              class="rounded-full border border-border px-4 py-1.5 text-sm font-medium text-muted transition hover:border-brand hover:text-brand"
            >
              Todos
            </button>
            @for (tech of allTechs(); track tech) {
              <button
                type="button"
                (click)="setFilter(tech)"
                [class.bg-brand]="activeTech() === tech"
                [class.text-brand-foreground]="activeTech() === tech"
                [class.border-brand]="activeTech() === tech"
                class="rounded-full border border-border px-4 py-1.5 text-sm font-medium text-muted transition hover:border-brand hover:text-brand"
              >
                {{ tech }}
              </button>
            }
          </div>
        }

        <!-- Estado: cargando -->
        @if (projectsService.isLoading()) {
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            @for (i of skeletons; track i) {
              <div
                class="h-72 animate-pulse rounded-xl border border-border bg-surface"
              ></div>
            }
          </div>
        } @else if (projectsService.error()) {
          <!-- Estado: error -->
          <p
            class="rounded-xl border border-border bg-surface p-8 text-center text-muted"
          >
            No se pudieron cargar los proyectos. Inténtalo de nuevo más tarde.
          </p>
        } @else {
          <!-- Grid de proyectos -->
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            @for (project of filtered(); track project.id) {
              <app-project-card [project]="project" />
            } @empty {
              <p class="col-span-full py-12 text-center text-muted">
                No hay proyectos con esa tecnología.
              </p>
            }
          </div>
        }
      </div>
    </section>
  `,
})
export class ProjectsSection {
  protected readonly projectsService = inject(ProjectsService);
  protected readonly skeletons = [0, 1, 2];

  /** Tecnología por la que se filtra (null = todas). */
  protected readonly activeTech = signal<string | null>(null);

  /** Lista única de tecnologías presentes en los proyectos. */
  protected readonly allTechs = computed(() => {
    const set = new Set<string>();
    for (const project of this.projectsService.projects()) {
      for (const tech of project.technologies) {
        set.add(tech);
      }
    }
    return [...set].sort();
  });

  /** Proyectos filtrados por la tecnología activa. */
  protected readonly filtered = computed(() => {
    const tech = this.activeTech();
    const projects = this.projectsService.projects();
    return tech ? projects.filter((p) => p.technologies.includes(tech)) : projects;
  });

  protected setFilter(tech: string | null): void {
    this.activeTech.set(tech);
  }
}
