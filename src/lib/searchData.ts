import { client } from './sanity';

export interface SearchResult {
  id: string;
  type: 'route' | 'package' | 'temple' | 'attraction';
  title: string;
  subtitle?: string;
  description: string;
  url: string;
  price?: string;
  image?: any;
  keywords?: string[];
}

/**
 * Fetches all searchable content from Sanity CMS
 * This function aggregates routes, packages, temples, and attractions
 * into a unified searchable format
 */
export async function getAllSearchableContent(): Promise<SearchResult[]> {
  try {
    const query = `{
      "routes": *[_type == "route" && published == true] {
        _id,
        from,
        to,
        "slug": slug.current,
        startingPrice,
        introText1,
        keywords,
        heroSlides[0] {
          image
        },
        attractions[]-> {
          name
        }
      },
      "packages": *[_type == "package" && published == true] {
        _id,
        name,
        "slug": slug.current,
        subtitle,
        startingPrice,
        introText,
        keywords,
        highlights,
        heroSlides[0] {
          image
        }
      },
      "temples": *[_type == "temple" && published == true] {
        _id,
        name,
        "slug": slug.current,
        subtitle,
        district,
        templeType,
        introText,
        keywords,
        highlights,
        featuredImage
      },
      "attractions": *[_type == "attraction"] {
        _id,
        name,
        description,
        image,
        highlights
      }
    }`;

    const data = await client.fetch(query);

    const searchResults: SearchResult[] = [];

  // Process routes
  if (data.routes && Array.isArray(data.routes)) {
    data.routes.forEach((route: any) => {
      if (!route || !route._id || !route.slug) return; // Skip invalid routes

      const attractionNames = route.attractions
        ?.filter((a: any) => a && a.name)
        .map((a: any) => a.name)
        .join(', ') || '';

      searchResults.push({
        id: route._id,
        type: 'route',
        title: `${route.from || 'Unknown'} to ${route.to || 'Unknown'}`,
        subtitle: route.startingPrice ? `₹${route.startingPrice} • Taxi Service` : 'Taxi Service',
        description: route.introText1 || `Book taxi from ${route.from || 'departure'} to ${route.to || 'destination'}`,
        url: `/${route.slug}`,
        price: route.startingPrice,
        image: route.heroSlides?.[0]?.image,
        keywords: [
          route.from,
          route.to,
          route.keywords,
          'taxi',
          'cab',
          'route',
          attractionNames,
        ].filter(Boolean),
      });
    });
  }

  // Process packages
  if (data.packages && Array.isArray(data.packages)) {
    data.packages.forEach((pkg: any) => {
      if (!pkg || !pkg._id || !pkg.slug || !pkg.name) return; // Skip invalid packages

      const highlightsText = pkg.highlights?.filter(Boolean).join(', ') || '';
      searchResults.push({
        id: pkg._id,
        type: 'package',
        title: pkg.name,
        subtitle: pkg.subtitle || (pkg.startingPrice ? `₹${pkg.startingPrice} • Tour Package` : 'Tour Package'),
        description: pkg.introText || highlightsText || `Multi-day tour package: ${pkg.name}`,
        url: `/${pkg.slug}`,
        price: pkg.startingPrice,
        image: pkg.heroSlides?.[0]?.image,
        keywords: [
          pkg.name,
          pkg.keywords,
          'package',
          'tour',
          'trip',
          highlightsText,
        ].filter(Boolean),
      });
    });
  }

  // Process temples
  if (data.temples && Array.isArray(data.temples)) {
    data.temples.forEach((temple: any) => {
      if (!temple || !temple._id || !temple.slug || !temple.name) return; // Skip invalid temples

      const highlightsText = temple.highlights?.filter(Boolean).join(', ') || '';
      searchResults.push({
        id: temple._id,
        type: 'temple',
        title: temple.name,
        subtitle: temple.district ? `${temple.district} • ${temple.templeType || 'Temple'}` : (temple.templeType || 'Temple'),
        description: temple.introText || temple.subtitle || highlightsText || `Visit ${temple.name}`,
        url: `/${temple.slug}`,
        image: temple.featuredImage,
        keywords: [
          temple.name,
          temple.district,
          temple.templeType,
          temple.keywords,
          'temple',
          'pilgrimage',
          'darshan',
          highlightsText,
        ].filter(Boolean),
      });
    });
  }

  // Process attractions
  if (data.attractions && Array.isArray(data.attractions)) {
    data.attractions.forEach((attraction: any) => {
      if (!attraction || !attraction._id || !attraction.name) return; // Skip invalid attractions

      const highlightsText = attraction.highlights?.filter(Boolean).join(', ') || '';
      searchResults.push({
        id: attraction._id,
        type: 'attraction',
        title: attraction.name,
        subtitle: 'Tourist Attraction',
        description: attraction.description || highlightsText || `Visit ${attraction.name}`,
        url: '#', // Attractions don't have dedicated pages
        image: attraction.image,
        keywords: [
          attraction.name,
          'attraction',
          'tourist spot',
          'sightseeing',
          highlightsText,
        ].filter(Boolean),
      });
    });
  }

    return searchResults;
  } catch (error) {
    console.error('Error fetching search data:', error);
    // Return empty array on error to prevent breaking the page
    return [];
  }
}
