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
      const files = [
        ...readdirSync(root).filter((n) => n.endsWith('.html')),
        ...readdirSync(join(root, '_astro')).filter((n) => n.endsWith('.css')).map((n) => join('_astro', n)),
      ];
      for (const f of files) {
        const p = join(root, f);
        const out = readFileSync(p, 'utf8')
          .replace(/\b(href|src)="\/(?!\/)/g, (_, a) => `${a}="${base}/`)
          .replace(/url\((["']?)\/(?!\/)/g, (_, q) => `url(${q}${base}/`);
        writeFileSync(p, out);
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
