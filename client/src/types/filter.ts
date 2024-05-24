import { ICategory } from './category'

export interface ProductsFilters {
  name: string
  categories: ICategory[]
  brands: string[]
  price: { min: number; max: number }
}
