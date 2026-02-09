import React, { useState, useEffect } from 'react';
import PackageBookingModal from './PackageBookingModal';
import type { CarTypeOption } from './RouteBookingModal';

interface PreSelectedCar {
  name: string;
  model: string;
  capacity: string;
  seasonPrice: string;
  offSeasonPrice: string;
  image?: string;
}

interface PackageBookingModalContainerProps {
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
}

export default function PackageBookingModalContainer({
  packageData,
  bookingSettings
}: PackageBookingModalContainerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [preSelectedCar, setPreSelectedCar] = useState<PreSelectedCar | null>(null);

  useEffect(() => {
    // Listen for the open-package-booking-modal custom event (no car pre-selected)
    const handleOpenModal = () => {
      setPreSelectedCar(null);
      setIsOpen(true);
    };

    // Listen for the open-package-booking-modal-with-car event (car pre-selected)
    const handleOpenModalWithCar = (e: CustomEvent<{ carType: PreSelectedCar; package: any }>) => {
      const { carType } = e.detail;
      setPreSelectedCar(carType);
      setIsOpen(true);
    };

    // Listen for custom events
    window.addEventListener('open-package-booking-modal', handleOpenModal);
    window.addEventListener('open-package-booking-modal-with-car', handleOpenModalWithCar as EventListener);

    // Also handle direct button click if the event listener wasn't set up in time
    const openButton = document.getElementById('open-package-booking-modal-btn');
    if (openButton) {
      openButton.addEventListener('click', handleOpenModal);
    }

    return () => {
      window.removeEventListener('open-package-booking-modal', handleOpenModal);
      window.removeEventListener('open-package-booking-modal-with-car', handleOpenModalWithCar as EventListener);
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
    <PackageBookingModal
      isOpen={isOpen}
      onClose={handleClose}
      packageData={packageData}
      bookingSettings={bookingSettings}
      preSelectedCar={preSelectedCar}
    />
  );
}
