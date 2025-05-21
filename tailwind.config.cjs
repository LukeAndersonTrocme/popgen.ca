// --- tailwind.config.cjs ---
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0066CC',
        cta: '#FFD45C',
        highlight: '#FF9248',
      },
    },
  },
  plugins: [],
};
