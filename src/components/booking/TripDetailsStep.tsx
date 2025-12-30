import React, { useState, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';

// Types for settings
interface BlockedDateRange {
  name: string;
  startDate: string;
  endDate: string;
  message?: string;
  allowPhoneBooking?: boolean;
}

interface SeasonSettings {
  defaultSeason: string;
  blockedDateRanges: BlockedDateRange[];
  advanceBookingDays: number;
  minAdvanceHours: number;
}

// Generate time slots
function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let hour = 5; hour <= 22; hour++) {
    for (const minute of [0, 30]) {
      const h = hour % 12 || 12;
      const m = minute.toString().padStart(2, '0');
      const period = hour < 12 ? 'AM' : 'PM';
      slots.push(`${h}:${m} ${period}`);
    }
  }
  return slots;
}

// Check if date is in a blocked range
function isDateBlocked(dateStr: string, blockedRanges: BlockedDateRange[]): BlockedDateRange | null {
  const checkDate = new Date(dateStr);
  checkDate.setHours(0, 0, 0, 0);

  for (const range of blockedRanges) {
    const start = new Date(range.startDate);
    const end = new Date(range.endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    if (checkDate >= start && checkDate <= end) {
      return range;
    }
  }
  return null;
}

const timeSlots = generateTimeSlots();

export default function TripDetailsStep() {
  const { state, updateField, updateFields, nextStep } = useBooking();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [settings, setSettings] = useState<SeasonSettings | null>(null);
  const [blockedWarning, setBlockedWarning] = useState<string | null>(null);

  // Fetch settings on mount
  useEffect(() => {
    fetch('/api/settings/seasons')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSettings(data);
        }
      })
      .catch(err => console.error('Failed to load settings:', err));
  }, []);

  // Check if selected date is blocked
  useEffect(() => {
    if (state.travelDate && settings?.blockedDateRanges) {
      const blocked = isDateBlocked(state.travelDate, settings.blockedDateRanges);
      if (blocked) {
        setBlockedWarning(blocked.message || `Online booking not available: ${blocked.name}`);
      } else {
        setBlockedWarning(null);
      }
    }
  }, [state.travelDate, settings]);

  // Get min date (based on minAdvanceHours)
  const getMinDate = () => {
    const minHours = settings?.minAdvanceHours || 24;
    const minDate = new Date();
    minDate.setTime(minDate.getTime() + minHours * 60 * 60 * 1000);
    // If min time is past midnight, use next day
    if (minDate.getHours() >= 22) {
      minDate.setDate(minDate.getDate() + 1);
    }
    return minDate.toISOString().split('T')[0];
  };

  // Get max date
  const getMaxDate = () => {
    const maxDays = settings?.advanceBookingDays || 30;
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + maxDays);
    return maxDate.toISOString().split('T')[0];
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!state.pickupLocation.trim()) {
      newErrors.pickupLocation = 'Pickup location is required';
    }
    if (!state.dropLocation.trim()) {
      newErrors.dropLocation = 'Drop location is required';
    }
    if (!state.travelDate) {
      newErrors.travelDate = 'Travel date is required';
    } else if (settings?.blockedDateRanges) {
      const blocked = isDateBlocked(state.travelDate, settings.blockedDateRanges);
      if (blocked) {
        newErrors.travelDate = blocked.message || 'This date is not available for online booking';
      }
    }
    if (!state.pickupTime) {
      newErrors.pickupTime = 'Pickup time is required';
    }
    if (state.isRoundTrip && !state.returnDate) {
      newErrors.returnDate = 'Return date is required for round trip';
    }
    if (state.isRoundTrip && state.returnDate && state.returnDate < state.travelDate) {
      newErrors.returnDate = 'Return date must be after travel date';
    }
    if (state.isRoundTrip && state.returnDate && settings?.blockedDateRanges) {
      const blocked = isDateBlocked(state.returnDate, settings.blockedDateRanges);
      if (blocked) {
        newErrors.returnDate = blocked.message || 'Return date is not available for online booking';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      nextStep();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Trip Details</h2>

      <div className="space-y-6">
        {/* Pickup Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pickup Location *
          </label>
          <input
            type="text"
            value={state.pickupLocation}
            onChange={(e) => updateField('pickupLocation', e.target.value)}
            placeholder="e.g., Kathgodam Railway Station"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors
              ${errors.pickupLocation ? 'border-red-500' : 'border-gray-300'}
            `}
          />
          {errors.pickupLocation && (
            <p className="mt-1 text-sm text-red-500">{errors.pickupLocation}</p>
          )}
        </div>

        {/* Drop Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Drop Location *
          </label>
          <input
            type="text"
            value={state.dropLocation}
            onChange={(e) => updateField('dropLocation', e.target.value)}
            placeholder="e.g., Nainital Mall Road"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors
              ${errors.dropLocation ? 'border-red-500' : 'border-gray-300'}
            `}
          />
          {errors.dropLocation && (
            <p className="mt-1 text-sm text-red-500">{errors.dropLocation}</p>
          )}
        </div>

        {/* Travel Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Travel Date *
            </label>
            <input
              type="date"
              value={state.travelDate}
              onChange={(e) => updateField('travelDate', e.target.value)}
              min={getMinDate()}
              max={getMaxDate()}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors
                ${errors.travelDate ? 'border-red-500' : 'border-gray-300'}
              `}
            />
            {errors.travelDate && (
              <p className="mt-1 text-sm text-red-500">{errors.travelDate}</p>
            )}
            {blockedWarning && !errors.travelDate && (
              <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700 font-medium">{blockedWarning}</p>
                <p className="text-xs text-red-600 mt-1">
                  Please call <a href="tel:+917351721351" className="underline font-medium">7351721351</a> or{' '}
                  <a href="https://wa.me/917351721351" target="_blank" rel="noopener" className="underline font-medium">WhatsApp</a> for bookings during this period.
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pickup Time *
            </label>
            <select
              value={state.pickupTime}
              onChange={(e) => updateField('pickupTime', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors
                ${errors.pickupTime ? 'border-red-500' : 'border-gray-300'}
              `}
            >
              <option value="">Select time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
            {errors.pickupTime && (
              <p className="mt-1 text-sm text-red-500">{errors.pickupTime}</p>
            )}
          </div>
        </div>

        {/* Round Trip Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => updateField('isRoundTrip', !state.isRoundTrip)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
              ${state.isRoundTrip ? 'bg-amber-500' : 'bg-gray-300'}
            `}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                ${state.isRoundTrip ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </button>
          <span className="text-gray-700 font-medium">Round Trip</span>
        </div>

        {/* Return Date (if round trip) */}
        {state.isRoundTrip && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Return Date *
            </label>
            <input
              type="date"
              value={state.returnDate}
              onChange={(e) => updateField('returnDate', e.target.value)}
              min={state.travelDate || getMinDate()}
              max={getMaxDate()}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors
                ${errors.returnDate ? 'border-red-500' : 'border-gray-300'}
              `}
            />
            {errors.returnDate && (
              <p className="mt-1 text-sm text-red-500">{errors.returnDate}</p>
            )}
          </div>
        )}

        {/* Info Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Booking Information</p>
              <ul className="list-disc list-inside space-y-1 text-amber-700">
                <li>Bookings must be made at least 24 hours in advance</li>
                <li>You can book up to 30 days in advance</li>
                <li>For train pickups, we track train timings</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={handleNext}
          className="px-8 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2"
        >
          Continue
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
