import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

interface SeoData {
  title: string;
  description: string;
}

/**
 * Centraliza la actualización de metadatos por ruta:
 * title, meta description y etiquetas Open Graph / Twitter (para que el
 * portfolio se vea bien al compartirlo en LinkedIn, X, etc.).
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  update({ title, description }: SeoData): void {
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
  }
}
