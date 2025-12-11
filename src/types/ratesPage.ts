import type {Route} from './route'

export interface RouteCategory {
  categoryName: string
  categorySlug: {
    current: string
  }
  categoryDescription?: string
  icon: string
  routes: Route[]
  displayOrder: number
}

export interface RatesPage {
  pageTitle: string
  metaDescription: string
  keywords?: string
  heroTitle: string
  heroSubtitle?: string
  heroBadge?: string
  heroImage?: any // Sanity image object
  introText?: string
  showCategoryNav: boolean
  categoryNavTitle?: string
  routeCategories: RouteCategory[]
  bottomCtaHeading?: string
  bottomCtaText?: string
  showAdditionalInfo: boolean
  additionalInfoTitle?: string
  additionalInfoPoints?: string[]
  faqs?: Array<{
    question: string
    answer: string
  }>
}
