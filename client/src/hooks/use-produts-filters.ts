import {
  categoriesAtom,
  defaultFilters,
  filtersProductsAtom,
  productsFilteredAtom,
  productsAtom
} from '@/atoms'
import { ICategory } from '@/types'
import { ProductsFilters } from '@/types/filter'
import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback } from 'react'

export default function useProductsFilters() {
  const allCategories = useAtomValue(categoriesAtom)
  const allProducts = useAtomValue(productsAtom)
  // const productsFiltered = useAtomValue(productsFilteredAtom)
  const applyFilter = useSetAtom(filtersProductsAtom)
  const filters = useAtomValue(filtersProductsAtom)

  const addFilter = useCallback(
    <T>(key: keyof ProductsFilters, value: T) => {
      applyFilter((currentFilters) => {
        if (Array.isArray(currentFilters[key])) {
          const currentFilter = currentFilters[key] as T[]
          return {
            ...currentFilters,
            [key]: [...currentFilter, value]
          }
        }
        return {
          ...currentFilters,
          [key]: value
        }
      })
    },
    [applyFilter]
  )

  const addFilterBulk = useCallback(
    <T>(key: keyof ProductsFilters, values: T[]) => {
      applyFilter((currentFilters) => {
        if (Array.isArray(currentFilters[key])) {
          const currentFilter = currentFilters[key] as T[]
          return {
            ...currentFilters,
            [key]: [...currentFilter, ...values]
          }
        }
        return {
          ...currentFilters,
          [key]: values
        }
      })
    },
    [applyFilter]
  )

  const removeFilter = useCallback(
    <T>(key: keyof ProductsFilters, value?: T) => {
      applyFilter((currentFilters) => {
        const currentFilter = currentFilters[key]
        if (Array.isArray(currentFilter)) {
          return {
            ...currentFilters,
            [key]: currentFilter.filter((filter) => filter !== value)
          }
        }
        if (typeof currentFilter === 'string') {
          return {
            ...currentFilters,
            [key]: ''
          }
        }
        if (typeof currentFilter === 'number') {
          return {
            ...currentFilters,
            [key]: {
              min: 0,
              max: Number.MAX_SAFE_INTEGER
            }
          }
        }
        return currentFilters
      })
    },
    [applyFilter]
  )

  const clearFilters = useCallback(() => {
    applyFilter(defaultFilters)
  }, [applyFilter])

  const existsFilter = useCallback(
    <T>(key: keyof ProductsFilters, value: T) => {
      if (Array.isArray(filters[key])) {
        const arrayFilter = filters[key] as T[]
        return arrayFilter.includes(value)
      }
      return filters[key] === value
    },
    [filters]
  )

  const getCurrentFilters = useCallback(() => {
    const filtersApplied = Object.entries(filters).filter(([key, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0
      }
      if (typeof value === 'string') {
        return value.length > 0
      }
      if (key === 'price') {
        return value.min >= 0 && value.max !== Number.MAX_SAFE_INTEGER
      }
      if (typeof value === 'number') {
        return value > 0
      }
      return false
    }) as [keyof ProductsFilters, any][]
    return filtersApplied.map(([key, value]) => {
      if (key === 'categories') {
        const categories = value as ICategory[]
        return [key, categories.map((category) => category.id)]
      }
      return [key, value]
    })
  }, [filters])

  const hasAnyFilter = useCallback(() => {
    return Object.entries(filters).some(([, filter]) => {
      if (Array.isArray(filter)) {
        return filter.length > 0
      }
      if (typeof filter === 'string') {
        return filter.length > 0
      }
      if (typeof filter === 'number') {
        return filter > 0
      }
      return false
    })
  }, [filters])

  const getMoreExpensiveProduct = () => {
    return allProducts.reduce((prev, current) => {
      return prev.price > current.price ? prev : current
    })
  }

  const getCheaperProduct = () => {
    // console.log({ productsFiltered })
    return allProducts.reduce((prev, current) => {
      return prev.price < current.price ? prev : current
    })
  }

  return {
    allCategories,
    filtersApplied: filters,
    addFilter,
    applyFilter,
    removeFilter,
    clearFilters,
    existsFilter,
    getCurrentFilters,
    addFilterBulk,
    hasAnyFilter,
    getMoreExpensiveProduct,
    getCheaperProduct
  }
}
