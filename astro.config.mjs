// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://jackson-wheeler.github.io',
  build: { inlineStylesheets: 'never' },
  vite: {
    plugins: [tailwindcss()],
  },
});
