import Product from '@/components/product'
import { cn } from '@/lib/utils'
import {
  FindProductsByFiltersParams,
  ProductService
} from '@/services/product-service'
import { KeyValuePairList } from '@/types/key-value-pair-list'
import { Pagination, PaginationItem, Skeleton } from '@nextui-org/react'
import { useSearchParams } from 'react-router-dom'
import useSWR from 'swr'
import { DelayedRender } from '../delayed-render'
import EmptyState from '../empty-state'
import './index.scss'

const INITIAL_PAGE = 1
const INITIAL_PAGE_SIZE = 10

export const productsIgnoreKnownParams = ['page', 'size', 'brand']

export default function ProductsList({
  categoryCode
}: {
  categoryCode: string
}) {
  // const [searchParams, setSearchParams] = useSearchParams()
  // const { data, isLoading } = useContext(ProductsContext)
  const [searchParams, setSearchParams] = useSearchParams()
  const brands = searchParams.getAll('brand') ?? undefined
  const currentPage = searchParams.get('page') ?? INITIAL_PAGE
  const currentPageSize = searchParams.get('size') ?? INITIAL_PAGE_SIZE
  const filtersQuery: KeyValuePairList[] = []

  searchParams.forEach((value, key) => {
    if (productsIgnoreKnownParams.includes(key)) return
    if (filtersQuery.find((filter) => filter.key === key)) {
      filtersQuery.find((filter) => filter.key === key)?.values.push(value)
    } else {
      filtersQuery.push({ key, values: [value] })
    }
    // console.log({ key, value })
  })

  const queryParams: FindProductsByFiltersParams = {
    categoryCode,
    page: Number(currentPage),
    size: Number(currentPageSize),
    brands,
    filters: filtersQuery
  }

  const onPageChange = (newPageNumber: number) => {
    if (searchParams.has('page')) {
      searchParams.delete('page')
    }
    searchParams.append('page', newPageNumber.toString())
    setSearchParams(searchParams)
  }

  const { data, isLoading } = useSWR(
    [queryParams, '/api/v1/products/filter'],
    ([params]) =>
      ProductService.findProductsByFilters(params).then((res) => res.content),
    { keepPreviousData: true }
  )

  if (!data || (isLoading && !data)) {
    return (
      <div className='products__list gap-x-3 gap-y-4 min-h-96 relative z-0'>
        <DelayedRender>
          {new Array(10).fill(0).map((_, index) => (
            <Skeleton key={index} className='w-full aspect-square rounded-xl' />
          ))}
        </DelayedRender>
      </div>
    )
  }

  const { results: products, totalPages, page } = data

  if (products.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center size-96 m-auto'>
        <EmptyState />
        <h1 className='text-xl mt-5 text-foreground-subtle'>
          No products found
        </h1>
      </div>
    )
  }

  return (
    <div className='flex flex-col relative'>
      <ul className='products__list gap-x-3 gap-y-4 min-h-96 relative z-0'>
        {products.map((product) => (
          <li key={product.id}>
            <Product product={product} />
          </li>
        ))}
        {/* {isLoading && (
          <DelayedRender delay={100}>
            <div className='absolute inset-0 bg-accent'></div>
          </DelayedRender>
        )} */}
      </ul>
      {totalPages > 1 && (
        <Pagination
          className='mt-10 mb-10'
          showControls
          showShadow
          total={totalPages}
          page={page}
          initialPage={INITIAL_PAGE}
          renderItem={({ ...props }) => (
            <PaginationItem
              role='listitem'
              {...props}
              className={cn(props.className, 'cursor-pointer')}
            />
          )}
          onChange={onPageChange}
        />
      )}
    </div>
  )
}
