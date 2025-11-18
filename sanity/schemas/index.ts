import route from './route'
import carType from './carType'
import attraction from './attraction'
import faq from './faq'
import stayPackage from './stayPackage'
import tourPackage from './tourPackage'
import heroSlide from './heroSlide'
import sightseeingTour from './sightseeingTour'

export const schemaTypes = [
  // Document types
  route,
  sightseeingTour,

  // Object types (used within documents)
  heroSlide,
  carType,
  attraction,
  faq,
  stayPackage,
  tourPackage,
]
