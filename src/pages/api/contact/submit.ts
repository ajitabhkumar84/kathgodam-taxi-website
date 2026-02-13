import type { APIRoute } from 'astro'
import { checkRateLimit, createRateLimitResponse, RATE_LIMIT_PRESETS } from '../../../lib/rateLimit'
import { requireCSRF } from '../../../lib/csrf'

// Email configuration from environment variables
const FROM_EMAIL = import.meta.env.FROM_EMAIL || 'noreply@mail.kathgodamtaxi.in'
const ADMIN_EMAIL = import.meta.env.ADMIN_EMAIL || 'kathgodamtaxi@gmail.com'

// HTML-escape user input to prevent XSS in email clients
function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    // Check if Resend API key is configured
    if (!import.meta.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Email service is not configured. Please contact the administrator.',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Rate limiting
    const rateLimitResult = checkRateLimit(request, RATE_LIMIT_PRESETS.CONTACT);
    if (!rateLimitResult.allowed) {
      return createRateLimitResponse(rateLimitResult);
    }

    // CSRF validation
    const csrfError = await requireCSRF(request, cookies);
    if (csrfError) return csrfError;

    const formData = await request.formData()

    // Extract and sanitize form fields
    const name = escapeHtml((formData.get('name') as string) || '')
    const mobile = escapeHtml((formData.get('mobile') as string) || '')
    const email = escapeHtml((formData.get('email') as string) || '')
    const pickupPoint = escapeHtml((formData.get('pickupPoint') as string) || '')
    const startingDate = escapeHtml((formData.get('startingDate') as string) || '')
    const pickupTime = escapeHtml((formData.get('pickupTime') as string) || '')
    const endingDate = escapeHtml((formData.get('endingDate') as string) || '')
    const carCategory = escapeHtml((formData.get('carCategory') as string) || '')
    const otherCarCategory = escapeHtml((formData.get('otherCarCategory') as string) || '')
    const message = escapeHtml((formData.get('message') as string) || '')

    // Basic validation
    if (!name || !mobile || !email || !pickupPoint || !startingDate) {
      return new Response(
        JSON.stringify({ success: false, error: 'Required fields are missing' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const rawEmail = (formData.get('email') as string) || '';
    if (!emailRegex.test(rawEmail)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid email address' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // Determine final car category
    const finalCarCategory =
      carCategory === 'other' && otherCarCategory
        ? `Other: ${otherCarCategory}`
        : carCategory

    // Email HTML template for admin
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #000; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 20px; }
            .section { margin-bottom: 20px; }
            .section h2 { color: #f59e0b; border-bottom: 2px solid #f59e0b; padding-bottom: 8px; }
            .field { margin: 10px 0; }
            .label { font-weight: bold; color: #666; }
            .value { color: #000; }
            .footer { margin-top: 20px; padding: 20px; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Tour Booking Request</h1>
            </div>
            <div class="content">
              <div class="section">
                <h2>Customer Details</h2>
                <div class="field">
                  <span class="label">Name:</span> <span class="value">${name}</span>
                </div>
                <div class="field">
                  <span class="label">Mobile:</span> <span class="value">${mobile}</span>
                </div>
                <div class="field">
                  <span class="label">Email:</span> <span class="value">${email}</span>
                </div>
              </div>

              <div class="section">
                <h2>Tour Details</h2>
                <div class="field">
                  <span class="label">Pickup Point:</span> <span class="value">${pickupPoint}</span>
                </div>
                <div class="field">
                  <span class="label">Starting Date:</span> <span class="value">${startingDate}</span>
                </div>
                <div class="field">
                  <span class="label">Pickup Time / Train Name:</span> <span class="value">${pickupTime || 'Not specified'}</span>
                </div>
                <div class="field">
                  <span class="label">Ending Date:</span> <span class="value">${endingDate}</span>
                </div>
              </div>

              <div class="section">
                <h2>Vehicle Information</h2>
                <div class="field">
                  <span class="label">Car Category:</span> <span class="value">${finalCarCategory}</span>
                </div>
              </div>

              ${
                message
                  ? `
              <div class="section">
                <h2>Additional Requirements</h2>
                <div class="field">
                  <span class="value">${message.replace(/\n/g, '<br>')}</span>
                </div>
              </div>
              `
                  : ''
              }
            </div>
            <div class="footer">
              <p>This request was submitted via the Kathgodam Taxi website contact form.</p>
              <p>Reply to this email or contact the customer directly at ${mobile}</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Email HTML template for customer confirmation
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #000; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 20px; }
            .section { margin-bottom: 20px; }
            .section h2 { color: #f59e0b; border-bottom: 2px solid #f59e0b; padding-bottom: 8px; }
            .field { margin: 10px 0; }
            .label { font-weight: bold; color: #666; }
            .value { color: #000; }
            .footer { margin-top: 20px; padding: 20px; background: #000; color: #fff; text-align: center; border-radius: 8px; }
            .cta { display: inline-block; margin-top: 15px; padding: 12px 24px; background: #f59e0b; color: #000; text-decoration: none; border-radius: 6px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Your Booking Request!</h1>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              <p>Thank you for choosing Kathgodam Taxi! We have received your tour booking request and will get back to you shortly.</p>

              <div class="section">
                <h2>Your Booking Details</h2>
                <div class="field">
                  <span class="label">Pickup Point:</span> <span class="value">${pickupPoint}</span>
                </div>
                <div class="field">
                  <span class="label">Starting Date:</span> <span class="value">${startingDate}</span>
                </div>
                <div class="field">
                  <span class="label">Pickup Time / Train Name:</span> <span class="value">${pickupTime || 'Not specified'}</span>
                </div>
                <div class="field">
                  <span class="label">Ending Date:</span> <span class="value">${endingDate}</span>
                </div>
                <div class="field">
                  <span class="label">Car Category:</span> <span class="value">${finalCarCategory}</span>
                </div>
                ${
                  message
                    ? `
                <div class="field">
                  <span class="label">Additional Requirements:</span><br>
                  <span class="value">${message.replace(/\n/g, '<br>')}</span>
                </div>
                `
                    : ''
                }
              </div>

              <p>Our team will review your request and contact you within a few hours to confirm availability and provide a detailed quote.</p>
            </div>
            <div class="footer">
              <p><strong>Need immediate assistance?</strong></p>
              <p>Call us: +91 7351721351</p>
              <p>WhatsApp: +91 7351721351</p>
              <a href="https://wa.me/917351721351" class="cta">Chat on WhatsApp</a>
              <p style="margin-top: 20px; font-size: 12px; color: #999;">
                Kathgodam Taxi Services<br>
                A19- Near Kathgodam Railway Station, Nainital, Uttarakhand 263126
              </p>
            </div>
          </div>
        </body>
      </html>
    `

    // Use Resend HTTP API directly (compatible with Cloudflare Workers)
    const RESEND_API_URL = 'https://api.resend.com/emails';
    const resendHeaders = {
      'Authorization': `Bearer ${import.meta.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    };

    // Send email to admin
    const adminEmailRes = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: resendHeaders,
      body: JSON.stringify({
        from: `Kathgodam Taxi <${FROM_EMAIL}>`,
        to: [ADMIN_EMAIL],
        reply_to: rawEmail,
        subject: `New Tour Booking Request from ${name}`,
        html: adminEmailHtml,
      }),
    });

    // Send confirmation email to customer
    const customerEmailRes = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: resendHeaders,
      body: JSON.stringify({
        from: `Kathgodam Taxi <${FROM_EMAIL}>`,
        to: [rawEmail],
        subject: 'Your Tour Booking Request - Kathgodam Taxi',
        html: customerEmailHtml,
      }),
    });

    if (!adminEmailRes.ok || !customerEmailRes.ok) {
      const failedRes = !adminEmailRes.ok ? adminEmailRes : customerEmailRes;
      const errorBody = await failedRes.text();
      console.error('Resend API error:', failedRes.status, errorBody);
      return new Response(
        JSON.stringify({
          success: false,
          error: `Email error: ${failedRes.status} - Failed to send email`,
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Form submitted successfully',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('API error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Internal server error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
