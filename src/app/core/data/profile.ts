import { Profile } from '../models/profile.model';

/**
 * Datos del perfil. Contenido de EJEMPLO: sustituye los valores por los tuyos.
 * (nombre, bio, enlaces reales, CV en /public/cv/cv.pdf, etc.)
 */
export const PROFILE: Profile = {
  name: 'Tu Nombre',
  role: 'Desarrollador Front-End',
  location: 'España',
  tagline:
    'Construyo interfaces web modernas, accesibles y cuidadas al detalle con Angular.',
  bio: [
    'Soy desarrollador front-end con foco en Angular y TypeScript. Me gusta ' +
      'convertir ideas en productos usables, con código limpio y una experiencia ' +
      'de usuario pulida.',
    'Disfruto trabajando con sistemas de diseño, componentes reutilizables y ' +
      'buenas prácticas (accesibilidad, rendimiento y testing). Este portfolio es, ' +
      'de hecho, una muestra de cómo trabajo.',
  ],
  cvUrl: 'cv/cv.pdf',
  email: 'tucorreo@ejemplo.com',
  socials: [
    { label: 'GitHub', href: 'https://github.com', icon: 'github' },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
    { label: 'Email', href: 'mailto:tucorreo@ejemplo.com', icon: 'mail' },
  ],
  stack: [
    {
      name: 'Frontend',
      items: ['Angular', 'TypeScript', 'JavaScript', 'RxJS', 'HTML', 'CSS'],
    },
    {
      name: 'Estilos & UI',
      items: ['TailwindCSS', 'SCSS', 'Responsive', 'Accesibilidad'],
    },
    {
      name: 'Herramientas',
      items: ['Git', 'Vite', 'Node.js', 'Figma', 'Vitest'],
    },
  ],
};
