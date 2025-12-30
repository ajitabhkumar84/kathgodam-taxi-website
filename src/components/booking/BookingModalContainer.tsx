import React, { useState, useEffect } from 'react';
import RouteBookingModal from './RouteBookingModal';
import type { CarTypeOption } from './RouteBookingModal';

interface PreSelectedCar {
  name: string;
  model: string;
  capacity: string;
  seasonPrice: string;
  offSeasonPrice: string;
  image?: string;
}

interface BookingModalContainerProps {
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
}

export default function BookingModalContainer({
  routeData,
  bookingSettings
}: BookingModalContainerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [preSelectedCar, setPreSelectedCar] = useState<PreSelectedCar | null>(null);

  useEffect(() => {
    // Listen for the open-booking-modal custom event (no car pre-selected)
    const handleOpenModal = () => {
      setPreSelectedCar(null);
      setIsOpen(true);
    };

    // Listen for the open-booking-modal-with-car event (car pre-selected)
    const handleOpenModalWithCar = (e: CustomEvent<{ carType: PreSelectedCar; route: any }>) => {
      const { carType } = e.detail;
      setPreSelectedCar(carType);
      setIsOpen(true);
    };

    // Listen for custom events
    window.addEventListener('open-booking-modal', handleOpenModal);
    window.addEventListener('open-booking-modal-with-car', handleOpenModalWithCar as EventListener);

    // Also handle direct button click if the event listener wasn't set up in time
    const openButton = document.getElementById('open-booking-modal-btn');
    if (openButton) {
      openButton.addEventListener('click', handleOpenModal);
    }

    return () => {
      window.removeEventListener('open-booking-modal', handleOpenModal);
      window.removeEventListener('open-booking-modal-with-car', handleOpenModalWithCar as EventListener);
      if (openButton) {
        openButton.removeEventListener('click', handleOpenModal);
      }
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setPreSelectedCar(null);
  };

  return (
    <RouteBookingModal
      isOpen={isOpen}
      onClose={handleClose}
      routeData={routeData}
      bookingSettings={bookingSettings}
      preSelectedCar={preSelectedCar}
    />
  );
}
