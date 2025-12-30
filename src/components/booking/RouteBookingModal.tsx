import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { BookingProvider } from '../../context/BookingContext';
import QuickBookingForm from './QuickBookingForm';
import CustomerDetailsModal from './CustomerDetailsModal';
import PaymentStep from './PaymentStep';
import { useBooking } from '../../context/BookingContext';

export interface CarTypeOption {
  name: string;
  model: string;
  capacity: string;
  seasonPrice: string;
  offSeasonPrice: string;
  image?: string;
  features?: string[];
}

export interface PreSelectedCar {
  name: string;
  model: string;
  capacity: string;
  seasonPrice: string;
  offSeasonPrice: string;
  image?: string;
}

export interface RouteBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  routeData: {
    from: string;
    to: string;
    slug: string;
    _id: string;
    carTypes: CarTypeOption[];
  };
  bookingSettings?: {
    upiQrCodeUrl?: string;
    upiId?: string;
    payeeName?: string;
    bookingTerms?: string;
    cancellationPolicy?: string;
    helpPhone?: string;
    helpWhatsapp?: string;
  };
  preSelectedCar?: PreSelectedCar | null;
}

function ModalContent({
  onClose,
  routeData,
  bookingSettings
}: Omit<RouteBookingModalProps, 'isOpen'>) {
  const { state, reset } = useBooking();

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-amber-500 to-yellow-500">
          <h2 id="booking-modal-title" className="text-xl font-bold text-black">
            Book: {routeData.from} → {routeData.to}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-black/10 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {state.modalStep === 1 && (
            <QuickBookingForm
              routeData={routeData}
              helpWhatsapp={bookingSettings?.helpWhatsapp}
            />
          )}
          {state.modalStep === 2 && (
            <CustomerDetailsModal
              routeData={routeData}
              bookingTerms={bookingSettings?.bookingTerms}
              cancellationPolicy={bookingSettings?.cancellationPolicy}
            />
          )}
          {state.modalStep === 3 && (
            <PaymentStep
              upiQrCodeUrl={bookingSettings?.upiQrCodeUrl}
              upiId={bookingSettings?.upiId}
              payeeName={bookingSettings?.payeeName}
              helpPhone={bookingSettings?.helpPhone}
              helpWhatsapp={bookingSettings?.helpWhatsapp}
              onClose={handleClose}
              isModal={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Helper function to extract numeric price from price string like "₹1,800" or "1800"
function extractPrice(priceStr: string): number {
  const cleaned = priceStr.replace(/[₹,\s]/g, '');
  return parseInt(cleaned, 10) || 0;
}


// Helper function to determine current season
function getCurrentPriceType(): 'season' | 'offSeason' {
  const month = new Date().getMonth() + 1; // 1-12
  // Season months: Apr-Jul (4-7), Sept-Oct (9-10), Dec-Jan (12, 1)
  const seasonMonths = [4, 5, 6, 7, 9, 10, 12, 1];
  return seasonMonths.includes(month) ? 'season' : 'offSeason';
}

export default function RouteBookingModal({
  isOpen,
  onClose,
  routeData,
  bookingSettings,
  preSelectedCar
}: RouteBookingModalProps) {
  if (!isOpen) return null;

  // Determine price type based on current season
  const priceType = getCurrentPriceType();

  // Initial data for the booking context
  const initialData: Record<string, any> = {
    pickupLocation: routeData.from,
    dropLocation: routeData.to,
    sourceType: 'route' as const,
    sourceSlug: routeData.slug,
    sourceId: routeData._id,
    modalStep: 1 as const
  };

  // If a car is pre-selected, add it to initial data
  if (preSelectedCar) {
    const price = priceType === 'season'
      ? extractPrice(preSelectedCar.seasonPrice)
      : extractPrice(preSelectedCar.offSeasonPrice);

    initialData.carType = preSelectedCar.name;
    initialData.carModel = preSelectedCar.model;
    initialData.priceType = priceType;
    initialData.unitPrice = price;
    initialData.totalAmount = price;
  }

  // Use portal to render at document body
  return createPortal(
    <BookingProvider initialData={initialData}>
      <ModalContent
        onClose={onClose}
        routeData={routeData}
        bookingSettings={bookingSettings}
      />
    </BookingProvider>,
    document.body
  );
}
