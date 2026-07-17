/** Representa un proyecto mostrado en el portfolio. */
export interface Project {
  /** Identificador único, usado también como slug en la URL de detalle. */
  id: string;
  /** Título del proyecto. */
  title: string;
  /** Resumen breve (1-2 líneas) para la tarjeta de la galería. */
  summary: string;
  /** Descripción larga para la página de detalle. */
  description: string;
  /** Tecnologías empleadas (p. ej. ['Angular', 'TypeScript']). */
  technologies: string[];
  /** Ruta a la imagen/captura principal. */
  image: string;
  /** URL del repositorio (opcional). */
  repoUrl?: string;
  /** URL de la demo en vivo (opcional). */
  demoUrl?: string;
  /** Si se destaca en la home. */
  featured: boolean;
  /** Fecha del proyecto en formato ISO (YYYY-MM-DD). */
  date: string;
}
