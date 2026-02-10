import type { APIRoute } from 'astro';
import { getBookingById } from '../../../lib/sanity';
import { isAdminAuthenticated } from '../../../lib/admin-auth';

export const prerender = false;

export const GET: APIRoute = async ({ params, cookies }) => {
  try {
    // Require admin authentication to view booking details
    if (!(await isAdminAuthenticated(cookies))) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Unauthorized'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { id } = params;

    if (!id) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Booking ID is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const booking = await getBookingById(id);

    if (!booking) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Booking not found'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      booking
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error fetching booking:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch booking'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
