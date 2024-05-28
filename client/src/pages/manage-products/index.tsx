import { ProductService } from '@/services/product-service'
import { useState } from 'react'
import useSWR from 'swr'
import { ProductsList } from './products-list'
import { Button } from '@nextui-org/react'
import { Link } from 'react-router-dom'

export default function ManageProductsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentSize, setCurrentSize] = useState(20)
  const { data, isLoading } = useSWR(
    [currentPage, currentSize, 'api/products'],
    ([page, size]) => {
      return ProductService.getProducts(page, size).then((res) => res.content)
    }
  )

  return (
    <div className='pb-14'>
      <div className='z-0 main-padding overflow-hidden relative min-h-20 flex items-center justify-between border-b-1 border-rose-950/80 flex-[0_0_auto] bg-gradient-to-r from-rose-800/10 via-rose-950/10 to-indigo-950/10'>
        <h1 className='text-foreground-strong border-divider text-lg md:text-xl'>
          Manage Products
        </h1>
      </div>
      <div className='main-padding !pt-5'>
        <div className='flex'>
          <Button
            as={Link}
            to='/manage/product'
            size='sm'
            radius='full'
            color='primary'
            variant='shadow'
          >
            + Add Product
          </Button>
        </div>
        <ProductsList
          data={data}
          isLoading={isLoading}
          onPageChange={setCurrentPage}
          onSizeChange={setCurrentSize}
        />
      </div>
    </div>
  )
}
