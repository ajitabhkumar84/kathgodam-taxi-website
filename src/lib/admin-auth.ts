// Admin authentication utilities with Web Crypto API session signing

const ADMIN_COOKIE_NAME = 'admin-session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

function getSessionSecret(): string {
  const secret = import.meta.env.SESSION_SECRET;
  if (!secret) {
    throw new Error('SESSION_SECRET not set in environment variables');
  }
  return secret;
}

// Import the key for HMAC-SHA256
async function getHmacKey(): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(getSessionSecret());
  return crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

// Sign a payload with HMAC-SHA256 using Web Crypto API
async function signPayload(payload: string): Promise<string> {
  const key = await getHmacKey();
  const encoder = new TextEncoder();
  const data = encoder.encode(payload);
  const signature = await crypto.subtle.sign('HMAC', key, data);
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Constant-time comparison for strings
function timingSafeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

// Check if request has valid admin session
export async function isAdminAuthenticated(cookies: any): Promise<boolean> {
  const session = cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!session) return false;

  try {
    // Session format: base64payload.signature
    const dotIndex = session.lastIndexOf('.');
    if (dotIndex === -1) return false;

    const payload = session.substring(0, dotIndex);
    const signature = session.substring(dotIndex + 1);

    // Verify signature using constant-time comparison
    const expectedSignature = await signPayload(payload);
    if (!timingSafeCompare(signature, expectedSignature)) return false;

    // Decode and check expiry
    const decoded = JSON.parse(atob(payload));
    return decoded.authenticated === true && decoded.expires > Date.now();
  } catch {
    return false;
  }
}

// Create admin session cookie value (signed)
export async function createAdminSession(): Promise<string> {
  const session = {
    authenticated: true,
    expires: Date.now() + SESSION_DURATION,
    createdAt: Date.now()
  };
  const payload = btoa(JSON.stringify(session));
  const signature = await signPayload(payload);
  return `${payload}.${signature}`;
}

// Validate admin password using constant-time comparison
export function validateAdminPassword(password: string): boolean {
  const adminPassword = import.meta.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.warn('ADMIN_PASSWORD not set in environment variables');
    return false;
  }
  return timingSafeCompare(password, adminPassword);
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
