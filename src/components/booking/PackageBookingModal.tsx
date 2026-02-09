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

export interface PackageBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageData: {
    name: string;
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
  packageData,
  bookingSettings
}: Omit<PackageBookingModalProps, 'isOpen'>) {
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

  // Transform package data to route-like format for compatibility with existing forms
  const routeData = {
    from: 'Kathgodam',
    to: packageData.name,
    slug: packageData.slug,
    _id: packageData._id,
    carTypes: packageData.carTypes,
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
            Book: {packageData.name}
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

// Determine season based on current date
function getCurrentSeason(): 'season' | 'offSeason' {
  const now = new Date();
  const month = now.getMonth() + 1; // 1-12

  // Peak Season: March-June (3-6), September-November (9-11)
  // Off Season: December-February (12, 1-2), July-August (7-8)
  if ((month >= 3 && month <= 6) || (month >= 9 && month <= 11)) {
    return 'season';
  }
  return 'offSeason';
}

export default function PackageBookingModal({
  isOpen,
  onClose,
  packageData,
  bookingSettings,
  preSelectedCar
}: PackageBookingModalProps) {
  if (!isOpen) return null;

  // Determine current season
  const currentSeason = getCurrentSeason();

  // If a car is pre-selected, calculate which is the better price
  const initialCarType = preSelectedCar ? (() => {
    const seasonPrice = extractPrice(preSelectedCar.seasonPrice);
    const offSeasonPrice = extractPrice(preSelectedCar.offSeasonPrice);

    return {
      ...preSelectedCar,
      price: currentSeason === 'season' ? preSelectedCar.seasonPrice : preSelectedCar.offSeasonPrice,
      currentPrice: currentSeason === 'season' ? seasonPrice : offSeasonPrice
    };
  })() : undefined;

  return createPortal(
    <BookingProvider initialCarType={initialCarType}>
      <ModalContent
        onClose={onClose}
        packageData={packageData}
        bookingSettings={bookingSettings}
      />
    </BookingProvider>,
    document.body
  );
}
