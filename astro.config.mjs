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
  vite: {
    // Prevent esbuild from attempting to load any tsconfig files
    esbuild: { tsconfig: false },
    optimizeDeps: {
      esbuildOptions: { tsconfig: false }
    }
  }
});
