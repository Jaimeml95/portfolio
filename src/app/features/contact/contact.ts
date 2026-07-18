import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { timeout } from 'rxjs';
import { FORMSPREE_ENDPOINT, PROFILE } from '../../core/data/profile';
import { Icon } from '../../shared/components/icon/icon';

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contacto" class="scroll-mt-16 bg-surface py-20">
      <div class="mx-auto max-w-5xl px-6">
        <div class="mb-12 text-center">
          <h2 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Contacto
          </h2>
          <div class="mx-auto mt-3 h-1 w-16 rounded-full bg-brand"></div>
          <p class="mx-auto mt-4 max-w-xl text-muted">
            ¿Tienes un proyecto o una oferta? Escríbeme y te respondo lo antes posible.
          </p>
        </div>

        <div class="grid gap-10 md:grid-cols-2">
          <!-- Enlaces directos -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-foreground">Hablemos</h3>
            <p class="text-muted">
              También puedes contactarme directamente por estos medios:
            </p>
            <ul class="space-y-3">
              <li>
                <a
                  [href]="'mailto:' + profile.email"
                  class="inline-flex items-center gap-3 text-foreground transition hover:text-brand"
                >
                  <span
                    class="flex h-10 w-10 items-center justify-center rounded-lg bg-background text-brand"
                  >
                    <app-icon name="mail" class="h-5 w-5" />
                  </span>
                  {{ profile.email }}
                </a>
              </li>
              @for (social of profile.socials; track social.href) {
                @if (social.icon !== 'mail') {
                  <li>
                    <a
                      [href]="social.href"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-3 text-foreground transition hover:text-brand"
                    >
                      <span
                        class="flex h-10 w-10 items-center justify-center rounded-lg bg-background text-brand"
                      >
                        <app-icon [name]="social.icon" class="h-5 w-5" />
                      </span>
                      {{ social.label }}
                    </a>
                  </li>
                }
              }
            </ul>
          </div>

          <!-- Formulario -->
          <div class="rounded-xl border border-border bg-background p-6">
            @if (status() === 'success') {
              <div class="flex flex-col items-center py-8 text-center">
                <span class="text-accent">
                  <app-icon name="check-circle" class="h-12 w-12" />
                </span>
                <h3 class="mt-4 text-lg font-bold text-foreground">
                  ¡Mensaje enviado!
                </h3>
                <p class="mt-2 text-muted">
                  Gracias por escribir. Te responderé lo antes posible.
                </p>
                <button
                  type="button"
                  (click)="reset()"
                  class="mt-6 rounded-lg border border-border px-5 py-2.5 font-semibold text-foreground transition hover:bg-surface"
                >
                  Enviar otro mensaje
                </button>
              </div>
            } @else {
              <form [formGroup]="form" (ngSubmit)="submit()" novalidate class="space-y-5">
                <!-- Nombre -->
                <div>
                  <label for="name" class="mb-1.5 block text-sm font-medium text-foreground">
                    Nombre
                  </label>
                  <input
                    id="name"
                    type="text"
                    formControlName="name"
                    autocomplete="name"
                    [class.border-red-500]="showError('name')"
                    class="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-foreground placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                    placeholder="Tu nombre"
                  />
                  @if (showError('name')) {
                    <p class="mt-1.5 text-sm text-red-500">
                      Introduce tu nombre (mínimo 2 caracteres).
                    </p>
                  }
                </div>

                <!-- Email -->
                <div>
                  <label for="email" class="mb-1.5 block text-sm font-medium text-foreground">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    formControlName="email"
                    autocomplete="email"
                    [class.border-red-500]="showError('email')"
                    class="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-foreground placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                    placeholder="tucorreo@ejemplo.com"
                  />
                  @if (showError('email')) {
                    <p class="mt-1.5 text-sm text-red-500">
                      Introduce un email válido.
                    </p>
                  }
                </div>

                <!-- Mensaje -->
                <div>
                  <label for="message" class="mb-1.5 block text-sm font-medium text-foreground">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    formControlName="message"
                    [class.border-red-500]="showError('message')"
                    class="w-full resize-y rounded-lg border border-border bg-surface px-4 py-2.5 text-foreground placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                    placeholder="Cuéntame en qué puedo ayudarte…"
                  ></textarea>
                  @if (showError('message')) {
                    <p class="mt-1.5 text-sm text-red-500">
                      El mensaje debe tener al menos 10 caracteres.
                    </p>
                  }
                </div>

                @if (status() === 'error') {
                  <p
                    class="flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500"
                  >
                    <app-icon name="alert-circle" class="h-5 w-5 shrink-0" />
                    No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme por email.
                  </p>
                }

                <button
                  type="submit"
                  [disabled]="status() === 'sending'"
                  class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 font-semibold text-brand-foreground transition hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-60"
                >
                  @if (status() === 'sending') {
                    <app-icon name="loader" class="h-5 w-5 animate-spin" />
                    Enviando…
                  } @else {
                    <app-icon name="send" class="h-5 w-5" />
                    Enviar mensaje
                  }
                </button>
              </form>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Contact {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);

  protected readonly profile = PROFILE;
  protected readonly status = signal<SubmitStatus>('idle');

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  protected showError(control: 'name' | 'email' | 'message'): boolean {
    const c = this.form.controls[control];
    return c.invalid && (c.touched || c.dirty);
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.status.set('sending');
    this.http
      .post(FORMSPREE_ENDPOINT, this.form.getRawValue(), {
        headers: { Accept: 'application/json' },
      })
      .pipe(timeout(15000))
      .subscribe({
        next: () => {
          this.status.set('success');
          this.form.reset();
        },
        error: () => this.status.set('error'),
      });
  }

  protected reset(): void {
    this.form.reset();
    this.status.set('idle');
  }
}
