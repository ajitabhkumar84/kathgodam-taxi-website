import React from 'react';
import { BookingProvider, useBooking } from '../../context/BookingContext';
import TripDetailsStep from './TripDetailsStep';
import VehicleSelectionStep from './VehicleSelectionStep';
import CustomerInfoStep from './CustomerInfoStep';
import PaymentStep from './PaymentStep';
import type { CarTypeValue } from '../../types/vehicle';

interface CarTypeOption {
  name: CarTypeValue;
  model: string;
  capacity: string;
  seasonPrice: string;
  offSeasonPrice: string;
  features: string[];
}

interface BookingWizardProps {
  // Pre-filled data from route/package page
  pickupLocation?: string;
  dropLocation?: string;
  sourceType?: 'route' | 'package' | 'custom';
  sourceSlug?: string;
  sourceId?: string;
  carTypes?: CarTypeOption[];
  // UPI settings
  upiQrCodeUrl?: string;
  upiId?: string;
  payeeName?: string;
  bookingTerms?: string;
  helpPhone?: string;
  helpWhatsapp?: string;
}

function BookingWizardContent({
  carTypes,
  upiQrCodeUrl,
  upiId,
  payeeName,
  bookingTerms,
  helpPhone,
  helpWhatsapp
}: BookingWizardProps) {
  const { state } = useBooking();

  const steps = [
    { number: 1, title: 'Trip Details' },
    { number: 2, title: 'Vehicle' },
    { number: 3, title: 'Your Info' },
    { number: 4, title: 'Payment' }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors
                    ${state.step >= step.number
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                    }
                    ${state.step === step.number ? 'ring-4 ring-amber-200' : ''}
                  `}
                >
                  {state.step > step.number ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                <span className={`mt-2 text-xs font-medium hidden sm:block
                  ${state.step >= step.number ? 'text-amber-600' : 'text-gray-400'}
                `}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 rounded transition-colors
                  ${state.step > step.number ? 'bg-amber-500' : 'bg-gray-200'}
                `} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        {state.step === 1 && <TripDetailsStep />}
        {state.step === 2 && <VehicleSelectionStep carTypes={carTypes || []} />}
        {state.step === 3 && <CustomerInfoStep />}
        {state.step === 4 && (
          <PaymentStep
            upiQrCodeUrl={upiQrCodeUrl}
            upiId={upiId}
            payeeName={payeeName}
            bookingTerms={bookingTerms}
            helpPhone={helpPhone}
            helpWhatsapp={helpWhatsapp}
          />
        )}
      </div>

      {/* Error Message */}
      {state.error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {state.error}
        </div>
      )}
    </div>
  );
}

export default function BookingWizard(props: BookingWizardProps) {
  const initialData = {
    pickupLocation: props.pickupLocation || '',
    dropLocation: props.dropLocation || '',
    sourceType: props.sourceType || 'custom',
    sourceSlug: props.sourceSlug || '',
    sourceId: props.sourceId || ''
  };

  return (
    <BookingProvider initialData={initialData}>
      <BookingWizardContent {...props} />
    </BookingProvider>
  );
}
