import type { APIRoute } from 'astro';
import { getBookingsByPhone } from '../../../lib/sanity';
import { validatePhone, normalizePhone } from '../../../lib/booking';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  try {
    const phone = url.searchParams.get('phone');

    if (!phone) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Phone number is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!validatePhone(phone)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid phone number format'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const normalizedPhone = normalizePhone(phone);
    const bookings = await getBookingsByPhone(normalizedPhone);

    return new Response(JSON.stringify({
      success: true,
      bookings,
      count: bookings.length
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error looking up bookings:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to lookup bookings'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
