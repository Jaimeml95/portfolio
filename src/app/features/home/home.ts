import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="inicio" class="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <span class="mb-4 inline-flex items-center rounded-full border border-border bg-surface px-4 py-1 text-sm font-medium text-muted">
        Fase 0 · Setup completado
      </span>
      <h1 class="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl">
        Portfolio en <span class="text-brand">Angular</span> + Tailwind
      </h1>
      <p class="mt-6 max-w-xl text-lg text-muted">
        Estructura, routing y sistema de diseño listos. Si ves este bloque con estilos y
        colores, Tailwind v4 está funcionando correctamente.
      </p>
      <div class="mt-8 flex gap-4">
        <a class="rounded-lg bg-brand px-5 py-2.5 font-semibold text-brand-foreground transition hover:bg-brand-strong">
          Botón primario
        </a>
        <a class="rounded-lg border border-border bg-surface px-5 py-2.5 font-semibold text-foreground transition hover:bg-surface-2">
          Botón secundario
        </a>
      </div>
    </section>
  `,
})
export class Home {}
