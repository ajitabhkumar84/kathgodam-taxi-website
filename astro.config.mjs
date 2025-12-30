// @ts-check
import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'server', // Enable SSR for booking/admin pages (use prerender = true for static pages)
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
  vite: {
    plugins: [tailwindcss()]
  }
});