import type { APIRoute } from 'astro'
import { ADMIN_COOKIE_NAME } from '../../lib/admin-auth'

export const prerender = false

export const POST: APIRoute = async ({ cookies, redirect }) => {
  // Clear the admin session cookie
  cookies.delete(ADMIN_COOKIE_NAME, {
    path: '/admin'
  })

  return redirect('/admin/login')
}

// Also handle GET requests for convenience
export const GET: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete(ADMIN_COOKIE_NAME, {
    path: '/admin'
  })

  return redirect('/admin/login')
}
