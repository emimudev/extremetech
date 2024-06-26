import ProductsFilters from '@/components/products-filters'
import ProductsList from '@/components/products-list'
import { findLocalCategoryByCode } from '@/data/categories'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import { Link, Navigate, useParams } from 'react-router-dom'

export default function ProductsPage() {
  const params = useParams()
  const categoryCode = params.categoryCode
  const currentCategory = findLocalCategoryByCode(categoryCode)

  if (!currentCategory || !categoryCode) {
    return <Navigate to='/' />
  }

  return (
    <div className='min-h-[calc(100vh-var(--navbar-height))]'>
      <div className='h-8 flex flex-[0_0_auto] items-center main-padding bg-content1 sm:sticky top-[var(--navbar-height)] z-10 border-b-2'>
        <Breadcrumbs className='flex items-center'>
          <BreadcrumbItem as='li'>
            <Link
              to='/'
              className='text-foreground-strong/50 text-xs hover:text-foreground-strong transition-colors rounded-lg'
            >
              Home
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem
            classNames={{
              item: 'text-rose-200 text-xs select-auto pointer-events-auto cursor-text !select-auto'
            }}
          >
            {currentCategory.name}
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className='z-0 main-padding overflow-hidden relative min-h-24 flex flex-col justify-center border-b-1 border-rose-950/80 flex-[0_0_auto] bg-gradient-to-r from-rose-800/10 via-rose-950/10 to-indigo-950/10'>
        <h1 className='text-foreground-strong border-divider text-lg md:text-xl'>
          Showing {currentCategory.name}
        </h1>
      </div>
      <div className='relative z-0 main-padding grid grid-cols-12 gap-0 lg:gap-14'>
        <ProductsFilters categoryCode={categoryCode} />
        <div className='relative z-0 col-span-full lg:col-span-9 md:mb-8 overflow-hidden py-8'>
          <ProductsList categoryCode={categoryCode} />
        </div>
      </div>
    </div>
  )
}
