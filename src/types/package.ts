export interface HeroSlide {
  image: any; // Sanity image object
  title: string;
  description: string;
}

export interface Attraction {
  name: string;
  description: string;
  image: any; // Sanity image object
  highlights: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ItineraryDay {
  day: string; // e.g., "Day 1", "Temple 1"
  title: string; // Destination/Temple name
  description: string; // Detailed description
  route?: string; // Route information e.g., "Kathgodam → Bhimtal → Bowali"
  totalTime?: string; // e.g., "1.30 Hour from Kathgodam"
  badge?: string; // Optional badge like "MOST POPULAR"
  image: any; // Sanity image object (required)
  activities?: string[]; // Optional list of activities
}

export interface CarType {
  name: string;
  model: string;
  capacity: string;
  seasonPrice: string;
  offSeasonPrice: string;
  image?: any; // Sanity image object or URL
  features?: string[];
  popular?: boolean;
}

export interface HotelAddon {
  enabled: boolean;
  carTypes?: CarType[];
  hotelDetails?: string;
}

export interface RelatedRoute {
  _id: string;
  from: string;
  to: string;
  slug: string;
  distance: string;
  duration: string;
  startingPrice: string;
}

export interface OnlineBooking {
  enabled: boolean;
  upiQrCodeUrl?: string;
  upiId?: string;
  payeeName?: string;
  bookingTerms?: string;
  cancellationPolicy?: string;
  helpPhone?: string;
  helpWhatsapp?: string;
}

export interface FeatureBoxStat {
  value: string;
  label: string;
}

export interface FeatureBox {
  enabled: boolean;
  title?: string;
  description?: string;
  stats?: FeatureBoxStat[];
}

export interface Package {
  _id: string;
  name: string;
  slug: string;
  subtitle?: string;
  startingPrice: string;
  duration?: string;
  heroSlides?: HeroSlide[];
  pageTitle: string;
  metaDescription: string;
  keywords?: string;
  introText: string;
  highlights?: string[];
  featureBox?: FeatureBox;
  itinerary?: ItineraryDay[];
  carTypes?: CarType[];
  hotelAddon?: HotelAddon;
  inclusions?: string[];
  exclusions?: string[];
  relatedRoutes?: RelatedRoute[];
  attractions?: Attraction[];
  faqs?: FAQ[];
  onlineBooking?: OnlineBooking;
}
