// Admin authentication utilities with HMAC-SHA256 session signing

import { createHmac, timingSafeEqual } from 'node:crypto';

const ADMIN_COOKIE_NAME = 'admin-session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

function getSessionSecret(): string {
  const secret = import.meta.env.SESSION_SECRET;
  if (!secret) {
    throw new Error('SESSION_SECRET not set in environment variables');
  }
  return secret;
}

// Sign a payload with HMAC-SHA256
function signPayload(payload: string): string {
  return createHmac('sha256', getSessionSecret()).update(payload).digest('hex');
}

// Check if request has valid admin session
export function isAdminAuthenticated(cookies: any): boolean {
  const session = cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!session) return false;

  try {
    // Session format: base64payload.signature
    const dotIndex = session.lastIndexOf('.');
    if (dotIndex === -1) return false;

    const payload = session.substring(0, dotIndex);
    const signature = session.substring(dotIndex + 1);

    // Verify signature using constant-time comparison
    const expectedSignature = signPayload(payload);
    const sigBuffer = Buffer.from(signature, 'hex');
    const expectedBuffer = Buffer.from(expectedSignature, 'hex');

    if (sigBuffer.length !== expectedBuffer.length) return false;
    if (!timingSafeEqual(sigBuffer, expectedBuffer)) return false;

    // Decode and check expiry
    const decoded = JSON.parse(atob(payload));
    return decoded.authenticated === true && decoded.expires > Date.now();
  } catch {
    return false;
  }
}

// Create admin session cookie value (signed)
export function createAdminSession(): string {
  const session = {
    authenticated: true,
    expires: Date.now() + SESSION_DURATION,
    createdAt: Date.now()
  };
  const payload = btoa(JSON.stringify(session));
  const signature = signPayload(payload);
  return `${payload}.${signature}`;
}

// Validate admin password using constant-time comparison
export function validateAdminPassword(password: string): boolean {
  const adminPassword = import.meta.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.warn('ADMIN_PASSWORD not set in environment variables');
    return false;
  }

  const passwordBuffer = Buffer.from(password);
  const adminBuffer = Buffer.from(adminPassword);

  if (passwordBuffer.length !== adminBuffer.length) return false;
  return timingSafeEqual(passwordBuffer, adminBuffer);
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
