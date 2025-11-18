export interface SightseeingTour {
  _id: string;
  name: string;
  slug: string;
  tourType: string;
  duration: string;
  distance: string;
  difficulty: string;
  price: string;
  bestTime: string;
  pickupLocation: string;
  dropLocation: string;
  heroSlides?: Array<{
    image: any;
    caption: string;
  }>;
  overviewDescription: string;
  highlights: string[];
  itinerary: Array<{
    time: string;
    title: string;
    description: string;
    duration: string;
    image?: any;
  }>;
  placesIncluded: Array<{
    name: string;
    description: string;
    timeSpent: string;
    image: any;
    highlights?: string[];
  }>;
  pricing: Array<{
    vehicleType: string;
    model: string;
    capacity: string;
    price: string;
    features: string[];
    image: any;
  }>;
  inclusions: string[];
  exclusions: string[];
  thingsToCarry?: string[];
  importantInfo?: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  relatedTours?: Array<{
    name: string;
    slug: string;
    duration: string;
    price: string;
    heroSlides: Array<{
      image: any;
    }>;
  }>;
  mapEmbedUrl?: string;
  weatherLatitude?: number;
  weatherLongitude?: number;
  pageTitle: string;
  metaDescription: string;
  keywords: string;
}
