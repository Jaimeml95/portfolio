import {
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';

/**
 * Revela el elemento con una animación sutil cuando entra en el viewport.
 * Usa IntersectionObserver y manipula clases directamente (compatible con
 * zoneless). Respeta `prefers-reduced-motion` mostrando el contenido sin animar.
 *
 * Incluye una red de seguridad: si IO no está disponible o no dispara,
 * un temporizador garantiza que el contenido siempre acabe visible.
 *
 * Uso: <div appReveal>…</div>
 */
@Directive({
  selector: '[appReveal]',
})
export class Reveal implements OnInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;
  private fallbackTimer?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    const node = this.host.nativeElement;

    const prefersReduced =
      typeof matchMedia !== 'undefined' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      node.classList.add('reveal-visible');
      return;
    }

    node.classList.add('reveal');
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.reveal();
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    this.observer.observe(node);

    // Red de seguridad: nunca dejar el contenido oculto si IO no dispara.
    this.fallbackTimer = setTimeout(() => this.reveal(), 1600);
  }

  private reveal(): void {
    this.host.nativeElement.classList.add('reveal-visible');
    this.cleanup();
  }

  private cleanup(): void {
    this.observer?.disconnect();
    this.observer = undefined;
    if (this.fallbackTimer) {
      clearTimeout(this.fallbackTimer);
      this.fallbackTimer = undefined;
    }
  }

  ngOnDestroy(): void {
    this.cleanup();
  }
}
