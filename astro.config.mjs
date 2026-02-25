// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://kathgodamtaxi.in',
  output: 'server', // Enable SSR for booking/admin pages (use prerender = true for static pages)
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  integrations: [
    react(),
    sanity({
      projectId: '2o6xnbku',
      dataset: 'production',
      apiVersion: '2024-01-01',
      useCdn: true,
      studioBasePath: '/studio',
    }),
    sitemap({
      filter: (page) =>
        !page.includes('/admin') &&
        !page.includes('/studio') &&
        !page.includes('/my-bookings') &&
        !page.includes('/api/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        'react-dom/server': 'react-dom/server.edge',
      },
    },
  }
});