import { DB } from '@/data'
import { ICategory } from '@/types'

export function buildBreadcrumb(
  categoryId: string | undefined | null,
  categories: Record<string, ICategory> = DB.categories
): ICategory[] {
  if (!categoryId) return []
  const breadcrumb: ICategory[] = []
  let currentCategory: ICategory | null = categories[categoryId]
  while (currentCategory) {
    breadcrumb.unshift(currentCategory)
    currentCategory = currentCategory.parent
      ? categories[currentCategory.parent]
      : null
  }
  return breadcrumb
}

export function isInCategory(
  categories: Record<string, ICategory>,
  categoryId: keyof ICategory,
  parentCategory: string
) {
  let currentCategory = categories[categoryId]
  while (currentCategory) {
    if (currentCategory.id === parentCategory) {
      return true
    }
    // @ts-expect-error parent could be undefined
    currentCategory = categories[currentCategory.parent]
  }
  return false
}

export function isInGlobalCategories(
  categoryId: keyof ICategory,
  parentCategory: string,
  categories: Record<string, ICategory> = DB.categories
) {
  let currentCategory = categories[categoryId]
  while (currentCategory) {
    if (currentCategory.id === parentCategory) {
      return true
    }
    // @ts-expect-error parent could be undefined
    currentCategory = categories[currentCategory.parent]
  }
  return false
}
