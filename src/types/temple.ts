import type { HeroSlide, FAQ, Attraction, CarType } from './route';
import type { Package, RelatedRoute } from './package';

export interface TempleTimings {
  openTime?: string;
  closeTime?: string;
  poojaTimings?: string;
  closedDays?: string;
  specialNote?: string;
}

export interface TempleLocation {
  address?: string;
  nearestCity?: string;
  altitude?: string;
  latitude?: number;
  longitude?: number;
  googleMapsEmbedUrl?: string;
}

export interface HowToReach {
  fromKathgodam?: string;
  fromPantnagar?: string;
  fromDelhi?: string;
  nearestRailway?: string;
  nearestAirport?: string;
  distanceFromKathgodam?: string;
}

export interface SeasonalEvent {
  eventName: string;
  timing?: string;
  description?: string;
}

export interface CustomSection {
  sectionTitle: string;
  sectionContent: string;
  sectionImage?: any; // Sanity image object
}

export interface TaxiCta {
  heading?: string;
  subheading?: string;
  primaryRoute?: RelatedRoute;
}

export interface RelatedTemple {
  _id: string;
  name: string;
  slug: string;
  subtitle?: string;
  district: string;
  templeType?: string;
  featuredImage?: any; // Sanity image object
}

export interface Temple {
  _id: string;
  name: string;
  slug: string;
  subtitle?: string;
  district: string;
  templeType?: string;
  pageTitle: string;
  metaDescription: string;
  keywords?: string;
  heroSlides?: HeroSlide[];
  featuredImage?: any; // Sanity image object
  videoEmbed?: string;
  introText: string;
  history?: string;
  highlights?: string[];
  customSections?: CustomSection[];
  timings?: TempleTimings;
  location?: TempleLocation;
  howToReach?: HowToReach;
  bestTimeToVisit?: string;
  seasonalEvents?: SeasonalEvent[];
  pilgrimageTips?: string[];
  accommodationInfo?: string;
  carTypes?: CarType[];
  exclusions?: string[];
  relatedRoutes?: RelatedRoute[];
  relatedPackages?: Package[];
  nearbyTemples?: RelatedTemple[];
  nearbyAttractions?: Attraction[];
  taxiCta?: TaxiCta;
  faqs?: FAQ[];
  published: boolean;
  showOnHomepage?: boolean;
  popularity?: number;
}

export interface TempleCategory {
  categoryName: string;
  categorySlug: string;
  categoryDescription?: string;
  icon?: string;
  temples: Temple[];
  displayOrder: number;
}

export interface TemplesPage {
  pageTitle: string;
  metaDescription: string;
  keywords?: string;
  heroTitle: string;
  heroSubtitle?: string;
  heroBadge?: string;
  heroImage?: any; // Sanity image object
  introText?: string;
  showFilters?: boolean;
  filterByDistrictEnabled?: boolean;
  filterByTypeEnabled?: boolean;
  showCategoryNav?: boolean;
  categoryNavTitle?: string;
  templeCategories: TempleCategory[];
  bottomCtaHeading?: string;
  bottomCtaText?: string;
  showAdditionalInfo?: boolean;
  additionalInfoTitle?: string;
  additionalInfoPoints?: string[];
  faqs?: FAQ[];
}

// For listing cards - simplified temple data
export interface TempleListItem {
  _id: string;
  name: string;
  slug: string;
  subtitle?: string;
  district: string;
  templeType?: string;
  introText: string;
  highlights?: string[];
  featuredImage?: any;
  heroSlides?: HeroSlide[];
  popularity?: number;
}
