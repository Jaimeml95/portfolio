import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'portfolio-theme';

/**
 * Gestiona el tema claro/oscuro con signals.
 * - Persiste la elección en localStorage.
 * - Respeta la preferencia del sistema en la primera visita.
 * - Aplica/quita la clase `.dark` en <html> vía un effect.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  /** Tema actual como signal reactivo. */
  readonly theme = signal<Theme>(this.getInitialTheme());

  /** Conveniencia: true si el tema activo es oscuro. */
  readonly isDark = computed(() => this.theme() === 'dark');

  constructor() {
    // Sincroniza la clase del <html> y localStorage cada vez que cambia el tema.
    effect(() => {
      const theme = this.theme();
      this.document.documentElement.classList.toggle('dark', theme === 'dark');
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch {
        /* localStorage puede no estar disponible (modo privado); se ignora. */
      }
    });
  }

  /** Alterna entre claro y oscuro. */
  toggle(): void {
    this.theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  /** Fija un tema concreto. */
  set(theme: Theme): void {
    this.theme.set(theme);
  }

  private getInitialTheme(): Theme {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
    } catch {
      /* Sin acceso a localStorage: caemos a la preferencia del sistema. */
    }
    const prefersDark =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }
}
