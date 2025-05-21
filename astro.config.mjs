// --- astro.config.mjs ---
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import i18n from '@astrojs/i18n';

export default defineConfig({
  site: 'https://popgen.ca',
  integrations: [
    tailwind(),
    i18n({
      defaultLocale: 'en',
      locales: ['en', 'fr'],
      // Tell it where your pages live:
      pagesDirectory: './src/pages',
    }),
  ],
  markdown: { syntaxHighlight: 'prism' },
});
