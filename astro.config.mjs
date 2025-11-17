// @ts-check
import { defineConfig } from 'astro/config';
<<<<<<< HEAD
<<<<<<< Updated upstream

=======
import sanity from '@sanity/astro';
import react from '@astrojs/react';
>>>>>>> Stashed changes
=======
import sanity from '@sanity/astro';
>>>>>>> claude/design-templates-sanity-01E8CezEreNJKNHH91gruqZd
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
<<<<<<< HEAD
<<<<<<< Updated upstream
=======
  integrations: [
    react(),
    sanity({
      projectId: '2o6xnbku',
      dataset: 'production',
      apiVersion: '2024-01-01',
=======
  integrations: [
    sanity({
      projectId: process.env.PUBLIC_SANITY_PROJECT_ID || '',
      dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
      apiVersion: process.env.PUBLIC_SANITY_API_VERSION || '2024-01-01',
>>>>>>> claude/design-templates-sanity-01E8CezEreNJKNHH91gruqZd
      useCdn: true,
      studioBasePath: '/studio',
    }),
  ],
<<<<<<< HEAD
>>>>>>> Stashed changes
=======
>>>>>>> claude/design-templates-sanity-01E8CezEreNJKNHH91gruqZd
  vite: {
    plugins: [tailwindcss()]
  }
});