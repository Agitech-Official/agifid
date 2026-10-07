import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

// build.format 'file' keeps exact .html URLs (agifid.be/, agifid.be/index-en.html, ...)
// instead of Astro's default clean-URL folders - matches what's already live/indexed.
// output 'static' (Astro 5, per-route SSR opt-out) + vercel adapter: only /keystatic needs SSR (admin UI), rest of the
// site stays prerendered/static like before.
export default defineConfig({
  site: 'https://www.agifid.be',
  output: 'static',
  adapter: vercel(),
  build: {
    format: 'file',
  },
  integrations: [
    react(),
    keystatic(),
    // @astrojs/vercel v9 forces build.format 'directory'; restore 'file' so the
    // existing .html URLs keep working. Must stay after the adapter in the config.
    {
      name: 'keep-file-format',
      hooks: {
        'astro:config:setup': ({ updateConfig }) => updateConfig({ build: { format: 'file' } }),
      },
    },
  ],
});
