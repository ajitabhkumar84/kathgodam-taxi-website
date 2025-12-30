import React, { useState, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';
import type { CarTypeValue } from '../../types/vehicle';
import type { PriceType } from '../../types/booking';

interface CarTypeOption {
  name: CarTypeValue;
  model: string;
  capacity: string;
  seasonPrice: string;
  offSeasonPrice: string;
  features: string[];
}

interface VehicleSelectionStepProps {
  carTypes: CarTypeOption[];
}

interface SeasonDateRange {
  name: string;
  seasonType: PriceType;
  startDate: string;
  endDate: string;
}

interface SeasonSettings {
  defaultSeason: PriceType;
  seasonDateRanges: SeasonDateRange[];
}

// Parse price string to number
function parsePrice(priceString: string): number {
  if (!priceString) return 0;
  const cleaned = priceString.replace(/[^0-9.-]/g, '');
  return parseInt(cleaned, 10) || 0;
}

// Check if date is in a range
function isDateInRange(checkDate: string, startDate: string, endDate: string): boolean {
  const check = new Date(checkDate);
  const start = new Date(startDate);
  const end = new Date(endDate);
  check.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  return check >= start && check <= end;
}

// Get price type based on date and settings
function getPriceTypeForDate(date: string, settings: SeasonSettings | null): PriceType {
  if (!settings?.seasonDateRanges || settings.seasonDateRanges.length === 0) {
    return settings?.defaultSeason || 'offSeason';
  }

  for (const range of settings.seasonDateRanges) {
    if (isDateInRange(date, range.startDate, range.endDate)) {
      return range.seasonType;
    }
  }

  return settings.defaultSeason || 'offSeason';
}

export default function VehicleSelectionStep({ carTypes }: VehicleSelectionStepProps) {
  const { state, updateFields, prevStep, nextStep } = useBooking();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [availability, setAvailability] = useState<Record<string, { available: boolean; count: number }>>({});
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [seasonSettings, setSeasonSettings] = useState<SeasonSettings | null>(null);
  const [priceType, setPriceType] = useState<PriceType>('offSeason');

  // Fetch season settings
  useEffect(() => {
    fetch('/api/settings/seasons')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSeasonSettings({
            defaultSeason: data.defaultSeason || 'offSeason',
            seasonDateRanges: data.seasonDateRanges || []
          });
        }
      })
      .catch(err => console.error('Failed to load season settings:', err));
  }, []);

  // Update price type when travel date or settings change
  useEffect(() => {
    if (state.travelDate) {
      const newPriceType = getPriceTypeForDate(state.travelDate, seasonSettings);
      setPriceType(newPriceType);
    }
  }, [state.travelDate, seasonSettings]);

  // Check availability when date changes
  useEffect(() => {
    if (state.travelDate) {
      checkAvailability();
    }
  }, [state.travelDate]);

  const checkAvailability = async () => {
    if (!state.travelDate) return;

    setLoadingAvailability(true);
    try {
      const response = await fetch(`/api/availability/check?date=${state.travelDate}`);
      const data = await response.json();

      if (data.success) {
        const availMap: Record<string, { available: boolean; count: number }> = {};
        data.carTypes.forEach((ct: { carType: string; available: number }) => {
          availMap[ct.carType] = {
            available: ct.available > 0,
            count: ct.available
          };
        });
        setAvailability(availMap);
      }
    } catch (error) {
      console.error('Error checking availability:', error);
    } finally {
      setLoadingAvailability(false);
    }
  };

  const selectVehicle = (carType: CarTypeOption) => {
    const price = priceType === 'season'
      ? parsePrice(carType.seasonPrice)
      : parsePrice(carType.offSeasonPrice);

    let total = price;
    if (state.isRoundTrip) {
      total *= 2;
    }

    updateFields({
      carType: carType.name,
      carModel: carType.model,
      priceType: priceType as 'season' | 'offSeason',
      unitPrice: price,
      totalAmount: total
    });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!state.carType) {
      newErrors.carType = 'Please select a vehicle type';
    }
    if (state.passengerCount < 1) {
      newErrors.passengerCount = 'At least 1 passenger required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      nextStep();
    }
  };

  // Default car types if none provided
  const defaultCarTypes: CarTypeOption[] = [
    { name: 'Hatchback', model: 'Alto', capacity: 'Up to 4 passengers', seasonPrice: '1100', offSeasonPrice: '1000', features: ['Compact car', 'Fuel efficient', 'Non-AC'] },
    { name: 'Sedan', model: 'Dzire', capacity: 'Up to 4 passengers', seasonPrice: '1300', offSeasonPrice: '1200', features: ['Comfortable', 'Extra luggage space', 'AC available'] },
    { name: 'SUV Standard', model: 'Ertiga', capacity: 'Up to 6 passengers', seasonPrice: '1800', offSeasonPrice: '1600', features: ['Spacious', 'Family friendly', 'AC available'] },
    { name: 'SUV Deluxe', model: 'Innova', capacity: 'Up to 7 passengers', seasonPrice: '2200', offSeasonPrice: '2000', features: ['Very comfortable', 'Roof carrier', 'AC available'] },
    { name: 'SUV Luxury', model: 'Innova Crysta', capacity: 'Up to 7 passengers', seasonPrice: '2800', offSeasonPrice: '2500', features: ['Premium luxury', 'Most comfortable', 'AC available'] }
  ];

  const displayCarTypes = carTypes.length > 0 ? carTypes : defaultCarTypes;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your Vehicle</h2>
      <p className="text-gray-600 mb-6">
        Showing {priceType === 'season' ? 'peak season' : 'off-season'} prices for {state.travelDate}
      </p>

      {/* Vehicle Cards */}
      <div className="space-y-4 mb-6">
        {displayCarTypes.map((carType) => {
          const isSelected = state.carType === carType.name;
          const price = priceType === 'season'
            ? parsePrice(carType.seasonPrice)
            : parsePrice(carType.offSeasonPrice);
          const isAvailable = !availability[carType.name] || availability[carType.name]?.available;

          return (
            <button
              key={carType.name}
              type="button"
              onClick={() => isAvailable && selectVehicle(carType)}
              disabled={!isAvailable}
              className={`w-full p-4 border-2 rounded-xl text-left transition-all
                ${isSelected
                  ? 'border-amber-500 bg-amber-50 shadow-md'
                  : isAvailable
                    ? 'border-gray-200 hover:border-amber-300 hover:bg-gray-50'
                    : 'border-gray-200 bg-gray-100 opacity-60 cursor-not-allowed'
                }
              `}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">{carType.name}</h3>
                    {isSelected && (
                      <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-medium rounded-full">
                        Selected
                      </span>
                    )}
                    {!isAvailable && (
                      <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-medium rounded-full">
                        Unavailable
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {carType.model} - {carType.capacity}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {carType.features?.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-amber-600">
                    Rs.{price.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-gray-500">
                    {priceType === 'season' ? 'Season price' : 'Off-season price'}
                  </p>
                  {state.isRoundTrip && (
                    <p className="text-sm text-amber-700 font-medium mt-1">
                      Round trip: Rs.{(price * 2).toLocaleString('en-IN')}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {errors.carType && (
        <p className="text-sm text-red-500 mb-4">{errors.carType}</p>
      )}

      {/* Passenger Count */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Passengers
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => state.passengerCount > 1 && updateFields({ passengerCount: state.passengerCount - 1 })}
            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="w-12 text-center text-xl font-semibold">{state.passengerCount}</span>
          <button
            type="button"
            onClick={() => state.passengerCount < 10 && updateFields({ passengerCount: state.passengerCount + 1 })}
            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        {errors.passengerCount && (
          <p className="mt-1 text-sm text-red-500">{errors.passengerCount}</p>
        )}
      </div>

      {/* Summary */}
      {state.carType && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-gray-900 mb-2">Booking Summary</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>{state.pickupLocation} → {state.dropLocation}</p>
            <p>{state.travelDate} at {state.pickupTime}</p>
            <p>{state.carType} ({state.carModel})</p>
            <p>{state.passengerCount} passenger{state.passengerCount > 1 ? 's' : ''}</p>
            {state.isRoundTrip && <p className="text-amber-600">Round Trip</p>}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-lg font-bold text-gray-900">
              Total: Rs.{state.totalAmount.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-4">
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
          onClick={handleNext}
          disabled={!state.carType}
          className="px-8 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
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
