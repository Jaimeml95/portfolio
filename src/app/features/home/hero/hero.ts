import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROFILE } from '../../../core/data/profile';
import { Icon } from '../../../shared/components/icon/icon';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="inicio"
      class="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden"
    >
      <!-- Fondo decorativo -->
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          class="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-brand/20 blur-3xl"
        ></div>
        <div
          class="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
        ></div>
      </div>

      <div class="mx-auto w-full max-w-4xl px-6 py-20 text-center">
        <span
          class="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-muted"
        >
          <span class="relative flex h-2 w-2">
            <span
              class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"
            ></span>
            <span class="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
          </span>
          Disponible para nuevos proyectos
        </span>

        <h1
          class="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl"
        >
          Hola, soy {{ profile.name }}
        </h1>
        <p class="mt-4 text-xl font-semibold text-brand sm:text-2xl">
          {{ profile.role }}
        </p>
        <p class="mx-auto mt-6 max-w-2xl text-lg text-muted">
          {{ profile.tagline }}
        </p>

        <!-- CTAs -->
        <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            [routerLink]="'/'"
            [fragment]="'proyectos'"
            class="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-semibold text-brand-foreground shadow-sm transition hover:bg-brand-strong"
          >
            Ver proyectos
            <app-icon name="arrow-right" class="h-5 w-5" />
          </a>
          <a
            [href]="profile.cvUrl"
            download
            class="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-6 py-3 font-semibold text-foreground transition hover:bg-surface-2"
          >
            <app-icon name="download" class="h-5 w-5" />
            Descargar CV
          </a>
        </div>

        <!-- Redes -->
        <div class="mt-10 flex items-center justify-center gap-2">
          @for (social of profile.socials; track social.href) {
            <a
              [href]="social.href"
              [attr.target]="social.icon === 'mail' ? null : '_blank'"
              rel="noopener noreferrer"
              [attr.aria-label]="social.label"
              class="flex h-11 w-11 items-center justify-center rounded-lg text-muted transition hover:bg-surface hover:text-brand"
            >
              <app-icon [name]="social.icon" class="h-5 w-5" />
            </a>
          }
        </div>
      </div>
    </section>
  `,
})
export class Hero {
  protected readonly profile = PROFILE;
}
