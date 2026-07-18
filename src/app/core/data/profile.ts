import { Profile } from '../models/profile.model';

/**
 * Endpoint de Formspree para el formulario de contacto (sin backend propio).
 * Crea un formulario gratis en https://formspree.io y pega aquí tu URL
 * (formato: https://formspree.io/f/xxxxxxx). Mientras contenga TU_ID, el
 * envío fallará a propósito y el formulario mostrará el estado de error.
 */
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/TU_ID';

/** Datos del perfil que alimentan hero, "Sobre mí", contacto y footer. */
export const PROFILE: Profile = {
  name: 'Jaime Moro López',
  role: 'Desarrollador Full Stack Java Junior',
  location: 'Sevilla, España',
  tagline:
    'Desarrollo backend con Java 17 y Spring Boot, y frontend con Angular. Busco mi primera oportunidad como desarrollador full stack Java.',
  bio: [
    'Desarrollador junior especializado en backend con Java 17 y Spring Boot, con ' +
      'formación complementaria en frontend Angular, orientado a perfiles full stack Java.',
    'Titulado en Desarrollo de Aplicaciones Multiplataforma (nota media 8,6/10) y con ' +
      'más de 630 horas de formación certificada en el ecosistema Spring, Angular, testing ' +
      'y Clean Code.',
    'En reconversión profesional desde un entorno técnico y de alta exigencia (Ejército ' +
      'del Aire), que me aporta disciplina, autonomía y capacidad de trabajo bajo presión.',
  ],
  cvUrl: 'cv/cv.pdf',
  email: 'jaimemorolopez@gmail.com',
  socials: [
    { label: 'GitHub', href: 'https://github.com/Jaimeml95', icon: 'github' },
    { label: 'Email', href: 'mailto:jaimemorolopez@gmail.com', icon: 'mail' },
    { label: 'Teléfono', href: 'tel:+34647046923', icon: 'phone' },
  ],
  stack: [
    {
      name: 'Backend',
      items: [
        'Java 17',
        'Spring Boot 3',
        'Spring Security',
        'Hibernate / JPA',
        'APIs REST',
        'Maven',
      ],
    },
    {
      name: 'Frontend',
      items: [
        'Angular',
        'TypeScript',
        'RxJS',
        'Angular Material',
        'TailwindCSS',
        'Bootstrap 5',
      ],
    },
    {
      name: 'Bases de datos',
      items: ['MySQL', 'PostgreSQL', 'MongoDB'],
    },
    {
      name: 'Testing',
      items: ['JUnit 5', 'Mockito', 'Selenium'],
    },
    {
      name: 'Herramientas',
      items: ['Git / GitHub', 'IntelliJ IDEA', 'Postman', 'Agile / Scrum'],
    },
    {
      name: 'En aprendizaje',
      items: ['Docker', 'Microservicios', 'Spring Cloud', 'Spring AI'],
    },
  ],
};
