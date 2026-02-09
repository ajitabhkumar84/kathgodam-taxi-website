// Helper to generate preview URLs for documents
export const PRODUCTION_URL = 'https://kathgodamtaxi.com' // Update this with your actual domain
export const LOCAL_URL = 'http://localhost:4321'

export function getPreviewUrl(slug: string, docType: 'route' | 'package' | 'temple'): string {
  // All document types use the same URL pattern: /{slug}
  // But you can customize this if needed for different types
  const baseUrl = process.env.NODE_ENV === 'production' ? PRODUCTION_URL : LOCAL_URL

  // For now, all types use the same pattern
  return `${baseUrl}/${slug}`
}

export function getTemplateListingUrl(): string {
  const baseUrl = process.env.NODE_ENV === 'production' ? PRODUCTION_URL : LOCAL_URL
  return {
    temples: `${baseUrl}/temples`, // Update with your actual temples listing URL
    packages: `${baseUrl}/packages`, // Update with your actual packages listing URL
    routes: `${baseUrl}/rates`, // Based on your ratesPage, this is likely the routes listing
  }
}

// Common template/listing page URLs
export const MAIN_PAGE_URLS = {
  home: '/',
  temples: '/temples', // Update if different
  packages: '/packages', // Update if different
  routes: '/rates', // Your rates page that lists all routes
  contact: '/contact',
  completeTour: '/taxi-for-complete-tour',
}
