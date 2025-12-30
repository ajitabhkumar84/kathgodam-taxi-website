import React, { useRef, useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { calculateAdvanceAmount } from '../../lib/booking';

interface PaymentStepProps {
  upiQrCodeUrl?: string;
  upiId?: string;
  payeeName?: string;
  bookingTerms?: string;
  helpPhone?: string;
  helpWhatsapp?: string;
  isModal?: boolean;
  onClose?: () => void;
}

export default function PaymentStep({
  upiQrCodeUrl,
  upiId = 'kathgodamtaxi@upi',
  payeeName = 'Kathgodam Taxi',
  helpPhone = '7351721351',
  helpWhatsapp = '917351721351',
  isModal = false,
  onClose
}: PaymentStepProps) {
  const { state } = useBooking();
  const bookingCardRef = useRef<HTMLDivElement>(null);
  const [showSaveOptions, setShowSaveOptions] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Calculate advance amount (25% of total, minimum ₹500)
  const advanceAmount = calculateAdvanceAmount(state.totalAmount);
  const remainingAmount = state.totalAmount - advanceAmount;

  // Generate booking text for sharing
  const generateBookingText = () => {
    const hotelInfo = state.hotelLocationDetail ? ` (${state.hotelLocationDetail})` : '';
    return `Kathgodam Taxi Booking Confirmation

Booking ID: ${state.bookingId}
Name: ${state.customerName}
Phone: +91${state.customerPhone}

Trip Details:
From: ${state.pickupLocation}
To: ${state.dropLocation}${hotelInfo}
Date: ${state.travelDate}
Time: ${state.pickupTime}
Vehicle: ${state.carType} (${state.carModel})

Amount Details:
Total: Rs.${state.totalAmount.toLocaleString('en-IN')}
Advance: Rs.${advanceAmount.toLocaleString('en-IN')}
Remaining: Rs.${remainingAmount.toLocaleString('en-IN')}

Thank you for choosing Kathgodam Taxi!
Contact: ${helpPhone}`;
  };

  // Share using Web Share API
  const handleShare = async () => {
    const shareData = {
      title: `Booking ${state.bookingId} - Kathgodam Taxi`,
      text: generateBookingText(),
      url: `https://kathgodamtaxi.com/book/${state.bookingId}`
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(generateBookingText());
        alert('Booking details copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  // Save as image using html-to-image
  const handleSaveAsImage = async () => {
    if (!bookingCardRef.current) return;

    setIsSaving(true);
    try {
      // Dynamically import html-to-image
      const { toPng } = await import('html-to-image');

      const dataUrl = await toPng(bookingCardRef.current, {
        backgroundColor: '#ffffff',
        pixelRatio: 2,
        style: {
          // Override any oklch colors that might cause issues
          transform: 'scale(1)',
        }
      });

      // Download the image
      const link = document.createElement('a');
      link.download = `Booking-${state.bookingId}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      // Fallback: copy text to clipboard
      try {
        await navigator.clipboard.writeText(generateBookingText());
        alert('Could not save image. Booking details copied to clipboard instead!');
      } catch {
        alert('Could not save image. Please take a screenshot manually.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Copy booking ID to clipboard
  const handleCopyBookingId = async () => {
    try {
      await navigator.clipboard.writeText(state.bookingId);
      alert('Booking ID copied!');
    } catch (error) {
      console.error('Error copying:', error);
    }
  };

  // Generate WhatsApp message for payment confirmation
  const generateWhatsAppMessage = () => {
    const hotelInfo = state.hotelLocationDetail ? ` (${state.hotelLocationDetail})` : '';
    const message = `Hi, I have completed advance payment for my booking:

Booking ID: ${state.bookingId}
Name: ${state.customerName}
Phone: ${state.customerPhone}
Route: ${state.pickupLocation} to ${state.dropLocation}${hotelInfo}
Date: ${state.travelDate}
Time: ${state.pickupTime}
Vehicle: ${state.carType} (${state.carModel})
Total Amount: Rs.${state.totalAmount.toLocaleString('en-IN')}
Advance Paid: Rs.${advanceAmount.toLocaleString('en-IN')}
Remaining: Rs.${remainingAmount.toLocaleString('en-IN')}

Please confirm my booking.`;

    return encodeURIComponent(message);
  };

  const whatsappLink = `https://wa.me/${helpWhatsapp}?text=${generateWhatsAppMessage()}`;

  return (
    <div className={isModal ? 'p-4' : ''}>
      {/* Saveable Booking Card - wrapped in ref */}
      <div ref={bookingCardRef} className="bg-white">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Created!</h2>
          <p className="text-gray-600 mb-2">
            Your booking ID is{' '}
            <button
              onClick={handleCopyBookingId}
              className="font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
              title="Click to copy"
            >
              {state.bookingId}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </p>
          <p className="text-sm text-amber-700 bg-amber-50 inline-block px-3 py-1 rounded-full">
            Your booking will be confirmed once we verify your advance payment
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Booking Details</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Booking ID</span>
            <span className="font-mono font-medium">{state.bookingId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Route</span>
            <span className="font-medium text-right">
              {state.pickupLocation} → {state.dropLocation}
              {state.hotelLocationDetail && (
                <span className="text-gray-500 text-xs block">({state.hotelLocationDetail})</span>
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date & Time</span>
            <span className="font-medium">{state.travelDate} at {state.pickupTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Vehicle</span>
            <span className="font-medium">{state.carType} ({state.carModel})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Passengers</span>
            <span className="font-medium">{state.passengerCount}</span>
          </div>
          <div className="pt-2 mt-2 border-t border-gray-200 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-medium">Rs.{state.totalAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between bg-amber-100 -mx-4 px-4 py-2 rounded">
              <span className="text-amber-800 font-semibold">Token Advance Required</span>
              <span className="text-xl font-bold text-amber-700">
                Rs.{advanceAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Remaining (pay to driver)</span>
              <span>Rs.{remainingAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Section */}
      <div className="bg-white border-2 border-amber-200 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
          Pay Token Advance via UPI
        </h3>
        <p className="text-center text-amber-700 font-semibold text-xl mb-4">
          Rs.{advanceAmount.toLocaleString('en-IN')}
        </p>

        <div className="flex flex-col items-center mb-6">
          {/* QR Code */}
          {upiQrCodeUrl ? (
            <img
              src={upiQrCodeUrl}
              alt="UPI QR Code"
              className="w-48 h-48 border border-gray-200 rounded-lg mb-4"
            />
          ) : (
            <div className="w-48 h-48 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center mb-4">
              <span className="text-gray-400 text-sm text-center px-4">
                QR Code will be displayed here
              </span>
            </div>
          )}

          {/* UPI ID */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">UPI ID</p>
            <p className="font-mono font-bold text-lg text-gray-900">{upiId}</p>
            <p className="text-sm text-gray-500">Pay to: {payeeName}</p>
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="bg-amber-50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-amber-800 mb-2">Payment Instructions</h4>
          <ol className="list-decimal list-inside text-sm text-amber-700 space-y-1">
            <li>Open any UPI app (GPay, PhonePe, Paytm, etc.)</li>
            <li>Scan the QR code or enter the UPI ID</li>
            <li>Pay <strong>Rs.{advanceAmount.toLocaleString('en-IN')}</strong> (token advance)</li>
            <li>Take a screenshot of the payment confirmation</li>
            <li>Share the screenshot via WhatsApp using the button below</li>
          </ol>
        </div>

        {/* Remaining Payment Info */}
        <div className="bg-gray-50 rounded-lg p-3 mb-6 text-center">
          <p className="text-sm text-gray-600">
            Remaining <strong>Rs.{remainingAmount.toLocaleString('en-IN')}</strong> can be paid via UPI or cash directly to the driver
          </p>
        </div>

        {/* Share on WhatsApp Button */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Share Payment Screenshot on WhatsApp
        </a>
      </div>
      </div> {/* End of bookingCardRef */}

      {/* What Happens Next */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-blue-800 mb-2">What happens next?</h4>
        <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1">
          <li>We will verify your advance payment (usually within 30 minutes)</li>
          <li>You will receive a booking confirmation on WhatsApp</li>
          <li>Driver details will be shared <strong>3 hours before your pickup time</strong></li>
        </ol>
      </div>

      {/* Contact Support */}
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Need help?</p>
        <div className="flex justify-center gap-4">
          <a
            href={`tel:${helpPhone}`}
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call {helpPhone}
          </a>
          <a
            href={`https://wa.me/${helpWhatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-green-600 hover:text-green-700"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>

      {/* Track Booking Link */}
      <div className="mt-8 text-center">
        <a
          href={`/book/${state.bookingId}`}
          target={isModal ? '_blank' : undefined}
          rel={isModal ? 'noopener noreferrer' : undefined}
          className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          View Booking Details
        </a>
      </div>

      {/* Save & Share Options for Modal */}
      {isModal && onClose && (
        <div className="mt-6 pt-4 border-t border-gray-200 space-y-4">
          {/* Save Options Toggle */}
          {!showSaveOptions ? (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowSaveOptions(true)}
                className="py-3 px-4 bg-amber-100 text-amber-700 font-medium rounded-lg hover:bg-amber-200 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Save Booking
              </button>
              <button
                onClick={onClose}
                className="py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 text-center font-medium">Save your booking confirmation</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {/* Save as Image */}
                <button
                  onClick={handleSaveAsImage}
                  disabled={isSaving}
                  className="py-3 px-4 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSaving ? (
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                  Save Image
                </button>

                {/* Share */}
                <button
                  onClick={handleShare}
                  className="py-3 px-4 bg-green-100 text-green-700 font-medium rounded-lg hover:bg-green-200 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>

                {/* Copy Text */}
                <button
                  onClick={async () => {
                    await navigator.clipboard.writeText(generateBookingText());
                    alert('Booking details copied!');
                  }}
                  className="py-3 px-4 bg-purple-100 text-purple-700 font-medium rounded-lg hover:bg-purple-200 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Text
                </button>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
