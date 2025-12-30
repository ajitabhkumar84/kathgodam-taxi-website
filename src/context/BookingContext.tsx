import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { CarTypeValue } from '../types/vehicle';
import type { PriceType } from '../types/booking';

// Booking form state
export interface BookingState {
  step: number;
  modalStep: 1 | 2 | 3; // For modal flow: 1=trip+vehicle, 2=customer, 3=payment

  // Step 1: Trip Details
  pickupLocation: string;
  dropLocation: string;
  hotelLocationDetail: string; // Hotel/specific location name within drop location
  travelDate: string;
  pickupTime: string;

  // Step 2: Vehicle Selection
  carType: CarTypeValue | '';
  carModel: string;
  passengerCount: number;
  priceType: PriceType;
  unitPrice: number;

  // Step 3: Customer Info
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerNotes: string;

  // Calculated
  totalAmount: number;

  // Source
  sourceType: 'route' | 'package' | 'custom';
  sourceSlug: string;
  sourceId: string;

  // Result
  bookingId: string;
  isSubmitting: boolean;
  error: string;
}

type BookingAction =
  | { type: 'SET_STEP'; step: number }
  | { type: 'SET_MODAL_STEP'; modalStep: 1 | 2 | 3 }
  | { type: 'UPDATE_FIELD'; field: keyof BookingState; value: any }
  | { type: 'UPDATE_FIELDS'; fields: Partial<BookingState> }
  | { type: 'CALCULATE_TOTAL' }
  | { type: 'SET_SUBMITTING'; isSubmitting: boolean }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'SET_BOOKING_ID'; bookingId: string }
  | { type: 'RESET' };

const initialState: BookingState = {
  step: 1,
  modalStep: 1,
  pickupLocation: '',
  dropLocation: '',
  hotelLocationDetail: '',
  travelDate: '',
  pickupTime: '',
  carType: '',
  carModel: '',
  passengerCount: 1,
  priceType: 'season',
  unitPrice: 0,
  customerName: '',
  customerPhone: '',
  customerEmail: '',
  customerNotes: '',
  totalAmount: 0,
  sourceType: 'custom',
  sourceSlug: '',
  sourceId: '',
  bookingId: '',
  isSubmitting: false,
  error: ''
};

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.step };

    case 'SET_MODAL_STEP':
      return { ...state, modalStep: action.modalStep };

    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };

    case 'UPDATE_FIELDS':
      return { ...state, ...action.fields };

    case 'CALCULATE_TOTAL':
      // Direct price calculation (no round trip)
      return { ...state, totalAmount: state.unitPrice };

    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.isSubmitting };

    case 'SET_ERROR':
      return { ...state, error: action.error };

    case 'SET_BOOKING_ID':
      return { ...state, bookingId: action.bookingId };

    case 'RESET':
      return { ...initialState };

    default:
      return state;
  }
}

interface BookingContextType {
  state: BookingState;
  dispatch: React.Dispatch<BookingAction>;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  // Modal step navigation
  nextModalStep: () => void;
  prevModalStep: () => void;
  goToModalStep: (step: 1 | 2 | 3) => void;
  updateField: (field: keyof BookingState, value: any) => void;
  updateFields: (fields: Partial<BookingState>) => void;
  calculateTotal: () => void;
  submitBooking: () => Promise<boolean>;
  reset: () => void;
}

const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({ children, initialData }: { children: ReactNode; initialData?: Partial<BookingState> }) {
  const [state, dispatch] = useReducer(
    bookingReducer,
    initialData ? { ...initialState, ...initialData } : initialState
  );

  const nextStep = () => {
    if (state.step < 4) {
      dispatch({ type: 'SET_STEP', step: state.step + 1 });
    }
  };

  const prevStep = () => {
    if (state.step > 1) {
      dispatch({ type: 'SET_STEP', step: state.step - 1 });
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= 4) {
      dispatch({ type: 'SET_STEP', step });
    }
  };

  // Modal step navigation
  const nextModalStep = () => {
    if (state.modalStep < 3) {
      dispatch({ type: 'SET_MODAL_STEP', modalStep: (state.modalStep + 1) as 1 | 2 | 3 });
    }
  };

  const prevModalStep = () => {
    if (state.modalStep > 1) {
      dispatch({ type: 'SET_MODAL_STEP', modalStep: (state.modalStep - 1) as 1 | 2 | 3 });
    }
  };

  const goToModalStep = (step: 1 | 2 | 3) => {
    dispatch({ type: 'SET_MODAL_STEP', modalStep: step });
  };

  const updateField = (field: keyof BookingState, value: any) => {
    dispatch({ type: 'UPDATE_FIELD', field, value });
  };

  const updateFields = (fields: Partial<BookingState>) => {
    dispatch({ type: 'UPDATE_FIELDS', fields });
  };

  const calculateTotal = () => {
    dispatch({ type: 'CALCULATE_TOTAL' });
  };

  const submitBooking = async (): Promise<boolean> => {
    dispatch({ type: 'SET_SUBMITTING', isSubmitting: true });
    dispatch({ type: 'SET_ERROR', error: '' });

    try {
      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customerName: state.customerName,
          customerPhone: state.customerPhone,
          customerEmail: state.customerEmail || undefined,
          pickupLocation: state.pickupLocation,
          dropLocation: state.dropLocation,
          hotelLocationDetail: state.hotelLocationDetail || undefined,
          travelDate: state.travelDate,
          pickupTime: state.pickupTime,
          carType: state.carType,
          carModel: state.carModel,
          passengerCount: state.passengerCount,
          totalAmount: state.totalAmount,
          sourceType: state.sourceType,
          sourceRouteId: state.sourceType === 'route' ? state.sourceId : undefined,
          sourcePackageId: state.sourceType === 'package' ? state.sourceId : undefined,
          customerNotes: state.customerNotes || undefined
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to create booking');
      }

      dispatch({ type: 'SET_BOOKING_ID', bookingId: data.bookingId });
      dispatch({ type: 'SET_STEP', step: 4 }); // Go to confirmation step
      return true;

    } catch (error) {
      dispatch({ type: 'SET_ERROR', error: error instanceof Error ? error.message : 'Booking failed' });
      return false;
    } finally {
      dispatch({ type: 'SET_SUBMITTING', isSubmitting: false });
    }
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <BookingContext.Provider value={{
      state,
      dispatch,
      nextStep,
      prevStep,
      goToStep,
      nextModalStep,
      prevModalStep,
      goToModalStep,
      updateField,
      updateFields,
      calculateTotal,
      submitBooking,
      reset
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
