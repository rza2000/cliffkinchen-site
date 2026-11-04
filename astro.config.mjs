import { defineConfig } from 'astro/config';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

// SITE_BASE is only set for the github.io preview, which lives under a subpath.
// On the real domain it is unset and the site serves from /.
const base = (process.env.SITE_BASE || '').replace(/\/$/, '');

const prefixRootLinks = {
  name: 'prefix-root-links',
  hooks: {
    'astro:build:done': ({ dir }) => {
      if (!base) return;
      const root = fileURLToPath(dir);
      for (const f of readdirSync(root).filter((n) => n.endsWith('.html'))) {
        const p = join(root, f);
        const html = readFileSync(p, 'utf8').replace(/\b(href|src)="\/(?!\/)/g, (_, a) => `${a}="${base}/`);
        writeFileSync(p, html);
      }
    },
  },
};

export default defineConfig({
  site: 'https://www.cliffkinchen.com',
  // Keeps the existing /about.html style addresses working.
  build: { format: 'file' },
  integrations: [prefixRootLinks],
});
