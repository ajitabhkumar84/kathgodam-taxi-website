/**
 * CSRF Protection Utility
 * Generates and validates CSRF tokens for form submissions
 */

import type { AstroCookies } from 'astro';

const CSRF_TOKEN_LENGTH = 32;
const CSRF_COOKIE_NAME = 'csrf-token';
const CSRF_HEADER_NAME = 'x-csrf-token';

/**
 * Generate a random CSRF token
 */
function generateToken(): string {
  const array = new Uint8Array(CSRF_TOKEN_LENGTH);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Get or create a CSRF token for the current session
 * @param cookies - Astro cookies object
 * @returns CSRF token string
 */
export function getCSRFToken(cookies: AstroCookies): string {
  let token = cookies.get(CSRF_COOKIE_NAME)?.value;

  if (!token) {
    token = generateToken();
    cookies.set(CSRF_COOKIE_NAME, token, {
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });
  }

  return token;
}

/**
 * Validate CSRF token from request
 * @param request - The request object
 * @param cookies - Astro cookies object
 * @returns true if token is valid, false otherwise
 */
export async function validateCSRFToken(
  request: Request,
  cookies: AstroCookies
): Promise<boolean> {
  const cookieToken = cookies.get(CSRF_COOKIE_NAME)?.value;

  if (!cookieToken) {
    return false;
  }

  // Check header first
  let requestToken = request.headers.get(CSRF_HEADER_NAME);

  // If not in header, check form data
  if (!requestToken && request.headers.get('content-type')?.includes('application/x-www-form-urlencoded')) {
    try {
      const formData = await request.clone().formData();
      requestToken = formData.get('csrf-token') as string;
    } catch {
      // If parsing fails, token is invalid
      return false;
    }
  }

  // If not in form data, check JSON body
  if (!requestToken && request.headers.get('content-type')?.includes('application/json')) {
    try {
      const body = await request.clone().json();
      requestToken = body.csrfToken;
    } catch {
      // If parsing fails, token is invalid
      return false;
    }
  }

  return requestToken === cookieToken;
}

/**
 * Create a CSRF validation error response
 */
export function createCSRFErrorResponse(): Response {
  return new Response(
    JSON.stringify({
      error: 'Invalid CSRF Token',
      message: 'CSRF token validation failed. Please refresh the page and try again.',
    }),
    {
      status: 403,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

/**
 * Middleware helper to protect routes with CSRF validation
 * Use this in API routes that modify data (POST, PUT, DELETE)
 */
export async function requireCSRF(
  request: Request,
  cookies: AstroCookies
): Promise<Response | null> {
  // Only validate for state-changing methods
  if (!['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    return null;
  }

  const isValid = await validateCSRFToken(request, cookies);

  if (!isValid) {
    return createCSRFErrorResponse();
  }

  return null; // Validation passed
}
