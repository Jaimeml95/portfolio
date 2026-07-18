import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE } from '../../core/data/profile';
import { Reveal } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-about',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="sobre-mi" class="scroll-mt-16 bg-surface py-20">
      <div class="mx-auto max-w-4xl px-6">
        <div appReveal class="mb-12 text-center">
          <h2 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Sobre mí
          </h2>
          <div class="mx-auto mt-3 h-1 w-16 rounded-full bg-brand"></div>
        </div>

        <div appReveal class="grid gap-12 md:grid-cols-5">
          <!-- Bio -->
          <div class="space-y-4 md:col-span-3">
            @for (paragraph of profile.bio; track $index) {
              <p class="text-lg leading-relaxed text-muted">{{ paragraph }}</p>
            }
            <p class="pt-2 text-sm font-medium text-muted">
              📍 {{ profile.location }}
            </p>
          </div>

          <!-- Stack -->
          <div class="space-y-6 md:col-span-2">
            @for (category of profile.stack; track category.name) {
              <div>
                <h3
                  class="mb-3 text-sm font-semibold uppercase tracking-wide text-muted"
                >
                  {{ category.name }}
                </h3>
                <ul class="flex flex-wrap gap-2">
                  @for (tech of category.items; track tech) {
                    <li
                      class="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition hover:border-brand hover:text-brand"
                    >
                      {{ tech }}
                    </li>
                  }
                </ul>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class About {
  protected readonly profile = PROFILE;
}
