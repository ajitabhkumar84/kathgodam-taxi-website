import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';

// Validate phone number (Indian format)
function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s-]/g, '');
  return /^(\+91|91)?[6-9]\d{9}$/.test(cleaned);
}

// Validate email
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function CustomerInfoStep() {
  const { state, updateField, prevStep, submitBooking } = useBooking();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreed, setAgreed] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!state.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    } else if (state.customerName.trim().length < 2) {
      newErrors.customerName = 'Please enter your full name';
    }

    if (!state.customerPhone.trim()) {
      newErrors.customerPhone = 'Phone number is required';
    } else if (!validatePhone(state.customerPhone)) {
      newErrors.customerPhone = 'Please enter a valid 10-digit mobile number';
    }

    if (state.customerEmail && !validateEmail(state.customerEmail)) {
      newErrors.customerEmail = 'Please enter a valid email address';
    }

    if (!agreed) {
      newErrors.agreed = 'Please agree to the terms to continue';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      await submitBooking();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Information</h2>

      <div className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            value={state.customerName}
            onChange={(e) => updateField('customerName', e.target.value)}
            placeholder="Enter your full name"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors
              ${errors.customerName ? 'border-red-500' : 'border-gray-300'}
            `}
          />
          {errors.customerName && (
            <p className="mt-1 text-sm text-red-500">{errors.customerName}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 text-gray-500 text-sm">
              +91
            </span>
            <input
              type="tel"
              value={state.customerPhone}
              onChange={(e) => updateField('customerPhone', e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="10-digit mobile number"
              className={`flex-1 px-4 py-3 border rounded-r-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors
                ${errors.customerPhone ? 'border-red-500' : 'border-gray-300'}
              `}
            />
          </div>
          {errors.customerPhone && (
            <p className="mt-1 text-sm text-red-500">{errors.customerPhone}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            We'll send booking updates to this number via WhatsApp
          </p>
        </div>

        {/* Email (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="email"
            value={state.customerEmail}
            onChange={(e) => updateField('customerEmail', e.target.value)}
            placeholder="your.email@example.com"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors
              ${errors.customerEmail ? 'border-red-500' : 'border-gray-300'}
            `}
          />
          {errors.customerEmail && (
            <p className="mt-1 text-sm text-red-500">{errors.customerEmail}</p>
          )}
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Special Requests <span className="text-gray-400">(Optional)</span>
          </label>
          <textarea
            value={state.customerNotes}
            onChange={(e) => updateField('customerNotes', e.target.value)}
            placeholder="Any special requirements? (e.g., child seat, extra luggage, specific pickup point)"
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors resize-none"
          />
        </div>

        {/* Booking Summary */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Booking Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Route</span>
              <span className="font-medium">{state.pickupLocation} → {state.dropLocation}</span>
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
            {state.isRoundTrip && (
              <div className="flex justify-between">
                <span className="text-gray-600">Trip Type</span>
                <span className="font-medium text-amber-600">Round Trip</span>
              </div>
            )}
            <div className="pt-2 mt-2 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-900 font-medium">Total Amount</span>
                <span className="text-xl font-bold text-amber-600">
                  Rs.{state.totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Terms Agreement */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500"
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            I agree to the{' '}
            <a href="#" className="text-amber-600 hover:underline">booking terms</a>
            {' '}and{' '}
            <a href="#" className="text-amber-600 hover:underline">cancellation policy</a>.
            I understand that booking confirmation is subject to payment verification.
          </label>
        </div>
        {errors.agreed && (
          <p className="text-sm text-red-500">{errors.agreed}</p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between gap-4">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={state.isSubmitting}
          className="px-8 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {state.isSubmitting ? (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Creating Booking...
            </>
          ) : (
            <>
              Proceed to Payment
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
