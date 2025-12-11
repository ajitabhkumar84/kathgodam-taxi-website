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

export const schemaTypes = [
  // Document types
  route,
  packageDoc,
  siteSettings,
  homePage,
  ratesPage,
  navbar,
  footer,
  whyChooseUs,
  corporateClient,

  // Object types (used within documents)
  heroSlide,
  homeHeroSlide,
  homeTestimonial,
  routeCategory,
  carType,
  attraction,
  faq,
  stayPackage,
  tourPackage,
]
