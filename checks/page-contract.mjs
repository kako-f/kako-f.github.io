import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const app = await readFile(new URL('../src/App.tsx', import.meta.url), 'utf8')

for (const marker of [
  '<header',
  '<main',
  'id="about"',
  'id="projects"',
  'id="contact"',
  'aria-pressed',
]) {
  assert.ok(app.includes(marker), `missing ${marker}`)
}

const css = await readFile(new URL('../src/styles.css', import.meta.url), 'utf8')

for (const marker of [':root', '.dark', '@media', ':focus-visible']) {
  assert.ok(css.includes(marker), `missing ${marker}`)
}
