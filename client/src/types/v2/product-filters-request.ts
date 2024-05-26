export interface ProductFiltersRequest {
  categoryCode: string
  brands: string[]
  filters: Record<string, any>[]
}
