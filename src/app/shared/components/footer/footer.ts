import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon, IconName } from '../icon/icon';

interface SocialLink {
  label: string;
  href: string;
  icon: IconName;
}

@Component({
  selector: 'app-footer',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="border-t border-border bg-surface">
      <div
        class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row"
      >
        <p class="text-sm text-muted">
          © {{ year }} · Hecho con
          <span class="font-semibold text-foreground">Angular</span> y
          <span class="font-semibold text-foreground">Tailwind</span>
        </p>

        <ul class="flex items-center gap-2">
          @for (link of socials; track link.href) {
            <li>
              <a
                [href]="link.href"
                target="_blank"
                rel="noopener noreferrer"
                [attr.aria-label]="link.label"
                class="flex h-10 w-10 items-center justify-center rounded-lg text-muted transition hover:bg-surface-2 hover:text-brand"
              >
                <app-icon [name]="link.icon" class="h-5 w-5" />
              </a>
            </li>
          }
        </ul>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly year = new Date().getFullYear();

  // TODO: reemplazar por los enlaces reales del usuario.
  protected readonly socials: SocialLink[] = [
    { label: 'GitHub', href: 'https://github.com', icon: 'github' },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
    { label: 'Email', href: 'mailto:tucorreo@ejemplo.com', icon: 'mail' },
  ];
}
