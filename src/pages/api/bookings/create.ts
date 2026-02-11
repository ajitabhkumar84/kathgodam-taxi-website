import type { APIRoute } from 'astro';
import { createBooking, getBookingSettings, urlFor } from '../../../lib/sanity';
import { generateBookingId, isWithinLeadTime, isWithinBookingWindow, getPriceType, validatePhone, normalizePhone, validateEmail, checkAvailability, isDateBlocked, calculateAdvanceAmount } from '../../../lib/booking';
import { sendBookingConfirmationEmail, sendAdminNewBookingNotification } from '../../../lib/notifications';
import type { CarTypeValue } from '../../../types/vehicle';
import { checkRateLimit, createRateLimitResponse, RATE_LIMIT_PRESETS } from '../../../lib/rateLimit';
import { requireCSRF } from '../../../lib/csrf';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  // Check rate limit (3 bookings per 5 minutes)
  const rateLimitResult = checkRateLimit(request, RATE_LIMIT_PRESETS.BOOKING);
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult);
  }

  // Validate CSRF token
  const csrfError = await requireCSRF(request, cookies);
  if (csrfError) {
    return csrfError;
  }

  try {
    const body = await request.json();

    const {
      customerName,
      customerPhone,
      customerEmail,
      pickupLocation,
      dropLocation,
      hotelLocationDetail,
      travelDate,
      pickupTime,
      carType,
      carModel,
      passengerCount,
      totalAmount,
      sourceType,
      sourceRouteId,
      sourcePackageId,
      customerNotes
    } = body;

    // Validate required fields (email is optional)
    if (!customerName || !customerPhone || !pickupLocation || !dropLocation || !travelDate || !pickupTime || !carType || !totalAmount) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate phone number
    if (!validatePhone(customerPhone)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid phone number. Please enter a valid 10-digit Indian mobile number.'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate email (only if provided)
    if (customerEmail && !validateEmail(customerEmail)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid email address'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get booking settings
    const settings = await getBookingSettings();
    const minAdvanceHours = settings?.minAdvanceHours || 24;
    const maxAdvanceDays = settings?.advanceBookingDays || 30;

    // Check if travel date is blocked
    const blockedInfo = isDateBlocked(travelDate, settings);
    if (blockedInfo.blocked) {
      return new Response(JSON.stringify({
        success: false,
        error: blockedInfo.message,
        blockedReason: blockedInfo.reason,
        allowPhoneBooking: blockedInfo.allowPhoneBooking
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check lead time (24 hours minimum)
    if (!isWithinLeadTime(travelDate, pickupTime, minAdvanceHours)) {
      return new Response(JSON.stringify({
        success: false,
        error: `Bookings must be made at least ${minAdvanceHours} hours in advance`
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check booking window
    if (!isWithinBookingWindow(travelDate, maxAdvanceDays)) {
      return new Response(JSON.stringify({
        success: false,
        error: `Bookings can only be made up to ${maxAdvanceDays} days in advance`
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check availability
    const availability = await checkAvailability(travelDate, carType as CarTypeValue);
    if (!availability.available) {
      return new Response(JSON.stringify({
        success: false,
        error: `No ${carType} vehicles available on ${travelDate}. Please choose a different date or vehicle type.`
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generate booking ID
    const bookingId = generateBookingId();

    // Determine price type
    const priceType = getPriceType(travelDate, settings);

    // Calculate advance amount (25% of total, minimum ₹500)
    const advanceAmount = calculateAdvanceAmount(totalAmount);

    // Get Cloudflare runtime env for Secret env vars
    const runtimeEnv = (locals as any).runtime?.env;

    // Create booking
    const booking = await createBooking({
      bookingId,
      customerName,
      customerPhone: normalizePhone(customerPhone),
      customerEmail,
      pickupLocation,
      dropLocation,
      hotelLocationDetail,
      travelDate,
      pickupTime,
      carType: carType as CarTypeValue,
      carModel,
      passengerCount: passengerCount || 1,
      priceType,
      totalAmount,
      advanceAmount,
      sourceType,
      sourceRouteId,
      sourcePackageId,
      customerNotes
    }, runtimeEnv);

    // Build QR code URL for email if available
    const upiQrCodeUrl = settings?.upiQrCode
      ? urlFor(settings.upiQrCode).width(400).url()
      : undefined;

    // Send confirmation email to customer (non-blocking)
    sendBookingConfirmationEmail(booking, upiQrCodeUrl).catch(err => {
      console.error('Failed to send confirmation email:', err);
    });

    // Send notification email to admin (non-blocking)
    sendAdminNewBookingNotification(booking).catch(err => {
      console.error('Failed to send admin notification email:', err);
    });

    return new Response(JSON.stringify({
      success: true,
      bookingId: booking.bookingId,
      booking: {
        _id: booking._id,
        bookingId: booking.bookingId,
        customerName: booking.customerName,
        pickupLocation: booking.pickupLocation,
        dropLocation: booking.dropLocation,
        travelDate: booking.travelDate,
        pickupTime: booking.pickupTime,
        carType: booking.carType,
        totalAmount: booking.totalAmount,
        advanceAmount: booking.advanceAmount,
        status: booking.status,
        paymentStatus: booking.paymentStatus
      }
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error creating booking:', error);

    // Provide more descriptive error in development
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const isDev = import.meta.env.DEV;

    return new Response(JSON.stringify({
      success: false,
      error: isDev
        ? `Failed to create booking: ${errorMessage}`
        : 'Failed to create booking. Please try again.',
      ...(isDev && { details: String(error) })
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
