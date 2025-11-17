/**
 * Migration script to import route data into Sanity CMS
 *
 * Usage:
 * 1. Set up your .env file with Sanity credentials
 * 2. Customize the routeData object below with your route information
 * 3. Run: node scripts/migrate-route.js
 *
 * Note: This script uses CommonJS for compatibility
 */

import { createClient } from '@sanity/client';
import 'dotenv/config';

// Initialize Sanity client
const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // You'll need to add this to .env
  useCdn: false,
});

// Example: Kathgodam to Nainital route data
const routeData = {
  _type: 'route',
  from: 'Kathgodam',
  to: 'Nainital',
  slug: {
    _type: 'slug',
    current: 'kathgodam-nainital'
  },
  distance: '34 KM',
  duration: '1 Hour',
  startingPrice: '₹1,100',

  // SEO & Page Content
  pageTitle: 'Kathgodam to Nainital Taxi - Starting ₹1,100 | Fixed Transparent Pricing',
  metaDescription: 'Book Kathgodam to Nainital taxi at fixed rates starting ₹1,100. 34 KM, 1 hour journey. Clean AC cars, experienced drivers, no hidden charges. Book now!',
  keywords: 'Kathgodam to Nainital taxi, Nainital taxi fare, Kathgodam taxi, taxi booking Nainital, Kathgodam railway station taxi',
  introText1: 'Kathgodam to Nainital is at a distance of <strong>34 KM</strong> from Kathgodam railway station with a driving time of approximately <strong>1 hour</strong>. Nainital is the most frequently visited hill station from Kathgodam, and we provide reliable, comfortable taxi services to make your journey memorable.',
  introText2: 'Our taxi fare from Kathgodam to Nainital starts at <strong>₹1,100 for an Alto car</strong>, with transparent pricing that includes all tolls, taxes, and driver allowances. No hidden charges, no surprises!',
  attractionsTitle: 'Places Worth Seeing in Nainital',

  // Car Types
  carTypes: [
    {
      _type: 'carType',
      name: 'Hatchback',
      model: 'Alto / Alto K10',
      capacity: 'Up to 4 passengers',
      seasonPrice: '₹1,300',
      offSeasonPrice: '₹1,100',
      features: [
        'AC car with comfortable seating',
        'Perfect for couples & small families',
        'Fuel efficient for mountain roads',
        'Experienced local driver'
      ]
      // Note: You'll need to upload the image separately via Sanity Studio
    },
    {
      _type: 'carType',
      name: 'Sedan',
      model: 'Xcent / Amaze / Dzire',
      capacity: 'Up to 4 passengers',
      seasonPrice: '₹1,600',
      offSeasonPrice: '₹1,300',
      features: [
        'Premium comfort & space',
        'Extra luggage capacity',
        'Smooth ride on hills',
        'Professional chauffeur service'
      ]
    },
    {
      _type: 'carType',
      name: 'SUV Deluxe',
      model: 'Tavera Car - 8 pax',
      capacity: 'Up to 8 passengers',
      seasonPrice: '₹2,200',
      offSeasonPrice: '₹2,000',
      features: [
        'Spacious for large groups',
        '8 seater with ample legroom',
        'Perfect for family trips',
        'Extra luggage space'
      ]
    },
    {
      _type: 'carType',
      name: 'SUV Luxury',
      model: 'Innova Car - 7 pax',
      capacity: 'Up to 7 passengers',
      seasonPrice: '₹2,500',
      offSeasonPrice: '₹2,000',
      features: [
        'Premium luxury experience',
        'Most comfortable ride',
        'Ideal for corporate travel',
        'Top-of-the-line amenities'
      ]
    }
  ],

  // Attractions
  attractions: [
    {
      _type: 'attraction',
      name: 'Nainital Lake',
      description: 'Amidst seven mountains touching the sky, the heart of the place is a ravishing lake showering its beauty with pristine and stagnant water. Naini Lake has earned respect since beginning and even the district is named after this enchanting lake.',
      highlights: [
        'Boating facilities available',
        'Surrounded by seven hills',
        'Perfect for evening strolls',
        'Photography paradise'
      ]
    },
    {
      _type: 'attraction',
      name: 'Naina Devi Temple',
      description: 'The deity of the temple is Maa Naina Devi represented by two eyes. The temple was destroyed by the drastic landslide of 1880, and was later rebuilt because the temple was of great importance amongst locals.',
      highlights: [
        'Ancient Hindu temple',
        'Spiritual significance',
        'Beautiful architecture',
        'Peaceful atmosphere'
      ]
    },
    {
      _type: 'attraction',
      name: 'The Mall Road',
      description: 'Mall road nexuses Mallital with Tallital and thus is busiest road of the town. During peak season (May and June) vehicles are not allowed to enter mall road so that the trade keeps on strolling as this point is famous among tourists.',
      highlights: [
        'Shopping & dining hub',
        'Local handicrafts & souvenirs',
        'Street food delights',
        'Evening entertainment'
      ]
    },
    {
      _type: 'attraction',
      name: 'Aerial Ropeway',
      description: 'The Aerial Ropeway commences at Mallital and is connected with Snow view point situated at a breathtaking elevation of 2275 mts above sea level. Snow view point offers the majestic views of the Himalayan range.',
      highlights: [
        'Panoramic Himalayan views',
        'Thrilling cable car ride',
        '2275m elevation',
        'Perfect for photography'
      ]
    },
    {
      _type: 'attraction',
      name: 'Snow View Point',
      description: 'Accessible by ropeway or trek, Snow View Point offers stunning 360-degree views of the snow-capped Himalayan peaks including Nanda Devi, Trisul, and Nanda Kot.',
      highlights: [
        'Spectacular mountain views',
        'Sunrise & sunset point',
        'Telescope facilities',
        'Refreshment stalls'
      ]
    }
  ],

  // FAQs
  faqs: [
    {
      _type: 'faq',
      question: 'How long does the journey take from Kathgodam to Nainital?',
      answer: 'The journey from Kathgodam to Nainital typically takes around <strong>1 hour</strong>, covering a distance of 34 KM. The actual time may vary depending on traffic conditions and weather.'
    },
    {
      _type: 'faq',
      question: 'What is included in the taxi fare?',
      answer: 'Our taxi fare is fully inclusive of:<br>• All tolls and state taxes<br>• Parking fees<br>• Driver allowance<br>• Fuel charges<br>• Pick up from Kathgodam Railway Station<br>There are absolutely no hidden charges!'
    },
    {
      _type: 'faq',
      question: 'Is the car AC or non-AC?',
      answer: 'All our cars are <strong>fully air-conditioned</strong> with working AC. We maintain our fleet to the highest standards to ensure your comfort during the mountain journey.'
    },
    {
      _type: 'faq',
      question: 'What if my train is delayed?',
      answer: 'Don\'t worry! We track train timings and our drivers wait for delayed trains at no extra cost. Just inform us about your train number when booking, and we\'ll monitor it for you.'
    },
    {
      _type: 'faq',
      question: 'What is your cancellation policy?',
      answer: 'We offer flexible cancellation:<br>• <strong>Free cancellation</strong> up to 24 hours before pickup<br>• 50% charge for cancellations within 24 hours<br>• No refund for no-shows<br>Please contact us on WhatsApp or call for any changes to your booking.'
    },
    {
      _type: 'faq',
      question: 'Is the drop till our Hotel?',
      answer: 'The prices mentioned are for drop at <strong>Mall Road, Nainital</strong>. If your hotel is located in <strong>Birla Road, Zoo Road, or Ayarpatta areas</strong>, there will be a slight additional charge due to the extra distance. Please inform us of your exact hotel location when booking.'
    }
  ],

  // Stay Packages
  stayPackages: [
    {
      _type: 'stayPackage',
      name: 'Hatchback + Stay',
      description: 'Alto/Alto K10 + 1 Room (Twin Sharing)',
      seasonPrice: '₹2,200',
      offSeasonPrice: '₹1,900',
      popular: false
    },
    {
      _type: 'stayPackage',
      name: 'Sedan + Stay',
      description: 'Xcent/Amaze/Dzire + 1 Room',
      seasonPrice: '₹2,500',
      offSeasonPrice: '₹2,200',
      popular: true
    },
    {
      _type: 'stayPackage',
      name: 'SUV + Stay',
      description: 'Tavera (8 pax) + 3 Rooms',
      seasonPrice: '₹5,200',
      offSeasonPrice: '₹4,900',
      popular: false
    }
  ],

  // Tour Packages
  tourPackages: [
    {
      _type: 'tourPackage',
      name: '2 Days & 1 Night',
      subtitle: 'Nainital Local Tour',
      features: [
        'Nainital Lake, Mall Road & Snow View',
        'Naina Devi Temple Visit',
        'Bhimtal & Sattal Lakes'
      ],
      price: 'From ₹5,500',
      popular: false
    },
    {
      _type: 'tourPackage',
      name: 'Kainchi Dham',
      subtitle: '4 Dham Tour',
      features: [
        'Kainchi Dham Ashram',
        'Neem Karoli Baba Temple',
        'Ghorakhal & Chitai Temples'
      ],
      price: 'From ₹4,500',
      popular: true
    },
    {
      _type: 'tourPackage',
      name: '3 Days & 2 Nights',
      subtitle: 'Nainital & Mukteshwar',
      features: [
        'Nainital complete sightseeing',
        'Mukteshwar Temple & viewpoints',
        'Bhimtal, Sattal & Naukuchiatal'
      ],
      price: 'From ₹9,500',
      popular: false
    },
    {
      _type: 'tourPackage',
      name: '4 Days & 3 Nights',
      subtitle: 'Complete Kumaon Tour',
      features: [
        'Nainital, Mukteshwar, Ranikhet',
        'All lakes & viewpoints',
        'Temples & cultural sites'
      ],
      price: 'From ₹14,500',
      popular: false
    }
  ],

  // Published status
  published: true
};

// Function to create the route
async function migrateRoute() {
  try {
    console.log('🚀 Starting route migration...');
    console.log(`📍 Route: ${routeData.from} → ${routeData.to}`);

    // Check if route already exists
    const existing = await client.fetch(
      `*[_type == "route" && slug.current == $slug][0]`,
      { slug: routeData.slug.current }
    );

    if (existing) {
      console.log('⚠️  Route already exists!');
      console.log('Would you like to:');
      console.log('1. Update existing route');
      console.log('2. Create a new version');
      console.log('3. Cancel');
      console.log('\nTo update, modify this script to use client.patch() instead of client.create()');
      return;
    }

    // Create the route
    const result = await client.create(routeData);

    console.log('✅ Route successfully created!');
    console.log('📄 Document ID:', result._id);
    console.log('🔗 Studio URL:', `https://www.sanity.io/manage/project/${process.env.PUBLIC_SANITY_PROJECT_ID}/desk/route;${result._id}`);
    console.log('\n⚠️  Important: Don\'t forget to upload images for car types and attractions via Sanity Studio!');
    console.log('🌐 Route will be available at: /routes/' + routeData.slug.current);

  } catch (error) {
    console.error('❌ Error creating route:', error.message);

    if (error.message.includes('Insufficient permissions')) {
      console.log('\n💡 Make sure you have set SANITY_API_TOKEN in your .env file');
      console.log('Get a token from: https://www.sanity.io/manage/project/' + process.env.PUBLIC_SANITY_PROJECT_ID + '/api');
    }
  }
}

// Run the migration
migrateRoute();
