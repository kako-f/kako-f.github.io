# Camilo Fuentes Beals portfolio

## Goal

Publish a focused, accessible one-page GitHub Pages portfolio that presents Camilo Fuentes Beals as a scientist-engineer working across bioinformatics, data science, and software engineering.

## Architecture

Use React, Vite, and TypeScript with no additional runtime dependencies. `App.tsx` composes semantic page sections from typed portfolio data in `src/data/portfolio.ts`. A single stylesheet owns the visual system, responsive layouts, and CSS custom-property light/dark themes. A small React state hook controls the theme toggle and exposes its state through `aria-pressed`.

The repository is named `kako-f.github.io`; Vite uses the root base path (`/`). GitHub Actions builds the site and uses the official GitHub Pages artifact and deployment actions on pushes to `main`.

## Page design

The editorial, scientist-engineer direction uses neutral graphite, warm white, muted steel, and a near-black dark theme. The layout is typographic and restrained: no headshot, technology-badge wall, icon dependency, router, CMS, analytics, or animations.

Sections, in order:

1. Hero with identity, positioning, short introduction, primary links, and theme control.
2. About with a concise narrative.
3. Areas of expertise in a responsive three-column list.
4. Selected projects including the provided GitHub project and research work.
5. Research and teaching with research context and an external Scholar link.
6. Technical toolkit grouped by purpose rather than logo badges.
7. Contact with GitHub, website, and Scholar links.

Desktop uses contained multi-column grids; tablet and mobile collapse to a single, readable column. Navigation anchors directly to semantic `<section>` landmarks. Keyboard focus remains visible, colour contrast is maintained in both themes, decorative content is omitted, and every external link has an explicit accessible label.

## Files and verification

- `package.json`, TypeScript/Vite configuration, and `index.html` establish the app.
- `src/main.tsx`, `src/App.tsx`, `src/data/portfolio.ts`, and `src/styles.css` implement the page.
- `.github/workflows/deploy.yml` deploys production builds to Pages.
- `README.md` documents local development and deployment setup.

Run `npm run build` after implementation; it must complete without TypeScript or Vite errors.
