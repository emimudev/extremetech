import {
  GetProductFiltersParams,
  ProductService
} from '@/services/product-service'
import { ICategory } from '@/types'
import { KeyValuePairList } from '@/types/key-value-pair-list'
import { existSearchParam } from '@/utils/search-params'
import { Checkbox, Divider } from '@nextui-org/react'
import { useSearchParams } from 'react-router-dom'
import useSWR from 'swr'
import { DelayedRender } from '../delayed-render'
import { productsIgnoreKnownParams } from '../products-list'
import ClearFiltersButton from './clear-filters-button'

export interface ProductsFiltersProps {
  category: ICategory | undefined | null
}

export default function ProductsFilters({
  categoryCode
}: {
  categoryCode: string
}) {
  const [searchParams, setSearchParams] = useSearchParams()
  const brands = searchParams.getAll('brand') ?? undefined
  const filtersQuery: KeyValuePairList[] = []

  searchParams.forEach((value, key) => {
    if (productsIgnoreKnownParams.includes(key)) return
    if (filtersQuery.find((filter) => filter.key === key)) {
      filtersQuery.find((filter) => filter.key === key)?.values.push(value)
    } else {
      filtersQuery.push({ key, values: [value] })
    }
  })

  const queryParams: GetProductFiltersParams = {
    categoryCode,
    brands,
    filters: filtersQuery
  }

  const { data, isLoading } = useSWR(
    [queryParams, '/api/v1/products/filter'],
    ([params]) => ProductService.getFilters(params).then((res) => res.content),
    { keepPreviousData: true }
  )

  if (!data || (isLoading && !data)) {
    return (
      <DelayedRender>
        <div className=''>cargando...</div>
      </DelayedRender>
    )
  }

  return (
    <aside className='products-filters h-full hidden relative lg:block lg:col-span-3 pt-8 mb-10'>
      <div className='lg:sticky h-fit top-[calc(var(--navbar-height)+50px)] z-0 pt-0 pb-0'>
        <div className='max-h-[calc(100vh-var(--navbar-height)-32px)] overflow-x-hidden overflow-y-auto'>
          <div className='pb-4 text-lg'>
            <div className='flex items-center justify-between'>
              <span>Filters</span>
              <span>
                <ClearFiltersButton />
              </span>
            </div>
            <Divider className='mt-3' />
          </div>
          <div className='flex flex-col rounded-none'>
            {/* <div className='mb-3'>
              <div className='flex flex-col gap-1'>
                <PriceFilter />
              </div>
            </div>
            <Divider className='my-2' /> */}
            <div className='mb-3'>
              <div className='flex flex-col gap-3.5 pr-3'>
                {Object.entries(data).map(([filterKey, filterValues]) => {
                  return (
                    <div key={filterKey} className='w-full'>
                      <div className='pb-2 text-sm text-foreground-strong'>
                        {filterKey}
                      </div>
                      <div className='flex flex-col gap-0.5'>
                        {filterValues.map((filterValue) => {
                          const isSelected = existSearchParam(
                            searchParams,
                            filterKey,
                            filterValue
                          )
                          return (
                            <div key={filterValue} className='w-full line-clamp-1 pl-2'>
                              <Checkbox
                                className='w-full'
                                classNames={{ label: 'line-clamp-1' }}
                                color='success'
                                radius='sm'
                                size='sm'
                                isSelected={isSelected}
                                title={filterValue}
                                onChange={() => {
                                  if (isSelected) {
                                    searchParams.delete(filterKey, filterValue)
                                    setSearchParams(searchParams)
                                  } else {
                                    searchParams.append(filterKey, filterValue)
                                    setSearchParams(searchParams)
                                  }
                                }}
                              >
                                {filterValue}
                              </Checkbox>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
