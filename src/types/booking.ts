import type { CarTypeValue, Vehicle } from './vehicle';

export type PaymentStatus = 'pending' | 'screenshot_uploaded' | 'verified' | 'rejected' | 'refunded';
export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
export type SourceType = 'route' | 'package' | 'custom';
export type PriceType = 'season' | 'offSeason';
export type CommunicationType = 'whatsapp' | 'email' | 'phone' | 'system';

export interface Communication {
  timestamp: string;
  type: CommunicationType;
  message: string;
  sentBy?: string;
}

export interface Booking {
  _id: string;
  bookingId: string;
  createdAt: string;

  // Customer info
  customerName: string;
  customerPhone: string;
  customerEmail?: string;

  // Trip details
  pickupLocation: string;
  dropLocation: string;
  hotelLocationDetail?: string; // Hotel/specific location within drop location
  travelDate: string;
  pickupTime: string;

  // Vehicle & pricing
  carType: CarTypeValue;
  carModel?: string;
  passengerCount?: number;
  priceType?: PriceType;
  totalAmount: number;
  advanceAmount: number;
  advanceReceived?: boolean;

  // Source reference
  sourceType?: SourceType;
  sourceRoute?: { _ref: string };
  sourcePackage?: { _ref: string };

  // Assigned vehicle
  assignedVehicle?: Vehicle | { _ref: string };

  // Payment
  paymentStatus: PaymentStatus;
  paymentScreenshot?: any; // Sanity image
  paymentVerifiedAt?: string;
  paymentVerifiedBy?: string;
  transactionId?: string;

  // Status
  status: BookingStatus;

  // Notes
  customerNotes?: string;
  adminNotes?: string;

  // Communications
  communications?: Communication[];
}

// Season date range configuration
export interface SeasonDateRange {
  _key?: string;
  name: string;
  seasonType: PriceType; // 'season' (peak) or 'offSeason'
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
}

// Blocked date range for periods when online booking is not available
export interface BlockedDateRange {
  _key?: string;
  name: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  message?: string;
  allowPhoneBooking?: boolean;
}

export interface BookingSettings {
  _id: string;

  // UPI
  upiId: string;
  upiQrCode: any; // Sanity image
  payeeName: string;
  bankDetails?: string;

  // Configuration
  advanceBookingDays: number;
  minAdvanceHours: number;
  allowSameDayBooking: boolean;

  // Season - Date Range Based
  defaultSeason: PriceType; // 'season' or 'offSeason' - fallback when no range matches
  seasonDateRanges?: SeasonDateRange[];

  // Blocked Date Ranges
  blockedDateRanges?: BlockedDateRange[];

  // Templates
  confirmationEmailSubject: string;
  confirmationEmailTemplate: string;
  confirmationWhatsappTemplate: string;
  paymentReminderTemplate: string;

  // Terms
  bookingTerms: string;
  cancellationPolicy: string;

  // Contact
  bookingHelpPhone: string;
  bookingHelpWhatsapp: string;
}

// Form data types for creating bookings
export interface BookingFormData {
  // Step 1: Trip Details
  pickupLocation: string;
  dropLocation: string;
  hotelLocationDetail?: string; // Hotel/specific location within drop location
  travelDate: string;
  pickupTime: string;

  // Step 2: Vehicle Selection
  carType: CarTypeValue;
  carModel: string;
  passengerCount: number;

  // Step 3: Customer Info
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerNotes?: string;

  // Calculated
  totalAmount: number;
  priceType: PriceType;

  // Source
  sourceType?: SourceType;
  sourceSlug?: string;
}

// API response types
export interface CreateBookingResponse {
  success: boolean;
  booking?: Booking;
  bookingId?: string;
  error?: string;
}

export interface AvailabilityCheckResponse {
  available: boolean;
  availableCount: number;
  totalCount: number;
  carTypes: {
    carType: CarTypeValue;
    available: number;
    total: number;
  }[];
}

export interface BookingLookupResponse {
  success: boolean;
  bookings: Booking[];
  error?: string;
}
