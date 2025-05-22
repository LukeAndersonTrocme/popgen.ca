// --- tailwind.config.cjs ---
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}', // include markdown!
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0066CC',
        cta: '#FFD45C',
        highlight: '#FF9248',
      },
      fontFamily: {
        sans: ['"Montserrat Variable"', 'ui-sans-serif', 'system-ui'],
      },
      ringColor: {
        primary: '#0066CC',
      },
    },
  },
  plugins: [],
};
