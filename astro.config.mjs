// --- astro.config.mjs ---
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://popgen.ca',
  output: 'static',
  integrations: [
    tailwind(),
    react(),
  ],
  markdown: { syntaxHighlight: 'prism' },
  // Built-in i18n routing (Astro v4+)
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    // English at '/', French at '/fr/...'
  },
});
