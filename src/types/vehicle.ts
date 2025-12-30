export type CarTypeValue = 'Hatchback' | 'Sedan' | 'SUV Standard' | 'SUV Deluxe' | 'SUV Luxury';

export interface BlockedDate {
  startDate: string;
  endDate: string;
  reason?: string;
}

export interface Vehicle {
  _id: string;
  vehicleId: string;
  registrationNumber: string;
  carType: CarTypeValue;
  model: string;
  capacity: number;
  image?: any; // Sanity image object
  isActive: boolean;
  maintenanceMode: boolean;
  driverName?: string;
  driverPhone?: string;
  blockedDates?: BlockedDate[];
  notes?: string;
}

export interface VehicleAvailability {
  carType: CarTypeValue;
  model: string;
  available: number;
  total: number;
  vehicles: Vehicle[];
}
