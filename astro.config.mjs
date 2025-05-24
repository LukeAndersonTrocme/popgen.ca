import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://popgen.ca',
  output: 'static',        // static build is built-in in Astro 4
  integrations: [tailwind(), react()],
  markdown: { syntaxHighlight: 'prism' },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
  },
  vite: {
    // Point esbuild directly at our root tsconfig to avoid per-file lookup bugs
    esbuild: {
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    },
    optimizeDeps: {
      esbuildOptions: {
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      },
    },
  }
});