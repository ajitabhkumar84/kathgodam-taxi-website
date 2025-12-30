// Notification utilities for booking emails and WhatsApp messages

import type { Booking } from '../types/booking'

// Resend API for sending emails
const RESEND_API_KEY = import.meta.env.RESEND_API_KEY
const FROM_EMAIL = import.meta.env.FROM_EMAIL || 'bookings@kathgodamtaxi.com'
const ADMIN_EMAIL = import.meta.env.ADMIN_EMAIL || 'kathgodamtaxi@gmail.com'
const BUSINESS_NAME = 'Kathgodam Taxi'
const BUSINESS_PHONE = '7351721351'
const BUSINESS_WHATSAPP = '917351721351'
const SANITY_STUDIO_URL = 'https://kathgodamtaxi.com/studio'

interface EmailOptions {
  to: string
  subject: string
  html: string
}

/**
 * Send email via Resend API
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured. Email not sent.')
    return false
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: `${BUSINESS_NAME} <${FROM_EMAIL}>`,
        to: options.to,
        subject: options.subject,
        html: options.html
      })
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Resend API error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}

/**
 * Generate booking confirmation email HTML
 */
export function generateBookingConfirmationEmail(booking: Booking): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">

  <!-- Header -->
  <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">🚕 Kathgodam Taxi</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Booking Confirmation</p>
  </div>

  <!-- Content -->
  <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">

    <p style="font-size: 16px; margin-bottom: 20px;">
      Dear <strong>${booking.customerName}</strong>,
    </p>

    <p style="margin-bottom: 20px;">
      Thank you for booking with Kathgodam Taxi! Your booking has been received and is being processed.
    </p>

    <!-- Booking ID -->
    <div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 8px; padding: 15px; text-align: center; margin-bottom: 25px;">
      <p style="margin: 0; color: #92400e; font-size: 14px;">Booking ID</p>
      <p style="margin: 5px 0 0 0; font-size: 24px; font-weight: bold; color: #78350f; font-family: monospace;">${booking.bookingId}</p>
    </div>

    <!-- Trip Details -->
    <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
      <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 16px;">Trip Details</h3>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280; width: 40%;">From</td>
          <td style="padding: 8px 0; font-weight: 500;">${booking.pickupLocation}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">To</td>
          <td style="padding: 8px 0; font-weight: 500;">${booking.dropLocation}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Date</td>
          <td style="padding: 8px 0; font-weight: 500;">${booking.travelDate}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Time</td>
          <td style="padding: 8px 0; font-weight: 500;">${booking.pickupTime}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Trip Type</td>
          <td style="padding: 8px 0; font-weight: 500;">${booking.isRoundTrip ? 'Round Trip' : 'One Way'}</td>
        </tr>
        ${booking.isRoundTrip && booking.returnDate ? `
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Return Date</td>
          <td style="padding: 8px 0; font-weight: 500;">${booking.returnDate}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Vehicle</td>
          <td style="padding: 8px 0; font-weight: 500;">${booking.carType}${booking.carModel ? ` (${booking.carModel})` : ''}</td>
        </tr>
      </table>
    </div>

    <!-- Amount -->
    <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 25px;">
      <p style="margin: 0; color: #065f46; font-size: 14px;">Total Amount</p>
      <p style="margin: 5px 0 0 0; font-size: 32px; font-weight: bold; color: #047857;">₹${booking.totalAmount?.toLocaleString('en-IN')}</p>
    </div>

    <!-- Payment Status -->
    <div style="background: ${booking.paymentStatus === 'verified' ? '#ecfdf5' : '#fef9c3'}; border-radius: 8px; padding: 15px; margin-bottom: 25px;">
      <p style="margin: 0; text-align: center; color: ${booking.paymentStatus === 'verified' ? '#065f46' : '#854d0e'};">
        ${booking.paymentStatus === 'verified'
          ? '✅ Payment Verified - Your booking is confirmed!'
          : '⏳ Complete payment to confirm your booking'}
      </p>
    </div>

    <!-- Next Steps -->
    <div style="margin-bottom: 25px;">
      <h3 style="margin: 0 0 10px 0; color: #1f2937; font-size: 16px;">What's Next?</h3>
      <ol style="margin: 0; padding-left: 20px; color: #4b5563;">
        ${booking.paymentStatus !== 'verified' ? `
        <li style="margin-bottom: 8px;">Complete your payment using UPI</li>
        <li style="margin-bottom: 8px;">Share payment screenshot via WhatsApp</li>
        ` : ''}
        <li style="margin-bottom: 8px;">You'll receive a confirmation once payment is verified</li>
        <li style="margin-bottom: 8px;">Our driver will contact you before pickup</li>
      </ol>
    </div>

    <!-- Track Booking Button -->
    <div style="text-align: center; margin-bottom: 25px;">
      <a href="https://kathgodamtaxi.com/book/${booking.bookingId}"
         style="display: inline-block; background: #f59e0b; color: white; text-decoration: none; padding: 12px 30px; border-radius: 8px; font-weight: 500;">
        Track Your Booking
      </a>
    </div>

    <!-- Contact -->
    <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
      <p style="margin: 0 0 10px 0;">Need help? Contact us:</p>
      <p style="margin: 0;">
        📞 <a href="tel:${BUSINESS_PHONE}" style="color: #f59e0b; text-decoration: none;">${BUSINESS_PHONE}</a>
        &nbsp;|&nbsp;
        💬 <a href="https://wa.me/${BUSINESS_WHATSAPP}" style="color: #25d366; text-decoration: none;">WhatsApp</a>
      </p>
    </div>

  </div>

  <!-- Footer -->
  <div style="background: #1f2937; padding: 20px; border-radius: 0 0 10px 10px; text-align: center;">
    <p style="margin: 0; color: #9ca3af; font-size: 12px;">
      © ${new Date().getFullYear()} Kathgodam Taxi. All rights reserved.
    </p>
    <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 11px;">
      Your trusted taxi service in Kumaon Hills
    </p>
  </div>

</body>
</html>
  `.trim()
}

/**
 * Generate payment verified email HTML
 */
export function generatePaymentVerifiedEmail(booking: Booking): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Confirmed</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">

  <!-- Header -->
  <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">✅ Payment Confirmed!</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Your trip is all set</p>
  </div>

  <!-- Content -->
  <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">

    <p style="font-size: 16px; margin-bottom: 20px;">
      Dear <strong>${booking.customerName}</strong>,
    </p>

    <p style="margin-bottom: 20px;">
      Great news! Your payment has been verified and your booking is now <strong>CONFIRMED</strong>. 🎉
    </p>

    <!-- Booking ID -->
    <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 15px; text-align: center; margin-bottom: 25px;">
      <p style="margin: 0; color: #065f46; font-size: 14px;">Booking ID</p>
      <p style="margin: 5px 0 0 0; font-size: 24px; font-weight: bold; color: #047857; font-family: monospace;">${booking.bookingId}</p>
      <p style="margin: 10px 0 0 0; color: #059669; font-size: 14px;">✅ Confirmed</p>
    </div>

    <!-- Trip Summary -->
    <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
      <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 16px;">Your Trip</h3>

      <div style="display: flex; align-items: center; margin-bottom: 15px;">
        <div style="flex: 1;">
          <p style="margin: 0; font-size: 14px; color: #6b7280;">From</p>
          <p style="margin: 5px 0 0 0; font-weight: 600;">${booking.pickupLocation}</p>
        </div>
        <div style="padding: 0 15px; color: #f59e0b;">→</div>
        <div style="flex: 1;">
          <p style="margin: 0; font-size: 14px; color: #6b7280;">To</p>
          <p style="margin: 5px 0 0 0; font-weight: 600;">${booking.dropLocation}</p>
        </div>
      </div>

      <div style="border-top: 1px solid #e5e7eb; padding-top: 15px;">
        <p style="margin: 0 0 5px 0;">
          📅 <strong>${booking.travelDate}</strong> at <strong>${booking.pickupTime}</strong>
        </p>
        <p style="margin: 0;">
          🚗 ${booking.carType}${booking.carModel ? ` (${booking.carModel})` : ''}
        </p>
      </div>
    </div>

    <!-- Amount Paid -->
    <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 15px; text-align: center; margin-bottom: 25px;">
      <p style="margin: 0; color: #166534; font-size: 14px;">Amount Paid</p>
      <p style="margin: 5px 0 0 0; font-size: 28px; font-weight: bold; color: #15803d;">₹${booking.totalAmount?.toLocaleString('en-IN')}</p>
    </div>

    <!-- What to expect -->
    <div style="margin-bottom: 25px;">
      <h3 style="margin: 0 0 10px 0; color: #1f2937; font-size: 16px;">What to Expect</h3>
      <ul style="margin: 0; padding-left: 20px; color: #4b5563;">
        <li style="margin-bottom: 8px;">Our driver will call you before arriving</li>
        <li style="margin-bottom: 8px;">Be ready at the pickup location on time</li>
        <li style="margin-bottom: 8px;">Keep this booking ID handy for reference</li>
      </ul>
    </div>

    <!-- Contact -->
    <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
      <p style="margin: 0 0 10px 0;">Questions? We're here to help:</p>
      <p style="margin: 0;">
        📞 <a href="tel:${BUSINESS_PHONE}" style="color: #f59e0b; text-decoration: none;">${BUSINESS_PHONE}</a>
        &nbsp;|&nbsp;
        💬 <a href="https://wa.me/${BUSINESS_WHATSAPP}" style="color: #25d366; text-decoration: none;">WhatsApp</a>
      </p>
    </div>

  </div>

  <!-- Footer -->
  <div style="background: #1f2937; padding: 20px; border-radius: 0 0 10px 10px; text-align: center;">
    <p style="margin: 0; color: #9ca3af; font-size: 12px;">
      Thank you for choosing Kathgodam Taxi! 🙏
    </p>
  </div>

</body>
</html>
  `.trim()
}

/**
 * Send booking confirmation email
 */
export async function sendBookingConfirmationEmail(booking: Booking): Promise<boolean> {
  if (!booking.customerEmail) {
    console.log('No customer email, skipping email notification')
    return false
  }

  return sendEmail({
    to: booking.customerEmail,
    subject: `Booking Confirmed - ${booking.bookingId} | Kathgodam Taxi`,
    html: generateBookingConfirmationEmail(booking)
  })
}

/**
 * Send payment verified email
 */
export async function sendPaymentVerifiedEmail(booking: Booking): Promise<boolean> {
  if (!booking.customerEmail) {
    console.log('No customer email, skipping email notification')
    return false
  }

  return sendEmail({
    to: booking.customerEmail,
    subject: `Payment Confirmed ✅ - ${booking.bookingId} | Kathgodam Taxi`,
    html: generatePaymentVerifiedEmail(booking)
  })
}

/**
 * Generate WhatsApp message URL for booking confirmation
 */
export function generateWhatsAppConfirmationUrl(booking: Booking): string {
  const message = `Hi ${booking.customerName},

Your booking ${booking.bookingId} has been received! ✅

Trip Details:
📍 ${booking.pickupLocation} → ${booking.dropLocation}
📅 ${booking.travelDate}
⏰ ${booking.pickupTime}
🚗 ${booking.carType}${booking.carModel ? ` (${booking.carModel})` : ''}
💰 ₹${booking.totalAmount?.toLocaleString('en-IN')}

${booking.paymentStatus === 'verified'
  ? 'Your booking is CONFIRMED! Our driver will contact you before pickup.'
  : 'Please complete the payment to confirm your booking.'}

Track your booking: kathgodamtaxi.com/book/${booking.bookingId}

Thank you for choosing Kathgodam Taxi! 🙏`

  return `https://wa.me/91${booking.customerPhone}?text=${encodeURIComponent(message)}`
}

/**
 * Generate WhatsApp message URL for payment verified
 */
export function generateWhatsAppPaymentVerifiedUrl(booking: Booking): string {
  const message = `Hi ${booking.customerName},

Great news! Your payment for booking ${booking.bookingId} has been VERIFIED! ✅

Your trip is now CONFIRMED! 🎉

Trip Details:
📍 ${booking.pickupLocation} → ${booking.dropLocation}
📅 ${booking.travelDate}
⏰ ${booking.pickupTime}
🚗 ${booking.carType}${booking.carModel ? ` (${booking.carModel})` : ''}
💰 ₹${booking.totalAmount?.toLocaleString('en-IN')} (Paid)

Our driver will contact you before pickup.

Have a safe and pleasant journey! 🚕`

  return `https://wa.me/91${booking.customerPhone}?text=${encodeURIComponent(message)}`
}

/**
 * Generate admin notification email HTML for new booking
 */
export function generateAdminNewBookingEmail(booking: Booking): string {
  const whatsappUrl = `https://wa.me/91${booking.customerPhone}`
  const phoneUrl = `tel:+91${booking.customerPhone}`
  const studioUrl = `${SANITY_STUDIO_URL}/structure/booking;${booking._id}`

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Booking Received</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">

  <!-- Header -->
  <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 25px; border-radius: 10px 10px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 22px;">🚕 New Booking Received!</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">${booking.bookingId}</p>
  </div>

  <!-- Content -->
  <div style="background: #ffffff; padding: 25px; border: 1px solid #e5e7eb; border-top: none;">

    <!-- Quick Actions -->
    <div style="background: #fef3c7; border-radius: 8px; padding: 15px; margin-bottom: 20px; text-align: center;">
      <p style="margin: 0 0 10px 0; font-weight: 600; color: #92400e;">Quick Actions</p>
      <a href="${whatsappUrl}" style="display: inline-block; background: #25d366; color: white; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: 500; margin-right: 10px;">WhatsApp</a>
      <a href="${phoneUrl}" style="display: inline-block; background: #3b82f6; color: white; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: 500;">Call</a>
    </div>

    <!-- Customer Info -->
    <div style="background: #f9fafb; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
      <h3 style="margin: 0 0 10px 0; color: #1f2937; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Customer Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 6px 0; color: #6b7280; width: 35%;">Name</td>
          <td style="padding: 6px 0; font-weight: 600;">${booking.customerName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #6b7280;">Phone</td>
          <td style="padding: 6px 0; font-weight: 600;">
            <a href="${phoneUrl}" style="color: #2563eb; text-decoration: none;">${booking.customerPhone}</a>
          </td>
        </tr>
        ${booking.customerEmail ? `
        <tr>
          <td style="padding: 6px 0; color: #6b7280;">Email</td>
          <td style="padding: 6px 0;">${booking.customerEmail}</td>
        </tr>
        ` : ''}
      </table>
    </div>

    <!-- Trip Details -->
    <div style="background: #f9fafb; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
      <h3 style="margin: 0 0 10px 0; color: #1f2937; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Trip Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 6px 0; color: #6b7280; width: 35%;">From</td>
          <td style="padding: 6px 0; font-weight: 600;">${booking.pickupLocation}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #6b7280;">To</td>
          <td style="padding: 6px 0; font-weight: 600;">${booking.dropLocation}</td>
        </tr>
        ${booking.hotelLocationDetail ? `
        <tr>
          <td style="padding: 6px 0; color: #6b7280;">Hotel/Location</td>
          <td style="padding: 6px 0;">${booking.hotelLocationDetail}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 6px 0; color: #6b7280;">Date</td>
          <td style="padding: 6px 0; font-weight: 600; color: #dc2626;">${booking.travelDate}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #6b7280;">Time</td>
          <td style="padding: 6px 0; font-weight: 600;">${booking.pickupTime}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #6b7280;">Vehicle</td>
          <td style="padding: 6px 0; font-weight: 500;">${booking.carType}${booking.carModel ? ` (${booking.carModel})` : ''}</td>
        </tr>
        ${booking.passengerCount ? `
        <tr>
          <td style="padding: 6px 0; color: #6b7280;">Passengers</td>
          <td style="padding: 6px 0;">${booking.passengerCount}</td>
        </tr>
        ` : ''}
      </table>
    </div>

    <!-- Pricing -->
    <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 6px 0; color: #065f46;">Total Amount</td>
          <td style="padding: 6px 0; font-weight: 700; font-size: 20px; color: #047857; text-align: right;">₹${booking.totalAmount?.toLocaleString('en-IN')}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #065f46;">Advance Required</td>
          <td style="padding: 6px 0; font-weight: 600; color: #047857; text-align: right;">₹${booking.advanceAmount?.toLocaleString('en-IN')}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #065f46;">Payment Status</td>
          <td style="padding: 6px 0; text-align: right;">
            <span style="background: ${booking.paymentStatus === 'verified' ? '#10b981' : '#f59e0b'}; color: white; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 500;">
              ${booking.paymentStatus === 'verified' ? 'VERIFIED' : 'PENDING'}
            </span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Customer Notes -->
    ${booking.customerNotes ? `
    <div style="background: #fef9c3; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
      <h3 style="margin: 0 0 8px 0; color: #854d0e; font-size: 14px;">Customer Notes</h3>
      <p style="margin: 0; color: #713f12;">${booking.customerNotes}</p>
    </div>
    ` : ''}

    <!-- View in Studio -->
    <div style="text-align: center; margin-top: 25px;">
      <a href="${studioUrl}" style="display: inline-block; background: #1f2937; color: white; text-decoration: none; padding: 12px 30px; border-radius: 8px; font-weight: 500;">
        View in Sanity Studio
      </a>
    </div>

  </div>

  <!-- Footer -->
  <div style="background: #1f2937; padding: 15px; border-radius: 0 0 10px 10px; text-align: center;">
    <p style="margin: 0; color: #9ca3af; font-size: 12px;">
      Booking received at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
    </p>
  </div>

</body>
</html>
  `.trim()
}

/**
 * Send admin notification email for new booking
 */
export async function sendAdminNewBookingNotification(booking: Booking): Promise<boolean> {
  return sendEmail({
    to: ADMIN_EMAIL,
    subject: `🚕 New Booking: ${booking.bookingId} | ${booking.pickupLocation} → ${booking.dropLocation}`,
    html: generateAdminNewBookingEmail(booking)
  })
}
