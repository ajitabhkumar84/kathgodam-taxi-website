import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { Booking, BookingSettings, BookingFormData } from '../types/booking';
import type { Vehicle, CarTypeValue } from '../types/vehicle';

// Sanity client configuration
export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || '',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: true,
});

// Preview client configuration (doesn't use CDN to get fresh data)
export const previewClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || '',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
  perspective: 'drafts', // Updated from 'previewDrafts' - includes draft documents
  token: import.meta.env.SANITY_API_TOKEN || '', // Required for preview mode
});

// Write client for creating/updating documents (bookings, etc.)
export const writeClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || '',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
  token: import.meta.env.SANITY_API_TOKEN || '', // Required for write operations
});

// Helper to get the correct client based on preview mode
export function getClient(preview: boolean = false) {
  return preview ? previewClient : client;
}

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Helper function to get all published routes
export async function getAllRoutes() {
  const query = `*[_type == "route" && published == true] | order(from asc) {
    _id,
    from,
    to,
    "slug": slug.current,
    distance,
    duration,
    startingPrice,
    heroSlides[] {
      image,
      title,
      description
    },
    destinationLatitude,
    destinationLongitude,
    googleMapsEmbedUrl,
    pageTitle,
    metaDescription,
    keywords,
    introText1,
    introText2,
    attractionsTitle,
    carTypes[] {
      name,
      model,
      capacity,
      seasonPrice,
      offSeasonPrice,
      image,
      features
    },
    attractions[]-> {
      _id,
      name,
      description,
      image,
      highlights
    },
    exclusions,
    faqs[] {
      question,
      answer
    },
    stayPackages[] {
      name,
      description,
      seasonPrice,
      offSeasonPrice,
      popular
    },
    tourPackages[] {
      name,
      subtitle,
      features,
      price,
      popular,
      image
    }
  }`;

  return await client.fetch(query);
}

// Helper function to get a single route by slug
export async function getRouteBySlug(slug: string) {
  const query = `*[_type == "route" && slug.current == $slug && published == true][0] {
    _id,
    from,
    to,
    "slug": slug.current,
    distance,
    duration,
    startingPrice,
    heroSlides[] {
      image,
      title,
      description
    },
    destinationLatitude,
    destinationLongitude,
    googleMapsEmbedUrl,
    pageTitle,
    metaDescription,
    keywords,
    introText1,
    introText2,
    attractionsTitle,
    carTypes[] {
      name,
      model,
      capacity,
      seasonPrice,
      offSeasonPrice,
      image,
      features
    },
    attractions[]-> {
      _id,
      name,
      description,
      image,
      highlights
    },
    exclusions,
    faqs[] {
      question,
      answer
    },
    stayPackages[] {
      name,
      description,
      seasonPrice,
      offSeasonPrice,
      popular
    },
    tourPackages[] {
      name,
      subtitle,
      features,
      price,
      popular,
      image
    }
  }`;

  return await client.fetch(query, { slug });
}

// Helper function to get all route slugs (for static site generation)
export async function getAllRouteSlugs() {
  const query = `*[_type == "route" && published == true] {
    "slug": slug.current
  }`;

  const routes = await client.fetch(query);
  return routes.map((route: { slug: string }) => route.slug);
}

// Helper function to get all published packages
export async function getAllPackages() {
  const query = `*[_type == "package" && published == true] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    subtitle,
    startingPrice,
    duration,
    heroSlides[] {
      image,
      title,
      description
    },
    pageTitle,
    metaDescription,
    keywords,
    introText,
    highlights,
    itinerary[] {
      day,
      title,
      activities
    },
    pricingOptions[] {
      name,
      description,
      price,
      features,
      popular
    },
    inclusions,
    exclusions,
    relatedRoutes[]-> {
      _id,
      from,
      to,
      "slug": slug.current,
      distance,
      duration,
      startingPrice
    },
    attractions[]-> {
      _id,
      name,
      description,
      image,
      highlights
    },
    faqs[] {
      question,
      answer
    }
  }`;

  return await client.fetch(query);
}

// Helper function to get a single package by slug
export async function getPackageBySlug(slug: string) {
  const query = `*[_type == "package" && slug.current == $slug && published == true][0] {
    _id,
    name,
    "slug": slug.current,
    subtitle,
    startingPrice,
    duration,
    heroSlides[] {
      image,
      title,
      description
    },
    pageTitle,
    metaDescription,
    keywords,
    introText,
    highlights,
    itinerary[] {
      day,
      title,
      activities
    },
    pricingOptions[] {
      name,
      description,
      price,
      features,
      popular
    },
    inclusions,
    exclusions,
    relatedRoutes[]-> {
      _id,
      from,
      to,
      "slug": slug.current,
      distance,
      duration,
      startingPrice
    },
    attractions[]-> {
      _id,
      name,
      description,
      image,
      highlights
    },
    faqs[] {
      question,
      answer
    }
  }`;

  return await client.fetch(query, { slug });
}

// Helper function to get all package slugs (for static site generation)
export async function getAllPackageSlugs() {
  const query = `*[_type == "package" && published == true] {
    "slug": slug.current
  }`;

  const packages = await client.fetch(query);
  return packages.map((pkg: { slug: string }) => pkg.slug);
}

// Helper function to get site settings
export async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0] {
    phone,
    whatsappNumber,
    whatsappMessage,
    email,
    logoText,
    logoHighlight,
    socialLinks
  }`;

  return await client.fetch(query);
}

// Helper function to get homepage data
export async function getHomePage(preview: boolean = false) {
  const activeClient = getClient(preview);
  const query = `*[_type == "homePage"][0] {
    pageTitle,
    metaDescription,
    keywords,
    heroSlides[] {
      title,
      subtitle,
      description,
      image,
      ctaText,
      ctaLink,
      badgeText,
      hasSecondaryCTA,
      secondaryCtaText,
      secondaryCtaLink
    },
    featuredRoutes[]-> {
      _id,
      from,
      to,
      "slug": slug.current,
      distance,
      duration,
      startingPrice,
      introText1,
      featuredHomepageImage,
      heroSlides[0] {
        image
      }
    },
    routesSectionTitle,
    routesSectionDescription,
    routesBottomCTA,
    featuredPackages[]-> {
      _id,
      name,
      "slug": slug.current,
      subtitle,
      startingPrice,
      duration,
      featuredHomepageImage,
      heroSlides[0] {
        image
      }
    },
    packagesSectionTitle,
    packagesSectionDescription,
    testimonials[] {
      name,
      location,
      rating,
      quote
    },
    testimonialsSectionTitle,
    testimonialsSectionDescription,
    testimonialsFooterText,
    finalCtaHeading,
    finalCtaSubheading,
    trustBadges
  }`;

  return await activeClient.fetch(query);
}

// Helper function to get navbar config
export async function getNavbar(preview: boolean = false) {
  const activeClient = getClient(preview);
  const query = `*[_type == "navbar"][0] {
    navigationLinks[] {
      label,
      href
    },
    bookNowLabel,
    bookNowOptions[] {
      label,
      sublabel,
      type,
      href
    },
    mobileMenuLabel,
    showSearch
  }`;

  return await activeClient.fetch(query);
}

// Helper function to get footer config
export async function getFooter(preview: boolean = false) {
  const activeClient = getClient(preview);
  const query = `*[_type == "footer"][0] {
    brandDescription,
    navigationLinks[] {
      label,
      href
    },
    serviceLinks[] {
      label,
      href
    },
    contactSectionTitle,
    submitQueryLabel,
    submitQueryLink,
    copyrightText
  }`;

  return await activeClient.fetch(query);
}

// Helper function to get Why Choose Us section
export async function getWhyChooseUs(preview: boolean = false) {
  const activeClient = getClient(preview);
  const query = `*[_type == "whyChooseUs"][0] {
    sectionTitle,
    sectionDescription,
    image,
    features[] {
      title,
      description,
      icon
    }
  }`;

  return await activeClient.fetch(query);
}

// Helper function to get Corporate Clients section
export async function getCorporateClients(preview: boolean = false) {
  const activeClient = getClient(preview);
  const query = `*[_type == "corporateClient"][0] {
    sectionTitle,
    sectionDescription,
    footerText,
    clients[] {
      name,
      logo,
      order
    } | order(order asc)
  }`;

  return await activeClient.fetch(query);
}

// Helper function to get Safety Section (Homepage)
export async function getSafetySection(preview: boolean = false) {
  const activeClient = getClient(preview);
  const query = `*[_type == "safetySection"][0] {
    sectionTitle,
    emotionalTagline,
    subDescription,
    safetyBadges[] {
      title,
      description,
      icon
    },
    familyImage,
    ctaText,
    ctaLink,
    showOnHomepage
  }`;

  return await activeClient.fetch(query);
}

// Helper function to get Safety Banner (Route/Package Pages)
export async function getSafetyBanner(preview: boolean = false) {
  const activeClient = getClient(preview);
  const query = `*[_type == "safetyBanner"][0] {
    enabled,
    backgroundColor,
    badges[] {
      text,
      icon
    }
  }`;

  return await activeClient.fetch(query);
}

// Helper function to get rates page data
export async function getRatesPage(preview: boolean = false) {
  const activeClient = getClient(preview);
  const query = `*[_type == "ratesPage"][0] {
    pageTitle,
    metaDescription,
    keywords,
    heroTitle,
    heroSubtitle,
    heroBadge,
    heroImage,
    introText,
    showCategoryNav,
    categoryNavTitle,
    routeCategories[] {
      categoryName,
      "categorySlug": categorySlug.current,
      categoryDescription,
      icon,
      displayOrder,
      routes[]-> {
        _id,
        from,
        to,
        "slug": slug.current,
        distance,
        duration,
        startingPrice,
        introText1,
        featuredHomepageImage,
        heroSlides[0] {
          image
        }
      }
    } | order(displayOrder asc),
    bottomCtaHeading,
    bottomCtaText,
    showAdditionalInfo,
    additionalInfoTitle,
    additionalInfoPoints,
    faqs[] {
      question,
      answer
    }
  }`;

  return await activeClient.fetch(query);
}

// Helper function to get packages page data
export async function getPackagesPage(preview: boolean = false) {
  const activeClient = getClient(preview);
  const query = `*[_type == "packagesPage"][0] {
    pageTitle,
    metaDescription,
    keywords,
    heroTitle,
    heroSubtitle,
    heroBadge,
    heroImage,
    introText,
    showFilters,
    filterByDurationEnabled,
    filterByPriceEnabled,
    showCategoryNav,
    categoryNavTitle,
    packageCategories[] {
      categoryName,
      "categorySlug": categorySlug.current,
      categoryDescription,
      icon,
      displayOrder,
      packages[]-> {
        _id,
        name,
        "slug": slug.current,
        subtitle,
        startingPrice,
        duration,
        introText,
        highlights,
        featuredHomepageImage,
        heroSlides[0] {
          image
        }
      }
    } | order(displayOrder asc),
    bottomCtaHeading,
    bottomCtaText,
    showAdditionalInfo,
    additionalInfoTitle,
    additionalInfoPoints,
    faqs[] {
      question,
      answer
    }
  }`;

  return await activeClient.fetch(query);
}

// ============================================
// BOOKING SYSTEM FUNCTIONS
// ============================================

// Helper function to get booking settings
export async function getBookingSettings(): Promise<BookingSettings | null> {
  const query = `*[_type == "bookingSettings"][0] {
    _id,
    upiId,
    upiQrCode,
    payeeName,
    bankDetails,
    advanceBookingDays,
    minAdvanceHours,
    allowSameDayBooking,
    defaultSeason,
    seasonDateRanges[] {
      _key,
      name,
      seasonType,
      startDate,
      endDate
    },
    blockedDateRanges[] {
      _key,
      name,
      startDate,
      endDate,
      message,
      allowPhoneBooking
    },
    confirmationEmailSubject,
    confirmationEmailTemplate,
    confirmationWhatsappTemplate,
    paymentReminderTemplate,
    bookingTerms,
    cancellationPolicy,
    bookingHelpPhone,
    bookingHelpWhatsapp
  }`;

  return await client.fetch(query);
}

// Helper function to get all active vehicles
export async function getAllVehicles(): Promise<Vehicle[]> {
  const query = `*[_type == "vehicle" && isActive == true] | order(carType asc, vehicleId asc) {
    _id,
    vehicleId,
    registrationNumber,
    carType,
    model,
    capacity,
    image,
    isActive,
    maintenanceMode,
    driverName,
    driverPhone,
    blockedDates[] {
      startDate,
      endDate,
      reason
    },
    notes
  }`;

  return await client.fetch(query);
}

// Helper function to get vehicles by car type
export async function getVehiclesByType(carType: CarTypeValue): Promise<Vehicle[]> {
  const query = `*[_type == "vehicle" && isActive == true && carType == $carType] | order(vehicleId asc) {
    _id,
    vehicleId,
    registrationNumber,
    carType,
    model,
    capacity,
    image,
    isActive,
    maintenanceMode,
    driverName,
    driverPhone,
    blockedDates[] {
      startDate,
      endDate,
      reason
    }
  }`;

  return await client.fetch(query, { carType });
}

// Helper function to get a booking by ID
export async function getBookingById(bookingId: string): Promise<Booking | null> {
  const query = `*[_type == "booking" && bookingId == $bookingId][0] {
    _id,
    bookingId,
    createdAt,
    customerName,
    customerPhone,
    customerEmail,
    pickupLocation,
    dropLocation,
    travelDate,
    pickupTime,
    isRoundTrip,
    returnDate,
    carType,
    carModel,
    passengerCount,
    priceType,
    totalAmount,
    sourceType,
    sourceRoute->{_id, from, to, "slug": slug.current},
    sourcePackage->{_id, name, "slug": slug.current},
    assignedVehicle->{_id, vehicleId, model, driverName, driverPhone},
    paymentStatus,
    paymentScreenshot,
    paymentVerifiedAt,
    paymentVerifiedBy,
    transactionId,
    status,
    customerNotes,
    adminNotes,
    communications
  }`;

  return await client.fetch(query, { bookingId });
}

// Helper function to get bookings by phone number
export async function getBookingsByPhone(phone: string): Promise<Booking[]> {
  const query = `*[_type == "booking" && customerPhone == $phone] | order(createdAt desc) {
    _id,
    bookingId,
    createdAt,
    customerName,
    customerPhone,
    pickupLocation,
    dropLocation,
    travelDate,
    pickupTime,
    carType,
    totalAmount,
    paymentStatus,
    status
  }`;

  return await client.fetch(query, { phone });
}

// Helper function to get all bookings (for admin)
export async function getAllBookings(filters?: {
  status?: string;
  paymentStatus?: string;
  fromDate?: string;
  toDate?: string;
}): Promise<Booking[]> {
  let conditions = ['_type == "booking"'];

  if (filters?.status) {
    conditions.push(`status == "${filters.status}"`);
  }
  if (filters?.paymentStatus) {
    conditions.push(`paymentStatus == "${filters.paymentStatus}"`);
  }
  if (filters?.fromDate) {
    conditions.push(`travelDate >= "${filters.fromDate}"`);
  }
  if (filters?.toDate) {
    conditions.push(`travelDate <= "${filters.toDate}"`);
  }

  const query = `*[${conditions.join(' && ')}] | order(createdAt desc) {
    _id,
    bookingId,
    createdAt,
    customerName,
    customerPhone,
    customerEmail,
    pickupLocation,
    dropLocation,
    travelDate,
    pickupTime,
    carType,
    totalAmount,
    paymentStatus,
    paymentScreenshot,
    status,
    assignedVehicle->{_id, vehicleId, model}
  }`;

  return await client.fetch(query);
}

// Helper function to get bookings for a specific date (for availability check)
export async function getBookingsForDate(date: string, carType?: CarTypeValue): Promise<Booking[]> {
  let query = `*[_type == "booking" && travelDate == $date && status != "cancelled"`;

  if (carType) {
    query += ` && carType == $carType`;
  }

  query += `] {
    _id,
    bookingId,
    carType,
    assignedVehicle->{_id, vehicleId}
  }`;

  return await client.fetch(query, { date, carType });
}

// Helper function to create a new booking
export async function createBooking(bookingData: {
  bookingId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  pickupLocation: string;
  dropLocation: string;
  hotelLocationDetail?: string;
  travelDate: string;
  pickupTime: string;
  carType: CarTypeValue;
  carModel: string;
  passengerCount: number;
  priceType: 'season' | 'offSeason';
  totalAmount: number;
  advanceAmount: number;
  sourceType?: 'route' | 'package' | 'custom';
  sourceRouteId?: string;
  sourcePackageId?: string;
  customerNotes?: string;
}): Promise<Booking> {
  const doc = {
    _type: 'booking',
    bookingId: bookingData.bookingId,
    createdAt: new Date().toISOString(),
    customerName: bookingData.customerName,
    customerPhone: bookingData.customerPhone,
    customerEmail: bookingData.customerEmail,
    pickupLocation: bookingData.pickupLocation,
    dropLocation: bookingData.dropLocation,
    hotelLocationDetail: bookingData.hotelLocationDetail,
    travelDate: bookingData.travelDate,
    pickupTime: bookingData.pickupTime,
    carType: bookingData.carType,
    carModel: bookingData.carModel,
    passengerCount: bookingData.passengerCount,
    priceType: bookingData.priceType,
    totalAmount: bookingData.totalAmount,
    advanceAmount: bookingData.advanceAmount,
    advanceReceived: false,
    sourceType: bookingData.sourceType,
    sourceRoute: bookingData.sourceRouteId ? { _type: 'reference', _ref: bookingData.sourceRouteId } : undefined,
    sourcePackage: bookingData.sourcePackageId ? { _type: 'reference', _ref: bookingData.sourcePackageId } : undefined,
    customerNotes: bookingData.customerNotes,
    paymentStatus: 'pending',
    status: 'pending',
    communications: [{
      timestamp: new Date().toISOString(),
      type: 'system',
      message: 'Booking created',
      sentBy: 'System'
    }]
  };

  return await writeClient.create(doc);
}

// Helper function to update booking status
export async function updateBookingStatus(
  bookingId: string,
  updates: {
    status?: string;
    paymentStatus?: string;
    paymentVerifiedAt?: string;
    paymentVerifiedBy?: string;
    transactionId?: string;
    assignedVehicleId?: string;
    adminNotes?: string;
  }
): Promise<Booking> {
  // First get the document _id from bookingId
  const booking = await getBookingById(bookingId);
  if (!booking) {
    throw new Error('Booking not found');
  }

  const patch: Record<string, any> = {};

  if (updates.status) patch.status = updates.status;
  if (updates.paymentStatus) patch.paymentStatus = updates.paymentStatus;
  if (updates.paymentVerifiedAt) patch.paymentVerifiedAt = updates.paymentVerifiedAt;
  if (updates.paymentVerifiedBy) patch.paymentVerifiedBy = updates.paymentVerifiedBy;
  if (updates.transactionId) patch.transactionId = updates.transactionId;
  if (updates.adminNotes) patch.adminNotes = updates.adminNotes;
  if (updates.assignedVehicleId) {
    patch.assignedVehicle = { _type: 'reference', _ref: updates.assignedVehicleId };
  }

  return await writeClient.patch(booking._id).set(patch).commit();
}

// Helper function to add communication log entry
export async function addBookingCommunication(
  bookingId: string,
  communication: {
    type: 'whatsapp' | 'email' | 'phone' | 'system';
    message: string;
    sentBy: string;
  }
): Promise<void> {
  const booking = await getBookingById(bookingId);
  if (!booking) {
    throw new Error('Booking not found');
  }

  await writeClient.patch(booking._id).append('communications', [{
    timestamp: new Date().toISOString(),
    type: communication.type,
    message: communication.message,
    sentBy: communication.sentBy
  }]).commit();
}

// Helper function to upload payment screenshot
export async function uploadPaymentScreenshot(
  bookingId: string,
  imageAsset: { _type: 'image'; asset: { _type: 'reference'; _ref: string } }
): Promise<Booking> {
  const booking = await getBookingById(bookingId);
  if (!booking) {
    throw new Error('Booking not found');
  }

  return await writeClient.patch(booking._id).set({
    paymentScreenshot: imageAsset,
    paymentStatus: 'screenshot_uploaded'
  }).commit();
}

// ============================================
// TEMPLE SYSTEM FUNCTIONS
// ============================================

// Helper function to get all published temples
export async function getAllTemples() {
  const query = `*[_type == "temple" && published == true] | order(popularity desc, name asc) {
    _id,
    name,
    "slug": slug.current,
    subtitle,
    district,
    templeType,
    featuredImage,
    introText,
    highlights,
    popularity
  }`;
  return await client.fetch(query);
}

// Helper function to get temple by slug
export async function getTempleBySlug(slug: string) {
  const query = `*[_type == "temple" && slug.current == $slug && published == true][0] {
    _id,
    name,
    "slug": slug.current,
    subtitle,
    district,
    templeType,
    pageTitle,
    metaDescription,
    keywords,
    heroSlides[] {
      image,
      title,
      description
    },
    featuredImage,
    videoEmbed,
    introText,
    history,
    highlights,
    customSections[] {
      sectionTitle,
      sectionContent,
      sectionImage
    },
    timings {
      openTime,
      closeTime,
      poojaTimings,
      closedDays,
      specialNote
    },
    location {
      address,
      nearestCity,
      altitude,
      latitude,
      longitude,
      googleMapsEmbedUrl
    },
    howToReach {
      fromKathgodam,
      fromPantnagar,
      fromDelhi,
      nearestRailway,
      nearestAirport,
      distanceFromKathgodam
    },
    bestTimeToVisit,
    seasonalEvents[] {
      eventName,
      timing,
      description
    },
    pilgrimageTips,
    accommodationInfo,
    relatedRoutes[]-> {
      _id,
      from,
      to,
      "slug": slug.current,
      distance,
      duration,
      startingPrice
    },
    relatedPackages[]-> {
      _id,
      name,
      "slug": slug.current,
      subtitle,
      startingPrice,
      duration,
      featuredHomepageImage
    },
    nearbyTemples[]-> {
      _id,
      name,
      "slug": slug.current,
      subtitle,
      district,
      templeType,
      featuredImage
    },
    nearbyAttractions[]-> {
      _id,
      name,
      description,
      image,
      highlights
    },
    taxiCta {
      heading,
      subheading,
      primaryRoute-> {
        _id,
        from,
        to,
        "slug": slug.current,
        startingPrice,
        distance,
        duration
      }
    },
    faqs[] {
      question,
      answer
    }
  }`;
  return await client.fetch(query, { slug });
}

// Helper function to get all temple slugs (for static site generation)
export async function getAllTempleSlugs() {
  const query = `*[_type == "temple" && published == true] {
    "slug": slug.current
  }`;
  const temples = await client.fetch(query);
  return temples.map((temple: { slug: string }) => temple.slug);
}

// Helper function to get temples page data
export async function getTemplesPage(preview: boolean = false) {
  const activeClient = getClient(preview);
  const query = `*[_type == "templesPage"][0] {
    pageTitle,
    metaDescription,
    keywords,
    heroTitle,
    heroSubtitle,
    heroBadge,
    heroImage,
    introText,
    showFilters,
    filterByDistrictEnabled,
    filterByTypeEnabled,
    showCategoryNav,
    categoryNavTitle,
    templeCategories[] {
      categoryName,
      "categorySlug": categorySlug.current,
      categoryDescription,
      icon,
      displayOrder,
      temples[]-> {
        _id,
        name,
        "slug": slug.current,
        subtitle,
        district,
        templeType,
        introText,
        highlights,
        featuredImage,
        heroSlides[0] {
          image
        },
        popularity
      }
    } | order(displayOrder asc),
    bottomCtaHeading,
    bottomCtaText,
    showAdditionalInfo,
    additionalInfoTitle,
    additionalInfoPoints,
    faqs[] {
      question,
      answer
    }
  }`;
  return await activeClient.fetch(query);
}

// Helper function to get temples by district
export async function getTemplesByDistrict(district: string) {
  const query = `*[_type == "temple" && published == true && district == $district] | order(popularity desc) {
    _id,
    name,
    "slug": slug.current,
    subtitle,
    district,
    templeType,
    featuredImage,
    highlights
  }`;
  return await client.fetch(query, { district });
}

// Helper function to get temples by type
export async function getTemplesByType(templeType: string) {
  const query = `*[_type == "temple" && published == true && templeType == $templeType] | order(popularity desc) {
    _id,
    name,
    "slug": slug.current,
    subtitle,
    district,
    templeType,
    featuredImage,
    highlights
  }`;
  return await client.fetch(query, { templeType });
}
