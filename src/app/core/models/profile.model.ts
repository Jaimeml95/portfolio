import { IconName } from '../../shared/components/icon/icon';

/** Enlace a una red social o medio de contacto. */
export interface SocialLink {
  label: string;
  href: string;
  icon: IconName;
}

/** Categoría de tecnologías del stack (para agrupar en "Sobre mí"). */
export interface TechCategory {
  name: string;
  items: string[];
}

/** Datos personales que alimentan hero, "Sobre mí" y footer. */
export interface Profile {
  /** Nombre completo. */
  name: string;
  /** Rol o título profesional. */
  role: string;
  /** Ubicación (ciudad/país). */
  location: string;
  /** Frase corta de presentación (subtítulo del hero). */
  tagline: string;
  /** Párrafos de la biografía ("Sobre mí"). */
  bio: string[];
  /** Ruta al CV en PDF (para descarga). */
  cvUrl: string;
  /** Correo de contacto. */
  email: string;
  /** Redes y medios de contacto. */
  socials: SocialLink[];
  /** Stack técnico agrupado por categorías. */
  stack: TechCategory[];
}
