import route from './route'
import packageDoc from './package'
import carType from './carType'
import attraction from './attraction'
import faq from './faq'
import stayPackage from './stayPackage'
import tourPackage from './tourPackage'
import heroSlide from './heroSlide'
import siteSettings from './siteSettings'
import homePage from './homePage'
import navbar from './navbar'
import footer from './footer'
import homeHeroSlide from './homeHeroSlide'
import homeTestimonial from './homeTestimonial'
import whyChooseUs from './whyChooseUs'
import corporateClient from './corporateClient'
import routeCategory from './routeCategory'
import ratesPage from './ratesPage'
import packageCategory from './packageCategory'
import packagesPage from './packagesPage'
// Booking system schemas
import vehicle from './vehicle'
import booking from './booking'
import bookingSettings from './bookingSettings'
// Safety messaging schemas
import safetySection from './safetySection'
import safetyBanner from './safetyBanner'
// Temple system schemas
import temple from './temple'
import templeCategory from './templeCategory'
import templesPage from './templesPage'
// Complete tour page schemas
import completeTourPage from './completeTourPage'
import multiDayCarCategory from './multiDayCarCategory'
import tourDurationPackage from './tourDurationPackage'
import inclusionExclusionItem from './inclusionExclusionItem'

export const schemaTypes = [
  // Document types
  route,
  packageDoc,
  attraction,
  siteSettings,
  homePage,
  ratesPage,
  packagesPage,
  navbar,
  footer,
  whyChooseUs,
  corporateClient,
  // Booking system documents
  vehicle,
  booking,
  bookingSettings,
  // Safety messaging documents
  safetySection,
  safetyBanner,
  // Temple system documents
  temple,
  templesPage,
  // Complete tour page document
  completeTourPage,

  // Object types (used within documents)
  heroSlide,
  homeHeroSlide,
  homeTestimonial,
  routeCategory,
  packageCategory,
  templeCategory,
  carType,
  faq,
  stayPackage,
  tourPackage,
  multiDayCarCategory,
  tourDurationPackage,
  inclusionExclusionItem,
]
