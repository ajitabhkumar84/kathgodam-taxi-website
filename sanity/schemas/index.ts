import route from './route'
import carType from './carType'
import attraction from './attraction'
import faq from './faq'
import stayPackage from './stayPackage'
import tourPackage from './tourPackage'

export const schemaTypes = [
  // Document types
  route,

  // Object types (used within documents)
  carType,
  attraction,
  faq,
  stayPackage,
  tourPackage,
]
