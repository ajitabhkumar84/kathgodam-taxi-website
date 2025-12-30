import type {Package} from './package'

export interface PackageCategory {
  categoryName: string
  categorySlug: {
    current: string
  }
  categoryDescription?: string
  icon: string
  packages: Package[]
  displayOrder: number
}

export interface PackagesPage {
  pageTitle: string
  metaDescription: string
  keywords?: string
  heroTitle: string
  heroSubtitle?: string
  heroBadge?: string
  heroImage?: any // Sanity image object
  introText?: string
  showFilters: boolean
  filterByDurationEnabled: boolean
  filterByPriceEnabled: boolean
  showCategoryNav: boolean
  categoryNavTitle?: string
  packageCategories: PackageCategory[]
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
