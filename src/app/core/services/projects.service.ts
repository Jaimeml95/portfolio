import { computed, inject, Injectable, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, Observable, of } from 'rxjs';
import { Project } from '../models/project.model';

interface ProjectsState {
  projects: Project[];
  loading: boolean;
  error: boolean;
}

/**
 * Carga los proyectos desde public/data/projects.json.
 * Expone signals de datos, carga y error para que la UI reaccione.
 */
@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly http = inject(HttpClient);

  private readonly state = toSignal(
    this.http.get<Project[]>('data/projects.json').pipe(
      map((projects): ProjectsState => ({ projects, loading: false, error: false })),
      catchError(
        (): Observable<ProjectsState> =>
          of({ projects: [], loading: false, error: true }),
      ),
    ),
    { initialValue: { projects: [], loading: true, error: false } as ProjectsState },
  );

  /** Todos los proyectos (ordenados por fecha, más recientes primero). */
  readonly projects = computed(() =>
    [...this.state().projects].sort((a, b) => b.date.localeCompare(a.date)),
  );

  /** Solo los proyectos destacados. */
  readonly featured = computed(() => this.projects().filter((p) => p.featured));

  /** true mientras se cargan los datos. */
  readonly isLoading = computed(() => this.state().loading);

  /** true si la carga falló. */
  readonly error = computed(() => this.state().error);

  /** Devuelve un signal con el proyecto cuyo id coincide (o undefined). */
  getById(id: Signal<string>): Signal<Project | undefined> {
    return computed(() => this.projects().find((p) => p.id === id()));
  }
}
