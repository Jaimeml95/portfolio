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
- [ ] **Fase 1** — Layout: header, footer, toggle de tema
- [ ] **Fase 2** — Home + Sobre mí
- [ ] **Fase 3** — Proyectos (galería + detalle)
- [ ] **Fase 4** — Contacto (formulario)
- [ ] **Fase 5** — Pulido (responsive, SEO, CV)
- [ ] **Fase 6** — Despliegue
