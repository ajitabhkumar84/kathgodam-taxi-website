import React, { useState, useEffect, useMemo } from 'react';
import { useBooking } from '../../context/BookingContext';
import type { CarTypeOption } from './RouteBookingModal';
import type { PriceType } from '../../types/booking';
import TermsModal from './TermsModal';

interface QuickBookingFormProps {
  routeData: {
    from: string;
    to: string;
    slug: string;
    _id: string;
    carTypes: CarTypeOption[];
  };
  helpWhatsapp?: string;
}

// Generate time slots from 5 AM to 3 PM only
function generateRestrictedTimeSlots(): string[] {
  const slots: string[] = [];
  for (let hour = 5; hour <= 15; hour++) {
    for (const minute of [0, 30]) {
      if (hour === 15 && minute === 30) continue; // Stop at 3:00 PM
      const h = hour % 12 || 12;
      const m = minute.toString().padStart(2, '0');
      const period = hour < 12 ? 'AM' : 'PM';
      slots.push(`${h}:${m} ${period}`);
    }
  }
  return slots;
}

// Parse price string to number (e.g., "Rs 1,100" -> 1100)
function parsePrice(priceStr: string): number {
  if (!priceStr) return 0;
  const cleaned = priceStr.replace(/[^\d]/g, '');
  return parseInt(cleaned, 10) || 0;
}

// Format number to INR string
function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

// Get minimum date (tomorrow)
function getMinDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

// Get maximum date (30 days from now)
function getMaxDate(): string {
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  return maxDate.toISOString().split('T')[0];
}

export default function QuickBookingForm({ routeData, helpWhatsapp }: QuickBookingFormProps) {
  const { state, updateField, updateFields, calculateTotal, nextModalStep } = useBooking();
  const [priceType, setPriceType] = useState<PriceType>('offSeason');
  const [isLoadingSeasons, setIsLoadingSeasons] = useState(true);
  const [seasonRanges, setSeasonRanges] = useState<any[]>([]);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const timeSlots = useMemo(() => generateRestrictedTimeSlots(), []);
  const whatsappNumber = helpWhatsapp || '917351721351';

  // Fetch season settings on mount
  useEffect(() => {
    async function fetchSeasonSettings() {
      try {
        const res = await fetch('/api/settings/seasons');
        if (res.ok) {
          const data = await res.json();
          setSeasonRanges(data.seasonDateRanges || []);
        }
      } catch (error) {
        console.error('Failed to fetch season settings:', error);
      } finally {
        setIsLoadingSeasons(false);
      }
    }
    fetchSeasonSettings();
  }, []);

  // Determine price type based on selected date
  useEffect(() => {
    if (!state.travelDate || seasonRanges.length === 0) {
      setPriceType('offSeason');
      updateField('priceType', 'offSeason');
      return;
    }

    const selectedDate = new Date(state.travelDate);
    let matchedType: PriceType = 'offSeason';

    for (const range of seasonRanges) {
      const start = new Date(range.startDate);
      const end = new Date(range.endDate);
      if (selectedDate >= start && selectedDate <= end) {
        matchedType = range.seasonType;
        break;
      }
    }

    setPriceType(matchedType);
    updateField('priceType', matchedType);
  }, [state.travelDate, seasonRanges]);

  // Update total when car type or price type changes
  useEffect(() => {
    if (state.carType && state.unitPrice > 0) {
      calculateTotal();
    }
  }, [state.unitPrice, state.carType]);

  // Handle car selection
  const handleCarSelect = (car: CarTypeOption) => {
    const price = priceType === 'season'
      ? parsePrice(car.seasonPrice)
      : parsePrice(car.offSeasonPrice);

    updateFields({
      carType: car.name as any,
      carModel: car.model,
      unitPrice: price,
      totalAmount: price
    });
  };

  // Validate form
  const isFormValid = () => {
    return (
      state.travelDate &&
      state.pickupTime &&
      state.carType
    );
  };

  const handleContinue = () => {
    if (isFormValid()) {
      calculateTotal();
      nextModalStep();
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Trip Details Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Trip Details</h3>

        {/* Pickup Location (Read-only) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pickup Location
          </label>
          <div className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
              {routeData.from}
            </div>
          </div>
        </div>

        {/* Drop Location (Read-only) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Drop Location
          </label>
          <div className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
              {routeData.to}
            </div>
          </div>
        </div>

        {/* Hotel/Specific Location (Free text) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hotel / Specific Location <span className="text-gray-500 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={state.hotelLocationDetail}
            onChange={(e) => updateField('hotelLocationDetail', e.target.value)}
            placeholder="e.g., Hotel Manu Maharani, Mall Road"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Travel Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={state.travelDate}
              onChange={(e) => updateField('travelDate', e.target.value)}
              min={getMinDate()}
              max={getMaxDate()}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pickup Time <span className="text-red-500">*</span>
            </label>
            <select
              value={state.pickupTime}
              onChange={(e) => updateField('pickupTime', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
              required
            >
              <option value="">Select time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>

        {/* WhatsApp Note for Other Times */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-sm text-amber-800">
            <strong>Note:</strong> Online booking is available for 5 AM to 3 PM pickup only.
            For other times, please{' '}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi, I'd like to book a taxi from ${routeData.from} to ${routeData.to} with pickup after 3 PM.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 font-semibold hover:underline"
            >
              contact us on WhatsApp
            </a>.
          </p>
        </div>
      </div>

      {/* Vehicle Selection Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="text-lg font-semibold text-gray-900">Select Vehicle</h3>
          {state.travelDate && !isLoadingSeasons && (
            <span className={`text-sm px-2 py-1 rounded ${priceType === 'season' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
              {priceType === 'season' ? 'Peak Season Pricing' : 'Off-Season Pricing'}
            </span>
          )}
        </div>

        {/* Show message if date not selected */}
        {!state.travelDate && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
            <svg className="w-8 h-8 text-amber-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-amber-800 font-medium">Please select a travel date first</p>
            <p className="text-amber-600 text-sm mt-1">Vehicle prices vary based on season</p>
          </div>
        )}

        {/* Show vehicles only after date is selected */}
        {state.travelDate && (
          <div className="grid gap-3">
            {routeData.carTypes.map((car) => {
              const price = priceType === 'season'
                ? parsePrice(car.seasonPrice)
                : parsePrice(car.offSeasonPrice);
              const isSelected = state.carType === car.name;

              return (
                <button
                  key={car.name}
                  type="button"
                  onClick={() => handleCarSelect(car)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-200'
                      : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {car.image ? (
                        <img
                          src={car.image}
                          alt={car.name}
                          className="w-16 h-12 object-contain rounded"
                        />
                      ) : (
                        <div className="w-16 h-12 bg-gray-100 rounded flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-900">{car.name}</p>
                        <p className="text-sm text-gray-600">{car.model} • {car.capacity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-amber-600">{formatPrice(price)}</p>
                      {isSelected && (
                        <span className="text-xs text-green-600 font-medium flex items-center justify-end">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                          </svg>
                          Selected
                        </span>
                      )}
                    </div>
                  </div>
                  {car.features && car.features.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {car.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Total and Continue */}
      {state.carType && (
        <div className="bg-gray-50 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium">Total Amount</span>
            <span className="text-2xl font-bold text-gray-900">{formatPrice(state.totalAmount || state.unitPrice)}</span>
          </div>
          <button
            onClick={handleContinue}
            disabled={!isFormValid()}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold rounded-xl hover:from-amber-600 hover:to-yellow-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            Continue to Customer Details →
          </button>
        </div>
      )}

      {/* Tour Link */}
      <div className="border-t pt-4 space-y-3">
        <a
          href="/taxi-for-complete-tour"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center text-amber-600 hover:text-amber-700 font-medium transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          Need a full tour? Check Taxi for Complete Tour
        </a>

        <p className="text-center text-xs text-gray-500">
          By continuing, you agree to our{' '}
          <button
            type="button"
            onClick={() => setShowTermsModal(true)}
            className="text-amber-600 hover:underline"
          >
            Terms & Cancellation Policy
          </button>
        </p>
      </div>

      {/* Terms Modal */}
      <TermsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        activeTab="terms"
      />
    </div>
  );
}
