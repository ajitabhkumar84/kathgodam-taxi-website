// Simple admin authentication utilities

const ADMIN_COOKIE_NAME = 'admin-session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Check if request has valid admin session
export function isAdminAuthenticated(cookies: any): boolean {
  const session = cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!session) return false;

  try {
    const decoded = JSON.parse(atob(session));
    return decoded.authenticated && decoded.expires > Date.now();
  } catch {
    return false;
  }
}

// Create admin session cookie value
export function createAdminSession(): string {
  const session = {
    authenticated: true,
    expires: Date.now() + SESSION_DURATION,
    createdAt: Date.now()
  };
  return btoa(JSON.stringify(session));
}

// Validate admin password
export function validateAdminPassword(password: string): boolean {
  const adminPassword = import.meta.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.warn('ADMIN_PASSWORD not set in environment variables');
    return false;
  }
  return password === adminPassword;
}

// Get cookie options for admin session
export function getSessionCookieOptions() {
  return {
    path: '/admin',
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'strict' as const,
    maxAge: SESSION_DURATION / 1000 // in seconds
  };
}

export { ADMIN_COOKIE_NAME };
