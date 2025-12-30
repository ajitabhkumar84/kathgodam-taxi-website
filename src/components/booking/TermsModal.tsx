import React, { useEffect } from 'react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab?: 'terms' | 'cancellation';
  bookingTerms?: string;
  cancellationPolicy?: string;
}

export default function TermsModal({
  isOpen,
  onClose,
  activeTab = 'terms',
  bookingTerms,
  cancellationPolicy
}: TermsModalProps) {
  const [currentTab, setCurrentTab] = React.useState<'terms' | 'cancellation'>(activeTab);

  // Update tab when activeTab prop changes
  useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Default terms content
  const defaultTerms = `
    <h3 class="font-semibold text-lg mb-3">Booking Terms & Conditions</h3>
    <ul class="space-y-2 text-gray-700">
      <li><strong>1. Booking Confirmation:</strong> Your booking is confirmed only after successful payment verification of the token advance amount.</li>
      <li><strong>2. Payment:</strong> A minimum 25% token advance (minimum Rs.500) is required to confirm your booking. The remaining amount can be paid via UPI or cash to the driver.</li>
      <li><strong>3. Pickup Time:</strong> Please be ready at the pickup location at least 10 minutes before the scheduled time. Our driver will contact you before arrival.</li>
      <li><strong>4. Route Changes:</strong> Any changes to the route or additional stops may incur extra charges based on distance.</li>
      <li><strong>5. Luggage:</strong> Standard luggage is included. Excess luggage may require a larger vehicle at additional cost.</li>
      <li><strong>6. Driver Contact:</strong> Driver details will be shared via WhatsApp 3 hours before pickup time.</li>
      <li><strong>7. Delays:</strong> In case of train/flight delays, please inform us immediately. We track train timings for railway station pickups.</li>
      <li><strong>8. Vehicle:</strong> We reserve the right to provide a similar or upgraded vehicle if the booked vehicle is unavailable.</li>
    </ul>
  `;

  const defaultCancellation = `
    <h3 class="font-semibold text-lg mb-3">Cancellation & Refund Policy</h3>
    <ul class="space-y-2 text-gray-700">
      <li><strong>1. Free Cancellation:</strong> Cancel up to 24 hours before pickup time for a full refund of your advance payment.</li>
      <li><strong>2. Late Cancellation (12-24 hours):</strong> 50% of the advance amount will be refunded.</li>
      <li><strong>3. Last Minute Cancellation (Less than 12 hours):</strong> No refund will be provided for cancellations made less than 12 hours before pickup.</li>
      <li><strong>4. No Show:</strong> If you fail to show up at the pickup location without prior cancellation, no refund will be provided.</li>
      <li><strong>5. Refund Processing:</strong> Refunds will be processed within 5-7 business days to the original payment method.</li>
      <li><strong>6. Cancellation by Us:</strong> In the rare event that we need to cancel your booking, you will receive a full refund.</li>
      <li><strong>7. Weather/Road Conditions:</strong> If travel is not possible due to extreme weather or road closures, we will offer rescheduling or full refund.</li>
      <li><strong>8. Contact for Cancellation:</strong> To cancel, please call us at 7351721351 or message on WhatsApp.</li>
    </ul>
  `;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-lg max-h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <h2 className="text-lg font-bold text-gray-900">Policies</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setCurrentTab('terms')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              currentTab === 'terms'
                ? 'text-amber-600 border-b-2 border-amber-500 bg-amber-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Terms & Conditions
          </button>
          <button
            onClick={() => setCurrentTab('cancellation')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              currentTab === 'cancellation'
                ? 'text-amber-600 border-b-2 border-amber-500 bg-amber-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Cancellation Policy
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {currentTab === 'terms' && (
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: bookingTerms || defaultTerms }}
            />
          )}
          {currentTab === 'cancellation' && (
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: cancellationPolicy || defaultCancellation }}
            />
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="w-full py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
