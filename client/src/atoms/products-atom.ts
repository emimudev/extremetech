import { DB } from '@/data'
import { ICategory, IProduct } from '@/types'
import { ProductsFilters } from '@/types/filter'
import { isInCategory } from '@/utils/functions'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const defaultFilters: ProductsFilters = {
  name: '',
  categories: [],
  brands: [],
  price: { min: 0, max: Number.MAX_SAFE_INTEGER }
}

export const productsAtom = atomWithStorage('products', DB.products)

export const categoriesAtom = atomWithStorage('categories', DB.categories)

export const filtersProductsAtom = atom(defaultFilters)

export const productsFilteredAtom = atom((get) => {
  const products = get(productsAtom)
  const filters = get(filtersProductsAtom)

  const filterByCategory = (product: IProduct) => {
    if (filters.categories.length === 0) return true
    for (const category of filters.categories) {
      if (
        isInCategory(
          DB.categories,
          product.category as unknown as keyof ICategory,
          category.id
        )
      ) {
        return true
      }
    }
    return false
  }

  const filterByName = (product: IProduct) => {
    return product.name.toLowerCase().includes(filters.name.toLowerCase())
  }

  const filterByBrand = (product: IProduct) => {
    if (filters.brands.length === 0) return true
    return filters.brands.includes(product.brand)
  }

  const filterByPrice = (product: IProduct) => {
    return (
      product.price >= filters.price.min && product.price <= filters.price.max
    )
  }

  return products.filter((product) => {
    const isName = filterByName(product)
    const isCategory = filterByCategory(product)
    const isBrand = filterByBrand(product)
    const isPrice = filterByPrice(product)
    return isName && isCategory && isBrand && isPrice
  })
})
