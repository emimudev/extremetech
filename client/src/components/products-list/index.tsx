import { useEffect, useState } from 'react'
import { Pagination, PaginationItem } from '@nextui-org/react'
import { useSearchParams } from 'react-router-dom'
import { useAtomValue } from 'jotai'
import { productsFilteredAtom } from '@/atoms'
import Product from '@/components/product'
import { paginate } from '@/utils/paginate'
import { cn } from '@/lib/utils'
import './index.scss'
import EmptyState from '../empty-state'

const INITIAL_PAGE = 1

export default function ProductsList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const paramPage = searchParams.get('page')
  const [page, setPage] = useState(
    paramPage ? parseInt(paramPage) : INITIAL_PAGE
  )
  const products = useAtomValue(productsFilteredAtom)
  const { currentPage, startIndex, endIndex, totalPages } = paginate(
    products.length,
    page,
    10
  )
  const handleChange = (page: number) => {
    setPage(page)
    searchParams.delete('page')
    searchParams.append('page', page.toString())
    setSearchParams(searchParams)
  }

  useEffect(() => {
    if (!paramPage) {
      setPage(INITIAL_PAGE)
    }
  }, [paramPage])

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
    <div className='flex flex-col'>
      <ul className='products__list gap-x-3 gap-y-4 min-h-96 relative z-0'>
        {products.slice(startIndex, endIndex + 1).map((product) => (
          <li key={product.id}>
            <Product product={product} />
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <Pagination
          disableCursorAnimation
          className='mt-10 lg:self-center mb-10'
          showControls
          total={totalPages}
          page={currentPage}
          initialPage={INITIAL_PAGE}
          renderItem={({ ...props }) => {
            const className = cn(props.className, 'cursor-pointer')
            return (
              <PaginationItem
                role='listitem'
                {...props}
                className={className}
              />
            )
          }}
          onChange={handleChange}
        />
      )}
    </div>
  )
}
