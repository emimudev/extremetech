import { filtersProductsAtom } from '@/atoms'
import useProductsFilters from '@/hooks/use-produts-filters'
import { ICategory } from '@/types'
import { Checkbox, Divider } from '@nextui-org/react'
import { useSetAtom } from 'jotai'
import ClearFiltersButton from './clear-filters-button'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import PriceFilter from './price-filter'

export interface ProductsFiltersProps {
  category: ICategory | undefined | null
}

export default function ProductsFilters() {
  const { addFilter, clearFilters, existsFilter, removeFilter, allCategories } =
    useProductsFilters()
  const applyFilter = useSetAtom(filtersProductsAtom)
  const [searchParams, setSearchParams] = useSearchParams()
  const rootCategories = Object.values(allCategories).filter(
    (category) => category.parent === null
  )
  const subCategories = Object.values(allCategories).filter(
    (category) => category.parent !== null
  )

  useEffect(() => {
    if (searchParams.size === 0) {
      clearFilters()
      return
    }
    const categoriesParams = searchParams.getAll('categories')
    const categories = categoriesParams.map(
      (categoryId) => allCategories[categoryId]
    )
    console.log({ categoriesParams, categories })
    if (categories) {
      applyFilter((prev) => {
        return {
          ...prev,
          categories
        }
      })
    }
  }, [allCategories, searchParams, applyFilter, clearFilters])

  // si category es undefined, mostrar todos los productos y la lista de categorias principales
  // si category no es undefined, mostrar los productos de esa categoria y la lista de subcategorias

  return (
    <aside className='products-filters h-full hidden relative lg:block lg:col-span-3 pt-8 mb-10'>
      <div className='lg:sticky h-full max-h-[calc(100vh-var(--navbar-height))] top-[calc(var(--navbar-height)+50px)] z-0 pt-0 pb-0'>
        <div className='max-h-[100%] overflow-x-hidden overflow-y-auto'>
          <div className='pb-4 text-lg'>
            <div>
              <span>Filters</span>
              <span className='flex xl:px-4'>
                <ClearFiltersButton />
              </span>
            </div>
            <Divider className='mt-2' />
          </div>
          <div className='flex flex-col rounded-none'>
            <div className='mb-3'>
              <div className='pb-2 text-sm'>Categories</div>
              <div className='flex flex-col gap-1 px-3'>
                {rootCategories.map((category) => {
                  return (
                    <div key={category.id} className='w-full'>
                      <Checkbox
                        className='w-full'
                        color='success'
                        id=''
                        radius='sm'
                        size='sm'
                        isSelected={existsFilter('categories', category)}
                        onChange={(e) => {
                          const isChecked = e.target.checked
                          if (isChecked) {
                            addFilter('categories', category)
                            searchParams.append('categories', category.id)
                            setSearchParams(searchParams)
                          } else {
                            removeFilter('categories', category)
                            searchParams.delete('categories', category.id)
                            setSearchParams(searchParams)
                          }
                        }}
                      >
                        {category.name}
                      </Checkbox>
                    </div>
                  )
                })}
              </div>
            </div>
            <Divider></Divider>
            <div className='mb-3 mt-4'>
              <div className='pb-2 text-sm'>Subcategories</div>
              <div className='flex flex-col gap-1 px-3'>
                {subCategories.map((category) => {
                  return (
                    <div key={category.id} className='w-full'>
                      <Checkbox
                        className='w-full'
                        color='success'
                        id=''
                        radius='sm'
                        size='sm'
                        isSelected={existsFilter('categories', category)}
                        onChange={(e) => {
                          const isChecked = e.target.checked
                          if (isChecked) {
                            addFilter('categories', category)
                            searchParams.append('categories', category.id)
                            setSearchParams(searchParams)
                          } else {
                            removeFilter('categories', category)
                            searchParams.delete('categories', category.id)
                            setSearchParams(searchParams)
                          }
                        }}
                      >
                        {category.name}
                      </Checkbox>
                    </div>
                  )
                })}
              </div>
            </div>

            <Divider />
            <div className='mb-3 mt-3'>
              <div className='flex flex-col gap-1'>
                <PriceFilter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
