/**
 * Rate Limiting Utility
 * Simple in-memory rate limiter for API endpoints
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

export interface RateLimitConfig {
  /** Maximum number of requests allowed within the window */
  maxRequests: number;
  /** Time window in seconds */
  windowSeconds: number;
  /** Custom identifier (defaults to IP address) */
  identifier?: string;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  message?: string;
}

/**
 * Check if a request should be rate limited
 * @param request - The Astro request object
 * @param config - Rate limit configuration
 * @returns Rate limit result with allowed status and metadata
 */
export function checkRateLimit(
  request: Request,
  config: RateLimitConfig
): RateLimitResult {
  const { maxRequests, windowSeconds, identifier } = config;

  // Get identifier (custom identifier or IP address)
  const key = identifier || getClientIP(request);
  const now = Date.now();
  const windowMs = windowSeconds * 1000;

  // Get or create rate limit entry
  let entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetTime) {
    // Create new entry if doesn't exist or window expired
    entry = {
      count: 1,
      resetTime: now + windowMs,
    };
    rateLimitStore.set(key, entry);

    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: entry.resetTime,
    };
  }

  // Increment count
  entry.count++;

  // Check if limit exceeded
  if (entry.count > maxRequests) {
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
      message: `Rate limit exceeded. Try again in ${retryAfter} seconds.`,
    };
  }

  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

/**
 * Extract client IP address from request headers.
 * Prioritizes platform-set headers (not client-controlled) over generic proxied headers.
 */
function getClientIP(request: Request): string {
  const headers = request.headers;

  // Prioritize platform-specific headers that are set by the hosting infrastructure
  // and cannot be spoofed by the client:
  // - Cloudflare: cf-connecting-ip
  // - Vercel: x-real-ip (set by Vercel's edge)
  // - AWS CloudFront: cloudfront-viewer-address
  const trustedHeaders = [
    'cf-connecting-ip',
    'x-real-ip',
    'cloudfront-viewer-address',
  ];

  for (const header of trustedHeaders) {
    const value = headers.get(header);
    if (value) {
      return value.split(',')[0].trim();
    }
  }

  // Fallback: x-forwarded-for (less trusted but better than nothing)
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  return 'unknown';
}

/**
 * Preset rate limit configurations
 */
export const RATE_LIMIT_PRESETS = {
  /** Strict: 5 requests per minute */
  STRICT: { maxRequests: 5, windowSeconds: 60 },

  /** Standard: 10 requests per minute */
  STANDARD: { maxRequests: 10, windowSeconds: 60 },

  /** Booking: 3 bookings per 5 minutes */
  BOOKING: { maxRequests: 3, windowSeconds: 300 },

  /** Contact Form: 5 submissions per 10 minutes */
  CONTACT: { maxRequests: 5, windowSeconds: 600 },

  /** Admin Login: 5 attempts per 15 minutes */
  ADMIN_LOGIN: { maxRequests: 5, windowSeconds: 900 },

  /** API: 60 requests per minute */
  API: { maxRequests: 60, windowSeconds: 60 },
};

/**
 * Helper to create a rate-limited response
 */
export function createRateLimitResponse(result: RateLimitResult): Response {
  const retryAfter = Math.ceil((result.resetTime - Date.now()) / 1000);

  return new Response(
    JSON.stringify({
      error: 'Too Many Requests',
      message: result.message || 'Rate limit exceeded. Please try again later.',
      retryAfter,
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': retryAfter.toString(),
        'X-RateLimit-Limit': '0',
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': new Date(result.resetTime).toISOString(),
      },
    }
  );
}
