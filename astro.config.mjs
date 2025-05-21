// --- astro.config.mjs (final) ---
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://popgen.ca',
  output: 'static',        // static build is built‑in in Astro 4
  integrations: [tailwind(), react()],
  markdown: { syntaxHighlight: 'prism' },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
  },
});
