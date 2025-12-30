import type { APIRoute } from 'astro';
import { updateBookingStatus, addBookingCommunication, getBookingById } from '../../../lib/sanity';
import { isAdminAuthenticated } from '../../../lib/admin-auth';
import { sendPaymentVerifiedEmail } from '../../../lib/notifications';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    // Check admin authentication (cookie-based from admin session)
    if (!isAdminAuthenticated(cookies)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Unauthorized'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = await request.json();
    const { bookingId, action, transactionId, adminNotes } = body;

    if (!bookingId || !action) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Booking ID and action are required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!['verify', 'verified', 'reject', 'rejected'].includes(action)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Action must be "verified" or "rejected"'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const now = new Date().toISOString();
    const isVerify = action === 'verify' || action === 'verified';

    if (isVerify) {
      // Verify payment and confirm booking
      const booking = await updateBookingStatus(bookingId, {
        paymentStatus: 'verified',
        paymentVerifiedAt: now,
        paymentVerifiedBy: 'Admin',
        transactionId,
        status: 'confirmed',
        adminNotes
      });

      // Add communication log
      await addBookingCommunication(bookingId, {
        type: 'system',
        message: `Payment verified. Transaction ID: ${transactionId || 'N/A'}`,
        sentBy: 'Admin'
      });

      // Send payment verified email (non-blocking)
      const fullBooking = await getBookingById(bookingId);
      if (fullBooking?.customerEmail) {
        sendPaymentVerifiedEmail(fullBooking).catch(err => {
          console.error('Failed to send payment verified email:', err);
        });
      }

      return new Response(JSON.stringify({
        success: true,
        message: 'Payment verified and booking confirmed',
        booking: {
          bookingId: booking.bookingId,
          status: booking.status,
          paymentStatus: booking.paymentStatus
        }
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });

    } else {
      // Reject payment
      const booking = await updateBookingStatus(bookingId, {
        paymentStatus: 'rejected',
        adminNotes: adminNotes || 'Payment rejected by admin'
      });

      // Add communication log
      await addBookingCommunication(bookingId, {
        type: 'system',
        message: `Payment rejected. Reason: ${adminNotes || 'Not specified'}`,
        sentBy: 'Admin'
      });

      return new Response(JSON.stringify({
        success: true,
        message: 'Payment rejected',
        booking: {
          bookingId: booking.bookingId,
          status: booking.status,
          paymentStatus: booking.paymentStatus
        }
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    console.error('Error verifying payment:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to process payment verification'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
