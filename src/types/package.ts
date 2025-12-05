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
  day: string;
  title: string;
  activities: string[];
}

export interface PricingOption {
  name: string;
  description: string;
  price: string;
  features: string[];
  popular?: boolean;
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
  itinerary?: ItineraryDay[];
  pricingOptions?: PricingOption[];
  inclusions?: string[];
  exclusions?: string[];
  relatedRoutes?: RelatedRoute[];
  attractions?: Attraction[];
  faqs?: FAQ[];
}
