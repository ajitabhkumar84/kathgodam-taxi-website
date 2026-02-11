// Admin authentication utilities with Web Crypto API session signing

const ADMIN_COOKIE_NAME = 'admin-session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Environment access helper - tries Cloudflare runtime env first, then import.meta.env
function getEnvVar(name: string, runtimeEnv?: Record<string, string>): string | undefined {
  // Try Cloudflare runtime env (for Secret-type variables)
  if (runtimeEnv && runtimeEnv[name]) {
    return runtimeEnv[name];
  }
  // Fallback to import.meta.env (for Plaintext variables / local dev)
  return (import.meta.env as any)[name];
}

function getSessionSecret(runtimeEnv?: Record<string, string>): string {
  const secret = getEnvVar('SESSION_SECRET', runtimeEnv);
  if (!secret) {
    throw new Error('SESSION_SECRET not set in environment variables');
  }
  return secret;
}

// Import the key for HMAC-SHA256
async function getHmacKey(runtimeEnv?: Record<string, string>): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(getSessionSecret(runtimeEnv));
  return crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

// Sign a payload with HMAC-SHA256 using Web Crypto API
async function signPayload(payload: string, runtimeEnv?: Record<string, string>): Promise<string> {
  const key = await getHmacKey(runtimeEnv);
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
export async function isAdminAuthenticated(cookies: any, runtimeEnv?: Record<string, string>): Promise<boolean> {
  const session = cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!session) return false;

  try {
    // Session format: base64payload.signature
    const dotIndex = session.lastIndexOf('.');
    if (dotIndex === -1) return false;

    const payload = session.substring(0, dotIndex);
    const signature = session.substring(dotIndex + 1);

    // Verify signature using constant-time comparison
    const expectedSignature = await signPayload(payload, runtimeEnv);
    if (!timingSafeCompare(signature, expectedSignature)) return false;

    // Decode and check expiry
    const decoded = JSON.parse(atob(payload));
    return decoded.authenticated === true && decoded.expires > Date.now();
  } catch {
    return false;
  }
}

// Create admin session cookie value (signed)
export async function createAdminSession(runtimeEnv?: Record<string, string>): Promise<string> {
  const session = {
    authenticated: true,
    expires: Date.now() + SESSION_DURATION,
    createdAt: Date.now()
  };
  const payload = btoa(JSON.stringify(session));
  const signature = await signPayload(payload, runtimeEnv);
  return `${payload}.${signature}`;
}

// Validate admin password using constant-time comparison
export function validateAdminPassword(password: string, runtimeEnv?: Record<string, string>): boolean {
  const adminPassword = getEnvVar('ADMIN_PASSWORD', runtimeEnv);
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
