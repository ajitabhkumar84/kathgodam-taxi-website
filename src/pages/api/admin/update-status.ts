import type { APIRoute } from 'astro';
import { updateBookingStatus, addBookingCommunication, getAllVehicles } from '../../../lib/sanity';
import { isAdminAuthenticated } from '../../../lib/admin-auth';
import { requireCSRF } from '../../../lib/csrf';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    // Check admin authentication (cookie-based from admin session)
    if (!(await isAdminAuthenticated(cookies))) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Unauthorized'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // CSRF validation
    const csrfError = await requireCSRF(request, cookies);
    if (csrfError) return csrfError;

    const body = await request.json();
    const { bookingId, status, assignedVehicleId, adminNotes } = body;

    if (!bookingId) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Booking ID is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const validStatuses = ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'];
    if (status && !validStatuses.includes(status)) {
      return new Response(JSON.stringify({
        success: false,
        error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate vehicle ID if provided
    if (assignedVehicleId) {
      const vehicles = await getAllVehicles();
      const vehicleExists = vehicles.some(v => v._id === assignedVehicleId);
      if (!vehicleExists) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Invalid vehicle ID'
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    const updates: Record<string, any> = {};
    if (status) updates.status = status;
    if (assignedVehicleId) updates.assignedVehicleId = assignedVehicleId;
    if (adminNotes) updates.adminNotes = adminNotes;

    const booking = await updateBookingStatus(bookingId, updates);

    // Add communication log for status change
    if (status) {
      await addBookingCommunication(bookingId, {
        type: 'system',
        message: `Status updated to: ${status}`,
        sentBy: 'Admin'
      });
    }

    if (assignedVehicleId) {
      await addBookingCommunication(bookingId, {
        type: 'system',
        message: `Vehicle assigned: ${assignedVehicleId}`,
        sentBy: 'Admin'
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Booking updated successfully',
      booking: {
        bookingId: booking.bookingId,
        status: booking.status,
        paymentStatus: booking.paymentStatus
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error updating booking status:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to update booking'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
