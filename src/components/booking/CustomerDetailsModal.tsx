import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import TermsModal from './TermsModal';

interface CustomerDetailsModalProps {
  routeData: {
    from: string;
    to: string;
    slug: string;
    _id: string;
  };
  bookingTerms?: string;
  cancellationPolicy?: string;
}

// Format number to INR string
function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

// Format date for display
function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

// Validate Indian phone number
function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return /^[6-9]\d{9}$/.test(cleaned);
}

// Validate email
function isValidEmail(email: string): boolean {
  if (!email) return true; // Email is optional
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function CustomerDetailsModal({
  routeData,
  bookingTerms,
  cancellationPolicy
}: CustomerDetailsModalProps) {
  const { state, updateField, prevModalStep, submitBooking, goToModalStep } = useBooking();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsModalTab, setTermsModalTab] = useState<'terms' | 'cancellation'>('terms');

  // Handle phone input - strip non-digits and validate
  const handlePhoneChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 10);
    updateField('customerPhone', cleaned);

    if (cleaned.length === 10 && !isValidPhone(cleaned)) {
      setPhoneError('Please enter a valid Indian mobile number');
    } else {
      setPhoneError('');
    }
  };

  // Handle email input
  const handleEmailChange = (value: string) => {
    updateField('customerEmail', value);

    if (value && !isValidEmail(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  // Validate form
  const isFormValid = () => {
    return (
      state.customerName.trim().length >= 2 &&
      state.customerPhone.length === 10 &&
      isValidPhone(state.customerPhone) &&
      (!state.customerEmail || isValidEmail(state.customerEmail)) &&
      agreedToTerms
    );
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!isFormValid()) return;

    const success = await submitBooking();
    if (success) {
      goToModalStep(3);
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Back Button */}
      <button
        onClick={prevModalStep}
        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Vehicle Selection
      </button>

      {/* Booking Summary */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 border border-amber-200">
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Booking Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Route</span>
            <span className="font-medium text-gray-900">
              {routeData.from} → {routeData.to}
              {state.hotelLocationDetail && (
                <span className="text-gray-600"> ({state.hotelLocationDetail})</span>
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date & Time</span>
            <span className="font-medium text-gray-900">
              {formatDate(state.travelDate)}, {state.pickupTime}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Vehicle</span>
            <span className="font-medium text-gray-900">
              {state.carType} ({state.carModel})
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t border-amber-200">
            <span className="font-semibold text-gray-900">Total Amount</span>
            <span className="font-bold text-xl text-amber-600">{formatPrice(state.totalAmount)}</span>
          </div>
        </div>
      </div>

      {/* Customer Information Form */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Your Information</h3>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={state.customerName}
            onChange={(e) => updateField('customerName', e.target.value)}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 text-gray-600 text-sm">
              +91
            </span>
            <input
              type="tel"
              value={state.customerPhone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="9876543210"
              maxLength={10}
              className={`flex-1 px-4 py-3 border rounded-r-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                phoneError ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
          </div>
          {phoneError && (
            <p className="mt-1 text-sm text-red-600">{phoneError}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Booking confirmation will be sent via WhatsApp
          </p>
        </div>

        {/* Email (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-gray-500 font-normal">(optional)</span>
          </label>
          <input
            type="email"
            value={state.customerEmail}
            onChange={(e) => handleEmailChange(e.target.value)}
            placeholder="your@email.com"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
              emailError ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {emailError && (
            <p className="mt-1 text-sm text-red-600">{emailError}</p>
          )}
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Special Requests <span className="text-gray-500 font-normal">(optional)</span>
          </label>
          <textarea
            value={state.customerNotes}
            onChange={(e) => updateField('customerNotes', e.target.value)}
            placeholder="Any special requirements, luggage details, etc."
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors resize-none"
          />
        </div>
      </div>

      {/* Terms Agreement */}
      <div className="space-y-3">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-1 w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
          />
          <span className="text-sm text-gray-700">
            I agree to the{' '}
            <button
              type="button"
              className="text-amber-600 hover:underline font-medium"
              onClick={() => {
                setTermsModalTab('terms');
                setShowTermsModal(true);
              }}
            >
              Terms & Conditions
            </button>
            {' '}and{' '}
            <button
              type="button"
              className="text-amber-600 hover:underline font-medium"
              onClick={() => {
                setTermsModalTab('cancellation');
                setShowTermsModal(true);
              }}
            >
              Cancellation Policy
            </button>
          </span>
        </label>
      </div>

      {/* Error Display */}
      {state.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">{state.error}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!isFormValid() || state.isSubmitting}
        className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold rounded-xl hover:from-amber-600 hover:to-yellow-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center"
      >
        {state.isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          'Confirm & Proceed to Payment →'
        )}
      </button>

      {/* Terms Modal */}
      <TermsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        activeTab={termsModalTab}
        bookingTerms={bookingTerms}
        cancellationPolicy={cancellationPolicy}
      />
    </div>
  );
}
