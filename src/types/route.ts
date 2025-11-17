export interface CarType {
  name: string;
  model: string;
  capacity: string;
  seasonPrice: string;
  offSeasonPrice: string;
  image: any; // Sanity image object
  features: string[];
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

export interface StayPackage {
  name: string;
  description: string;
  seasonPrice: string;
  offSeasonPrice: string;
  popular?: boolean;
}

export interface TourPackage {
  name: string;
  subtitle: string;
  features: string[];
  price: string;
  popular?: boolean;
}

export interface Route {
  _id: string;
  from: string;
  to: string;
  slug: string;
  distance: string;
  duration: string;
  startingPrice: string;
  pageTitle: string;
  metaDescription: string;
  keywords?: string;
  introText1: string;
  introText2: string;
  attractionsTitle?: string;
  carTypes: CarType[];
  attractions?: Attraction[];
  faqs?: FAQ[];
  stayPackages?: StayPackage[];
  tourPackages?: TourPackage[];
}
