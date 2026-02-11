import type { APIRoute } from 'astro';
import { getCSRFToken } from '../../lib/csrf';

export const GET: APIRoute = async ({ cookies }) => {
  const token = getCSRFToken(cookies);

  return new Response(
    JSON.stringify({ csrfToken: token }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};
