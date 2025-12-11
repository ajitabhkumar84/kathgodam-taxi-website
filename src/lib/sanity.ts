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

// Preview client configuration (doesn't use CDN to get fresh data)
export const previewClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || '',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
  perspective: 'drafts', // Updated from 'previewDrafts' - includes draft documents
  token: import.meta.env.SANITY_API_TOKEN || '', // Required for preview mode
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
    attractions[] {
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
    attractions[] {
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
