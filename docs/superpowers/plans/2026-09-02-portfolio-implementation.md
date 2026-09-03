# Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy an accessible, responsive one-page scientist-engineer portfolio for Camilo Fuentes Beals.

**Architecture:** A dependency-light Vite React app renders typed portfolio data through a single `App` composition module. One stylesheet supplies the responsive editorial layout and CSS-variable themes. GitHub Actions builds the root-hosted site and deploys its `dist` artifact to Pages.

**Tech Stack:** React 18, TypeScript, Vite, native CSS, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-09-02-portfolio-design.md`

## Global Constraints

- Use React, Vite, TypeScript, and responsive CSS; add no runtime dependencies.
- Keep portfolio copy and repeated links in `src/data/portfolio.ts`.
- Use semantic landmarks, visible keyboard focus, accessible labels, and contrast-safe light/dark themes.
- Set Vite `base` to `/` because the repository is `kako-f.github.io`.
- Deploy only `dist` through the official GitHub Pages actions on pushes to `main`.
- Do not add routing, a CMS, analytics, badges, icons, a headshot, or animations.

---

### Task 1: Establish the Vite application and content contract

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/data/portfolio.ts`

**Interfaces:**
- Produces: `portfolio`, a typed object with `name`, `roles`, `intro`, `about`, `expertise`, `projects`, `research`, `toolkit`, and `links` fields for `App`.
- Produces: Vite scripts `dev`, `build`, and `preview`.

- [ ] **Step 1: Add the package manifest and Vite configuration**

```json
{
  "name": "kako-f.github.io",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": { "dev": "vite", "build": "tsc -b && vite build", "preview": "vite preview" },
  "dependencies": { "react": "latest", "react-dom": "latest" },
  "devDependencies": { "@types/react": "latest", "@types/react-dom": "latest", "@vitejs/plugin-react": "latest", "typescript": "latest", "vite": "latest" }
}
```

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({ base: '/', plugins: [react()] })
```

- [ ] **Step 2: Add strict TypeScript configuration and the page entrypoint**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
```

- [ ] **Step 3: Define the typed portfolio content**

```ts
export const portfolio = {
  name: 'Camilo Fuentes Beals',
  roles: ['PhD in Science', 'Bioinformatics', 'Data Science', 'Software Engineering'],
  intro: 'I build computational tools and data-driven systems, with a background in genomics and transposable elements.',
  about: 'My work connects biological research, machine learning, data engineering, and software development.',
  expertise: [
    ['Computational biology', 'Genomics, transposable elements, and reproducible research.'],
    ['Data systems', 'Data engineering, machine learning, and analytical products.'],
    ['Software engineering', 'Research-grade tools and production web applications.'],
  ],
  projects: [
    ['LearningAnalytics2', 'Learning data tools and analytics.', 'https://github.com/kako-f/learningAnalytics2'],
    ['Genomics and transposable-element research', 'Computational research into genome dynamics.', 'https://scholar.google.com/citations?user=4ZyYL5AAAAAJ'],
    ['PhotoCrispy', 'Interactive graphics application.', 'C++, OpenGL, GLSL, ImGui'],
    ['BankData', 'Data-focused financial application.', 'Django, React, PostgreSQL'],
  ],
  research: 'Research and teaching connect computational methods with biological questions and data literacy.',
  toolkit: { research: ['Python', 'R', 'Bioinformatics'], data: ['Machine learning', 'Data engineering', 'PostgreSQL'], software: ['TypeScript', 'React', 'Django', 'C++'] },
  links: { github: 'https://github.com/kako-f', scholar: 'https://scholar.google.com/citations?user=4ZyYL5AAAAAJ', website: 'https://cakofuentes.com/' },
} as const
```

- [ ] **Step 4: Run the build to confirm the scaffold requires the page module**

Run: `npm install && npm run build`

Expected: FAIL with `Failed to resolve import "./App"` until Task 2 creates it.

- [ ] **Step 5: Commit the scaffold and content contract**

```bash
git add package.json tsconfig.json tsconfig.node.json vite.config.ts index.html src/main.tsx src/data/portfolio.ts
git commit -m "chore: scaffold portfolio site"
```

### Task 2: Build the semantic portfolio page and theme control

**Files:**
- Create: `src/App.tsx`
- Modify: `src/data/portfolio.ts`

**Interfaces:**
- Consumes: `portfolio` from `src/data/portfolio.ts`.
- Produces: default `App(): JSX.Element`, rendering `header`, `main`, `nav`, `section`, and `footer` landmarks.

- [ ] **Step 1: Write a minimal browser check specification**

Create `checks/page-contract.mjs`:

```js
import { readFile } from 'node:fs/promises'
import assert from 'node:assert/strict'

const app = await readFile(new URL('../src/App.tsx', import.meta.url), 'utf8')
for (const marker of ['<header', '<main', 'id="about"', 'id="projects"', 'aria-pressed']) assert.ok(app.includes(marker), `missing ${marker}`)
```

- [ ] **Step 2: Run the check to verify it fails before the component exists**

Run: `node checks/page-contract.mjs`

Expected: FAIL with `ENOENT` for `src/App.tsx`.

- [ ] **Step 3: Implement the page using mapped typed content and a native button**

```tsx
const [dark, setDark] = useState(false)
return <div className={dark ? 'site dark' : 'site'}>
  <header><nav aria-label="Primary"><a href="#about">About</a><a href="#projects">Projects</a><a href="#contact">Contact</a></nav></header>
  <main>
    <section id="hero" aria-labelledby="hero-title"><h1 id="hero-title">{portfolio.name}</h1></section>
    <section id="about" aria-labelledby="about-title"><h2 id="about-title">About</h2></section>
    <section id="expertise" aria-labelledby="expertise-title"><h2 id="expertise-title">Areas of expertise</h2></section>
    <section id="projects" aria-labelledby="projects-title"><h2 id="projects-title">Selected projects</h2></section>
    <section id="research" aria-labelledby="research-title"><h2 id="research-title">Research and teaching</h2></section>
    <section id="toolkit" aria-labelledby="toolkit-title"><h2 id="toolkit-title">Technical toolkit</h2></section>
    <section id="contact" aria-labelledby="contact-title"><h2 id="contact-title">Contact</h2></section>
  </main>
  <button type="button" aria-pressed={dark} onClick={() => setDark(value => !value)}>Theme</button>
</div>
```

Render each project and toolkit group with `map`; external project and contact anchors use `target="_blank" rel="noreferrer"` and an `aria-label` ending in “(opens in a new tab)”.

- [ ] **Step 4: Run the content-contract check and production build**

Run: `node checks/page-contract.mjs && npm run build`

Expected: PASS; Vite writes `dist/index.html`.

- [ ] **Step 5: Commit the page and check**

```bash
git add src/App.tsx src/data/portfolio.ts checks/page-contract.mjs
git commit -m "feat: add portfolio content"
```

### Task 3: Add responsive neutral visual system

**Files:**
- Create: `src/styles.css`
- Modify: `checks/page-contract.mjs`

**Interfaces:**
- Consumes: class names and landmark IDs from `App`.
- Produces: system that presents one column below 700px and theme variables for both modes.

- [ ] **Step 1: Extend the page-contract check for responsive and theme primitives**

```js
const css = await readFile(new URL('../src/styles.css', import.meta.url), 'utf8')
for (const marker of [':root', '.dark', '@media', ':focus-visible']) assert.ok(css.includes(marker), `missing ${marker}`)
```

- [ ] **Step 2: Run the check to verify it fails before the stylesheet exists**

Run: `node checks/page-contract.mjs`

Expected: FAIL with `ENOENT` for `src/styles.css`.

- [ ] **Step 3: Implement the neutral, editorial CSS system**

```css
:root { --paper: #f4f2ee; --ink: #20211f; --muted: #626660; --line: #c9c8c3; }
.dark { --paper: #171817; --ink: #f0efea; --muted: #c2c2ba; --line: #41433f; }
:focus-visible { outline: 2px solid currentColor; outline-offset: 4px; }
@media (max-width: 700px) { .grid { grid-template-columns: 1fr; } }
```

Add readable fluid type with `clamp`, contained desktop grids for expertise/projects/toolkit, one-column mobile layout, underline treatment for links, and `scroll-behavior: smooth` inside `@media (prefers-reduced-motion: no-preference)`.

- [ ] **Step 4: Run the check and production build**

Run: `node checks/page-contract.mjs && npm run build`

Expected: PASS with a generated `dist` directory.

- [ ] **Step 5: Commit the styling**

```bash
git add src/styles.css checks/page-contract.mjs
git commit -m "feat: style responsive portfolio"
```

### Task 4: Configure GitHub Pages delivery and project documentation

**Files:**
- Create: `.github/workflows/deploy.yml`
- Modify: `README.md`
- Modify: `checks/page-contract.mjs`

**Interfaces:**
- Consumes: `npm run build`, which writes `dist`.
- Produces: a Pages deployment on successful `main` pushes.

- [ ] **Step 1: Extend the contract check for deployment configuration**

```js
const workflow = await readFile(new URL('../.github/workflows/deploy.yml', import.meta.url), 'utf8')
for (const marker of ['actions/configure-pages', 'actions/upload-pages-artifact', 'actions/deploy-pages', 'npm run build']) assert.ok(workflow.includes(marker), `missing ${marker}`)
```

- [ ] **Step 2: Run the check to verify it fails before the workflow exists**

Run: `node checks/page-contract.mjs`

Expected: FAIL with `ENOENT` for `.github/workflows/deploy.yml`.

- [ ] **Step 3: Add the GitHub Pages workflow**

```yaml
name: Deploy GitHub Pages
on:
  push: { branches: [main] }
permissions: { contents: read, pages: write, id-token: write }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: ./dist }
```

Add this deployment job after `build`:

```yaml
  deploy:
    needs: build
    permissions: { pages: write, id-token: write }
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 4: Replace the README with exact local and deployment instructions**

```md
## Development
npm install
npm run dev

## Deployment
Push to `main`, then in GitHub repository Settings → Pages select **GitHub Actions** as the source.
```

Include `npm run build` and `npm run preview` commands plus the published URL `https://kako-f.github.io/`.

- [ ] **Step 5: Run all checks and inspect the generated HTML**

Run: `node checks/page-contract.mjs && npm run build && test -f dist/index.html`

Expected: PASS and exit status 0.

- [ ] **Step 6: Commit workflow, README, and final check**

```bash
git add .github/workflows/deploy.yml README.md checks/page-contract.mjs
git commit -m "ci: deploy portfolio to GitHub Pages"
```
