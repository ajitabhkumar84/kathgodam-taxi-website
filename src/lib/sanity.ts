import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Sanity client configuration
export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || '',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: true,
});

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
    attractions[] {
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
    attractions[] {
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

// ==================== SIGHTSEEING TOURS ====================

// Helper function to get all published sightseeing tours
export async function getAllSightseeingTours() {
  const query = `*[_type == "sightseeingTour" && published == true] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    tourType,
    duration,
    distance,
    difficulty,
    price,
    bestTime,
    pickupLocation,
    dropLocation,
    heroSlides[] {
      image,
      caption
    },
    overviewDescription,
    highlights,
    itinerary[] {
      time,
      title,
      description,
      duration,
      image
    },
    placesIncluded[] {
      name,
      description,
      timeSpent,
      image,
      highlights
    },
    pricing[] {
      vehicleType,
      model,
      capacity,
      price,
      features,
      image
    },
    inclusions,
    exclusions,
    thingsToCarry,
    importantInfo,
    faqs[] {
      question,
      answer
    },
    relatedTours[]-> {
      name,
      "slug": slug.current,
      duration,
      price,
      heroSlides[0] {
        image
      }
    },
    mapEmbedUrl,
    weatherLatitude,
    weatherLongitude,
    pageTitle,
    metaDescription,
    keywords
  }`;

  return await client.fetch(query);
}

// Helper function to get a single sightseeing tour by slug
export async function getSightseeingTourBySlug(slug: string) {
  const query = `*[_type == "sightseeingTour" && slug.current == $slug && published == true][0] {
    _id,
    name,
    "slug": slug.current,
    tourType,
    duration,
    distance,
    difficulty,
    price,
    bestTime,
    pickupLocation,
    dropLocation,
    heroSlides[] {
      image,
      caption
    },
    overviewDescription,
    highlights,
    itinerary[] {
      time,
      title,
      description,
      duration,
      image
    },
    placesIncluded[] {
      name,
      description,
      timeSpent,
      image,
      highlights
    },
    pricing[] {
      vehicleType,
      model,
      capacity,
      price,
      features,
      image
    },
    inclusions,
    exclusions,
    thingsToCarry,
    importantInfo,
    faqs[] {
      question,
      answer
    },
    relatedTours[]-> {
      name,
      "slug": slug.current,
      duration,
      price,
      heroSlides[0] {
        image
      }
    },
    mapEmbedUrl,
    weatherLatitude,
    weatherLongitude,
    pageTitle,
    metaDescription,
    keywords
  }`;

  return await client.fetch(query, { slug });
}

// Helper function to get all sightseeing tour slugs (for static site generation)
export async function getAllSightseeingTourSlugs() {
  const query = `*[_type == "sightseeingTour" && published == true] {
    "slug": slug.current
  }`;

  const tours = await client.fetch(query);
  return tours.map((tour: { slug: string }) => tour.slug);
}
