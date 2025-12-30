import type { APIRoute } from 'astro';
import { getBookingSettings } from '../../../lib/sanity';

export const prerender = false;

// Get season and blocked date information for the booking calendar
export const GET: APIRoute = async ({ url }) => {
  try {
    const settings = await getBookingSettings();

    if (!settings) {
      return new Response(JSON.stringify({
        success: true,
        defaultSeason: 'offSeason',
        seasonDateRanges: [],
        blockedDateRanges: [],
        advanceBookingDays: 30,
        minAdvanceHours: 24
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      defaultSeason: settings.defaultSeason || 'offSeason',
      seasonDateRanges: settings.seasonDateRanges || [],
      blockedDateRanges: (settings.blockedDateRanges || []).map(range => ({
        name: range.name,
        startDate: range.startDate,
        endDate: range.endDate,
        message: range.message,
        allowPhoneBooking: range.allowPhoneBooking
      })),
      advanceBookingDays: settings.advanceBookingDays || 30,
      minAdvanceHours: settings.minAdvanceHours || 24
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error fetching season settings:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch settings'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
