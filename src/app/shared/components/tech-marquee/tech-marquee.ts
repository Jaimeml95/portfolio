import { ChangeDetectionStrategy, Component } from '@angular/core';

interface TechLogo {
  name: string;
  src: string;
}

/**
 * Carrusel de logos de tecnologías en bucle continuo (derecha → izquierda).
 * La lista se duplica para que el desplazamiento sea infinito y sin costuras.
 * Marcado como decorativo (aria-hidden): el stack ya se lista en texto.
 */
@Component({
  selector: 'app-tech-marquee',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="marquee marquee-mask overflow-hidden py-4"
      aria-hidden="true"
    >
      <ul class="marquee-track items-center">
        @for (logo of loop; track $index) {
          <li class="flex shrink-0 items-center pe-14">
            <img
              [src]="logo.src"
              [alt]="logo.name"
              [title]="logo.name"
              class="h-22 w-auto opacity-85 transition duration-300 hover:opacity-100"
              width="88"
              height="88"
              loading="lazy"
              draggable="false"
            />
          </li>
        }
      </ul>
    </div>
  `,
})
export class TechMarquee {
  protected readonly logos: TechLogo[] = [
    { name: 'Java', src: 'images/tech/java.svg' },
    { name: 'Spring', src: 'images/tech/spring.svg' },
    { name: 'Hibernate', src: 'images/tech/hibernate.svg' },
    { name: 'PostgreSQL', src: 'images/tech/postgresql.svg' },
    { name: 'MySQL', src: 'images/tech/mysql.svg' },
    { name: 'MongoDB', src: 'images/tech/mongodb.svg' },
    { name: 'Angular', src: 'images/tech/angular.svg' },
    { name: 'TypeScript', src: 'images/tech/typescript.svg' },
    { name: 'JavaScript', src: 'images/tech/javascript.svg' },
    { name: 'Tailwind CSS', src: 'images/tech/tailwindcss.svg' },
    { name: 'Git', src: 'images/tech/git.svg' },
    { name: 'Docker', src: 'images/tech/docker.svg' },
    { name: 'IntelliJ IDEA', src: 'images/tech/intellij.svg' },
    { name: 'Postman', src: 'images/tech/postman.svg' },
  ];

  /** Lista duplicada para el bucle continuo. */
  protected readonly loop = [...this.logos, ...this.logos];
}
