// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://jackson-wheeler.github.io',
  build: { inlineStylesheets: 'never' },
  integrations: [
    icon({
      include: {
        lucide: [
          'arrow-up-right',
          'jacket',
          'luggage',
          'moon',
          'shirt',
          'sport-shoe',
          'sun',
          'tree-pine',
          'watch',
        ],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
