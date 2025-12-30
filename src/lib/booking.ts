import type { CarTypeValue, Vehicle, VehicleAvailability } from '../types/vehicle';
import type { Booking, BookingSettings, PriceType, AvailabilityCheckResponse, SeasonDateRange, BlockedDateRange } from '../types/booking';
import { getAllVehicles, getVehiclesByType, getBookingsForDate, getBookingSettings } from './sanity';

// Generate a unique booking ID
export function generateBookingId(): string {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `KT-${dateStr}-${randomPart}`;
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

// Format price for display
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

// Calculate token advance amount (25% of total, minimum ₹500)
export function calculateAdvanceAmount(totalAmount: number): number {
  const percentage = totalAmount * 0.25;
  const minAdvance = 500;
  return Math.max(Math.round(percentage), minAdvance);
}

// Parse price string (e.g., "Rs.1,300" or "1300") to number
export function parsePrice(priceString: string): number {
  if (!priceString) return 0;
  // Remove currency symbols, commas, and spaces
  const cleanedPrice = priceString.replace(/[^0-9.-]/g, '');
  return parseInt(cleanedPrice, 10) || 0;
}

// Check if a date is within the minimum lead time (24 hours)
export function isWithinLeadTime(travelDate: string, pickupTime: string, minAdvanceHours: number = 24): boolean {
  const now = new Date();

  // Parse travel date and time
  const [year, month, day] = travelDate.split('-').map(Number);

  // Parse pickup time (e.g., "10:00 AM", "2:30 PM")
  let hours = 0;
  let minutes = 0;

  const timeMatch = pickupTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (timeMatch) {
    hours = parseInt(timeMatch[1], 10);
    minutes = parseInt(timeMatch[2], 10);
    const period = timeMatch[3]?.toUpperCase();

    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
  }

  const travelDateTime = new Date(year, month - 1, day, hours, minutes);
  const minDateTime = new Date(now.getTime() + minAdvanceHours * 60 * 60 * 1000);

  return travelDateTime >= minDateTime;
}

// Check if a date is within the advance booking window
export function isWithinBookingWindow(travelDate: string, maxAdvanceDays: number = 30): boolean {
  const now = new Date();
  const travel = new Date(travelDate);
  const maxDate = new Date(now.getTime() + maxAdvanceDays * 24 * 60 * 60 * 1000);

  return travel <= maxDate;
}

// Check if a date falls within a date range
export function isDateInRange(checkDate: string, startDate: string, endDate: string): boolean {
  const check = new Date(checkDate);
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Set all dates to start of day for accurate comparison
  check.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  return check >= start && check <= end;
}

// Get price type based on date ranges
export function getPriceType(date: string, settings?: BookingSettings | null): PriceType {
  // If no settings or no date ranges defined, use default
  if (!settings?.seasonDateRanges || settings.seasonDateRanges.length === 0) {
    return settings?.defaultSeason || 'offSeason';
  }

  // Check each season date range
  for (const range of settings.seasonDateRanges) {
    if (isDateInRange(date, range.startDate, range.endDate)) {
      return range.seasonType;
    }
  }

  // No matching range found, use default season
  return settings.defaultSeason || 'offSeason';
}

// Check if a date is blocked for online booking
export interface BlockedDateInfo {
  blocked: boolean;
  reason?: string;
  message?: string;
  allowPhoneBooking?: boolean;
}

export function isDateBlocked(date: string, settings?: BookingSettings | null): BlockedDateInfo {
  if (!settings?.blockedDateRanges || settings.blockedDateRanges.length === 0) {
    return { blocked: false };
  }

  for (const range of settings.blockedDateRanges) {
    if (isDateInRange(date, range.startDate, range.endDate)) {
      return {
        blocked: true,
        reason: range.name,
        message: range.message || 'Online booking is not available for this period. Please contact us directly.',
        allowPhoneBooking: range.allowPhoneBooking ?? true
      };
    }
  }

  return { blocked: false };
}

// Get all blocked date ranges that overlap with the booking window
export function getBlockedDatesInWindow(
  startDate: string,
  endDate: string,
  settings?: BookingSettings | null
): BlockedDateRange[] {
  if (!settings?.blockedDateRanges || settings.blockedDateRanges.length === 0) {
    return [];
  }

  const windowStart = new Date(startDate);
  const windowEnd = new Date(endDate);

  return settings.blockedDateRanges.filter(range => {
    const rangeStart = new Date(range.startDate);
    const rangeEnd = new Date(range.endDate);

    // Check if ranges overlap
    return rangeStart <= windowEnd && rangeEnd >= windowStart;
  });
}

// Check if a vehicle is available on a specific date
export function isVehicleAvailable(vehicle: Vehicle, date: string): boolean {
  if (!vehicle.isActive || vehicle.maintenanceMode) {
    return false;
  }

  if (!vehicle.blockedDates || vehicle.blockedDates.length === 0) {
    return true;
  }

  const checkDate = new Date(date);

  for (const blocked of vehicle.blockedDates) {
    const startDate = new Date(blocked.startDate);
    const endDate = new Date(blocked.endDate);

    if (checkDate >= startDate && checkDate <= endDate) {
      return false;
    }
  }

  return true;
}

// Check availability for a specific date and car type
export async function checkAvailability(
  date: string,
  carType?: CarTypeValue
): Promise<AvailabilityCheckResponse> {
  // Get all vehicles (or by type if specified)
  const vehicles = carType
    ? await getVehiclesByType(carType)
    : await getAllVehicles();

  // If no vehicles are registered in the system, assume unlimited availability
  // This allows bookings to work before vehicles are configured in Sanity
  if (vehicles.length === 0) {
    return {
      available: true,
      availableCount: -1, // -1 indicates unlimited/unconfigured
      totalCount: 0,
      carTypes: []
    };
  }

  // Get bookings for the date
  const bookings = await getBookingsForDate(date, carType);

  // Group vehicles by car type
  const vehiclesByType = new Map<CarTypeValue, Vehicle[]>();
  for (const vehicle of vehicles) {
    if (!vehiclesByType.has(vehicle.carType)) {
      vehiclesByType.set(vehicle.carType, []);
    }
    vehiclesByType.get(vehicle.carType)!.push(vehicle);
  }

  // Calculate availability per car type
  const carTypes: { carType: CarTypeValue; available: number; total: number }[] = [];
  let totalAvailable = 0;
  let totalCount = 0;

  for (const [type, typeVehicles] of vehiclesByType) {
    // Count available vehicles (not blocked, not booked)
    const bookedVehicleIds = new Set(
      bookings
        .filter(b => b.carType === type && b.assignedVehicle)
        .map(b => (b.assignedVehicle as any)?._id || (b.assignedVehicle as any)?.vehicleId)
    );

    let availableCount = 0;
    for (const vehicle of typeVehicles) {
      if (isVehicleAvailable(vehicle, date) && !bookedVehicleIds.has(vehicle._id)) {
        availableCount++;
      }
    }

    carTypes.push({
      carType: type,
      available: availableCount,
      total: typeVehicles.length
    });

    totalAvailable += availableCount;
    totalCount += typeVehicles.length;
  }

  return {
    available: totalAvailable > 0,
    availableCount: totalAvailable,
    totalCount,
    carTypes
  };
}

// Get available dates for the next N days
export async function getAvailableDates(
  days: number = 30,
  carType?: CarTypeValue
): Promise<{ date: string; available: boolean; availableCount: number }[]> {
  const dates: { date: string; available: boolean; availableCount: number }[] = [];
  const now = new Date();

  for (let i = 1; i <= days; i++) {
    const date = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
    const dateStr = date.toISOString().slice(0, 10);

    const availability = await checkAvailability(dateStr, carType);
    dates.push({
      date: dateStr,
      available: availability.available,
      availableCount: availability.availableCount
    });
  }

  return dates;
}

// Generate WhatsApp booking message
export function generateWhatsAppMessage(booking: Booking): string {
  const message = `Hi, I want to confirm my booking:

Booking ID: ${booking.bookingId}
Name: ${booking.customerName}
Phone: ${booking.customerPhone}
Route: ${booking.pickupLocation} to ${booking.dropLocation}
Date: ${formatDate(booking.travelDate)}
Time: ${booking.pickupTime}
Vehicle: ${booking.carType} (${booking.carModel || ''})
Amount: ${formatPrice(booking.totalAmount)}

Payment screenshot attached.`;

  return encodeURIComponent(message);
}

// Generate WhatsApp confirmation message (for admin)
export function generateConfirmationWhatsApp(booking: Booking, template?: string): string {
  let message = template || `Booking Confirmed

Booking ID: {{bookingId}}
Name: {{customerName}}
Route: {{pickup}} to {{drop}}
Date: {{date}}
Time: {{time}}
Vehicle: {{carType}}
Amount: Rs.{{amount}}

Driver details will be shared before pickup.
Contact: 7351721351`;

  message = message
    .replace(/{{bookingId}}/g, booking.bookingId)
    .replace(/{{customerName}}/g, booking.customerName)
    .replace(/{{pickup}}/g, booking.pickupLocation)
    .replace(/{{drop}}/g, booking.dropLocation)
    .replace(/{{date}}/g, formatDate(booking.travelDate))
    .replace(/{{time}}/g, booking.pickupTime)
    .replace(/{{carType}}/g, `${booking.carType}${booking.carModel ? ` (${booking.carModel})` : ''}`)
    .replace(/{{amount}}/g, booking.totalAmount.toString());

  return encodeURIComponent(message);
}

// Validate phone number (Indian format)
export function validatePhone(phone: string): boolean {
  // Remove spaces and dashes
  const cleaned = phone.replace(/[\s-]/g, '');
  // Check for valid Indian phone number (10 digits, optionally with +91 or 91 prefix)
  return /^(\+91|91)?[6-9]\d{9}$/.test(cleaned);
}

// Normalize phone number to 10-digit format
export function normalizePhone(phone: string): string {
  const cleaned = phone.replace(/[\s-]/g, '');
  // Remove +91 or 91 prefix if present
  if (cleaned.startsWith('+91')) {
    return cleaned.slice(3);
  }
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    return cleaned.slice(2);
  }
  return cleaned;
}

// Validate email
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Get car model options for a car type
export function getCarModels(carType: CarTypeValue): string[] {
  const models: Record<CarTypeValue, string[]> = {
    'Hatchback': ['Alto', 'WagonR', 'Swift'],
    'Sedan': ['Dzire', 'Etios', 'Amaze'],
    'SUV Standard': ['Ertiga', 'Triber', 'Tavera'],
    'SUV Deluxe': ['Innova', 'XL6'],
    'SUV Luxury': ['Innova Crysta', 'Fortuner']
  };

  return models[carType] || [];
}

// Get default passenger capacity for a car type
export function getCarCapacity(carType: CarTypeValue): number {
  const capacities: Record<CarTypeValue, number> = {
    'Hatchback': 4,
    'Sedan': 4,
    'SUV Standard': 6,
    'SUV Deluxe': 7,
    'SUV Luxury': 7
  };

  return capacities[carType] || 4;
}

// Generate time slots for pickup
export function generateTimeSlots(startHour: number = 5, endHour: number = 22): string[] {
  const slots: string[] = [];

  for (let hour = startHour; hour <= endHour; hour++) {
    for (const minute of [0, 30]) {
      const h = hour % 12 || 12;
      const m = minute.toString().padStart(2, '0');
      const period = hour < 12 ? 'AM' : 'PM';
      slots.push(`${h}:${m} ${period}`);
    }
  }

  return slots;
}
