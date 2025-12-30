import type { APIRoute } from 'astro';
import { checkAvailability } from '../../../lib/booking';
import type { CarTypeValue } from '../../../types/vehicle';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  try {
    const date = url.searchParams.get('date');
    const carType = url.searchParams.get('carType') as CarTypeValue | null;

    if (!date) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Date is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate date format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid date format. Use YYYY-MM-DD'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate car type if provided
    const validCarTypes: CarTypeValue[] = ['Hatchback', 'Sedan', 'SUV Standard', 'SUV Deluxe', 'SUV Luxury'];
    if (carType && !validCarTypes.includes(carType)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid car type'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const availability = await checkAvailability(date, carType || undefined);

    return new Response(JSON.stringify({
      success: true,
      date,
      carType: carType || 'all',
      ...availability
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error checking availability:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to check availability'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
