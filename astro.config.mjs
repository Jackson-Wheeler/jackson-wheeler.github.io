// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://jackson-wheeler.github.io',
  build: { inlineStylesheets: 'never' },
  // Tailwind is only imported by the inspiration page, so the rest of the site
  // keeps its own stylesheets.
  vite: {
    plugins: [tailwindcss()],
  },
});
