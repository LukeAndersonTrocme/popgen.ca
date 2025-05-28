import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import AstroPWA from '@vite-pwa/astro';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://popgen.ca',
  output: 'static',
  integrations: [
    tailwind(),
    react(),
    // ⚡ PWA integration:
    AstroPWA({
      // auto-generate a service worker at /sw.js
      strategies: 'generateSW',
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'PopGen Lab',
        short_name: 'PopGen',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#0066CC',
        display: 'standalone',
      },
    }),
  ],
  markdown: { syntaxHighlight: 'prism' },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
});