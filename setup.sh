# --- setup.sh ---
# 1. Create Astro project
npm create astro@latest popgen-site -- --template basics
cd popgen-site

# 2. Install dependencies
npm install \
  @astrojs/tailwind \
  @astrojs/i18n \
  tailwindcss \
  postcss \
  autoprefixer \
  react \
  react-dom \
  framer-motion \
  shadcn-ui

# 3. Initialize shadcn/ui
npx shadcn-ui@latest init

# 4. Create content & data folders
mkdir -p src/content/en src/content/fr src/data

# 5. Create initial publications placeholder
echo '[]' > src/data/publications.json

# 6. (Optional) GitHub Pages branch setup:
#    In repo settings → Pages, set source to "Branch: main / Folder: /dist"
#
# After this, you can run:
npm run dev
