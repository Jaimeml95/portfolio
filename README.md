# Portfolio · Angular + Tailwind

Portfolio personal de desarrollador front-end, construido como proyecto de demostración
técnica para procesos de selección.

## Stack

- **Angular 22** — standalone components, signals, nuevo control flow (`@if` / `@for`), zoneless
- **TailwindCSS v4** — sistema de diseño propio con tokens (light/dark) vía CSS custom properties
- **Angular CDK** — comportamientos accesibles (overlay, foco) sin estilos impuestos
- **TypeScript** (modo estricto)
- Iconos en SVG inline (sin dependencias de iconos)

## Arquitectura

```
src/app/
├── core/        # servicios singleton y modelos (Project, ThemeService…)
├── shared/      # componentes reutilizables (header, footer…)
└── features/    # secciones lazy-loaded (home, about, projects, contact)
```

## Scripts

| Comando          | Descripción                          |
| ---------------- | ------------------------------------ |
| `npm start`      | Servidor de desarrollo en `:4200`    |
| `npm run build`  | Build de producción en `dist/`       |
| `npm test`       | Tests unitarios (Vitest)             |

## Estado

Proyecto en desarrollo por fases:

- [x] **Fase 0** — Setup: Angular + Tailwind, sistema de diseño, routing, dark mode base
- [x] **Fase 1** — Layout: header, footer, toggle de tema
- [x] **Fase 2** — Home + Sobre mí
- [x] **Fase 3** — Proyectos (galería + detalle)
- [x] **Fase 4** — Contacto (formulario)
- [x] **Fase 5** — Pulido (responsive, SEO, CV)
- [x] **Fase 6** — Despliegue (Vercel)

## Despliegue

Configurado para **Vercel** (ver `vercel.json`):

- **Build:** `npm run build`
- **Output:** `dist/portfolio/browser`
- **Rewrites:** todas las rutas → `index.html` (necesario para el enrutado SPA)

Con el repositorio conectado a Vercel, cada `git push` a la rama principal
despliega automáticamente. Para el formulario de contacto, define tu endpoint
de Formspree en `src/app/core/data/profile.ts` (`FORMSPREE_ENDPOINT`).
