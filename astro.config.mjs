// @ts-check
import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [
    sanity({
      projectId: process.env.PUBLIC_SANITY_PROJECT_ID || '',
      dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
      apiVersion: process.env.PUBLIC_SANITY_API_VERSION || '2024-01-01',
      useCdn: true,
      studioBasePath: '/studio',
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});