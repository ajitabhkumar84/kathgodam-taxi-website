// @ts-check
import { defineConfig } from 'astro/config';
<<<<<<< Updated upstream

=======
import sanity from '@sanity/astro';
import react from '@astrojs/react';
>>>>>>> Stashed changes
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
<<<<<<< Updated upstream
=======
  integrations: [
    react(),
    sanity({
      projectId: '2o6xnbku',
      dataset: 'production',
      apiVersion: '2024-01-01',
      useCdn: true,
      studioBasePath: '/studio',
    }),
  ],
>>>>>>> Stashed changes
  vite: {
    plugins: [tailwindcss()]
  }
});