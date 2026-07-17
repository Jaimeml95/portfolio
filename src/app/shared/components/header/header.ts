import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import { Icon } from '../icon/icon';

interface NavItem {
  label: string;
  fragment: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header
      class="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md"
    >
      <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <!-- Marca -->
        <a
          [routerLink]="'/'"
          [fragment]="'inicio'"
          class="flex items-center gap-2 font-extrabold tracking-tight text-foreground"
        >
          <span
            class="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-brand-foreground"
          >
            <app-icon name="code" class="h-5 w-5" />
          </span>
          <span class="text-lg">Portfolio</span>
        </a>

        <!-- Navegación escritorio -->
        <nav class="hidden items-center gap-1 md:flex">
          @for (item of navItems; track item.fragment) {
            <a
              [routerLink]="'/'"
              [fragment]="item.fragment"
              class="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface hover:text-foreground"
            >
              {{ item.label }}
            </a>
          }
        </nav>

        <!-- Acciones -->
        <div class="flex items-center gap-1">
          <button
            type="button"
            (click)="theme.toggle()"
            [attr.aria-label]="
              theme.isDark() ? 'Activar modo claro' : 'Activar modo oscuro'
            "
            class="flex h-10 w-10 items-center justify-center rounded-lg text-muted transition hover:bg-surface hover:text-foreground"
          >
            @if (theme.isDark()) {
              <app-icon name="sun" class="h-5 w-5" />
            } @else {
              <app-icon name="moon" class="h-5 w-5" />
            }
          </button>

          <!-- Botón menú móvil -->
          <button
            type="button"
            (click)="toggleMenu()"
            [attr.aria-expanded]="menuOpen()"
            aria-label="Abrir menú"
            class="flex h-10 w-10 items-center justify-center rounded-lg text-muted transition hover:bg-surface hover:text-foreground md:hidden"
          >
            @if (menuOpen()) {
              <app-icon name="x" class="h-5 w-5" />
            } @else {
              <app-icon name="menu" class="h-5 w-5" />
            }
          </button>
        </div>
      </div>

      <!-- Panel móvil -->
      @if (menuOpen()) {
        <nav class="border-t border-border bg-background px-6 py-3 md:hidden">
          @for (item of navItems; track item.fragment) {
            <a
              [routerLink]="'/'"
              [fragment]="item.fragment"
              (click)="closeMenu()"
              class="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-surface hover:text-foreground"
            >
              {{ item.label }}
            </a>
          }
        </nav>
      }
    </header>
  `,
})
export class Header {
  protected readonly theme = inject(ThemeService);
  protected readonly menuOpen = signal(false);

  protected readonly navItems: NavItem[] = [
    { label: 'Inicio', fragment: 'inicio' },
    { label: 'Sobre mí', fragment: 'sobre-mi' },
    { label: 'Proyectos', fragment: 'proyectos' },
    { label: 'Contacto', fragment: 'contacto' },
  ];

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
