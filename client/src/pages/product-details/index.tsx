import AddProductToCart from '@/components/add-product-cart'
import { CartShippingIcon } from '@/components/icons'
import ProductThumbnails from '@/components/product-thumbnails'
import { RelatedProducts } from '@/components/related-products'
import { findLocalCategoryByCode } from '@/data/categories'
import { ProductService } from '@/services/product-service'
import { BreadcrumbItem, Breadcrumbs, Divider } from '@nextui-org/react'
import { ShoppingCartIcon } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import useSWR from 'swr'

export default function ProductDetails() {
  const params = useParams()
  const categoryCode = params.categoryCode
  const productCode = params.productCode
  const currentCategory = findLocalCategoryByCode(categoryCode)

  const { data, isLoading } = useSWR(
    () => {
      if (!productCode) {
        return null
      }
      return [productCode, 'api/v1/products']
    },
    ([code]) => ProductService.findByCode(code).then((res) => res.content)
  )

  if (!currentCategory || !categoryCode || !productCode) {
    return <Navigate to='/' />
  }

  if (!data && isLoading) {
    return null
  }

  if (!data && !isLoading) {
    return <Navigate to='/' />
  }

  const currentProduct = data!
  const { offer } = currentProduct

  return (
    <div className='min-h-[calc(100vh-var(--navbar-height))] mb-14'>
      <div className='h-8 flex flex-[0_0_auto] items-center main-padding bg-content1 sm:sticky top-[var(--navbar-height)] z-10 border-b-2'>
        <Breadcrumbs className='flex items-center py-2'>
          <BreadcrumbItem as='div'>
            <Link
              to='/'
              className='text-foreground-strong/50 text-xs hover:text-foreground-strong transition-colors rounded-lg'
            >
              Home
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem as='div'>
            <Link
              to={`/products/${currentCategory.code}`}
              className='text-foreground-strong/50 text-xs hover:text-foreground-strong transition-colors rounded-lg'
            >
              {currentCategory.name}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem
            className='overflow-hidden'
            classNames={{
              item: 'text-rose-200 text-xs select-auto pointer-events-auto cursor-text !select-auto w-[30vw] truncate block'
            }}
          >
            {currentProduct?.name}
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className='overflow-x-hidden'>
        <div className='main-padding grid grid-cols-1 lg:grid-cols-7 gap-x-3 lg:gap-8 xs:mt-6'>
          <div className='h-full w-full lg:col-span-4 relative'>
            <ProductThumbnails images={currentProduct?.images} />
            {offer && (
              <span className='z-0 absolute top-4 left-4 text-sm font-semibold dark:text-white px-3 py-0.5 rounded-full  bg-gradient-to-br from-indigo-700/60 to-rose-500/60 shadow-lg'>
                {offer.discount}% OFF
              </span>
            )}
          </div>
          <div className='h-full w-full flex flex-col gap-4 lg:col-span-3'>
            <Divider className='mt-4 mb-4 lg:hidden'></Divider>
            <div className='py-6 px-5 bg-content1/80 rounded-3xl'>
              <h1 className='line-clamp-2 min-h-8 text-2xl sm:text-4xl lg:text-3xl text-foreground'>
                {currentProduct?.name}
              </h1>
              <div className='flex items-baseline justify-between mt-1'>
                <div className='flex gap-1 items-center'>
                  {/* {breadcrumbTree.map((category, key) => (
                    <Chip
                      key={key}
                      className='text-xs bg-blue-900/30'
                      classNames={{
                        content: 'font-semibold  text-blue-200'
                      }}
                      size='sm'
                    >
                      {category.name}
                    </Chip>
                  ))} */}
                </div>
                <span className='flex items-center text-lg lg:text-xl text-foreground-strong min-h-7 mt-2'>
                  {offer && (
                    <span className='line-through mr-2 text-foreground-secondary text-sm'>
                      ${currentProduct?.price}
                    </span>
                  )}
                  <span className='text-foreground-strong'>
                    $
                    {currentProduct?.price
                      ? currentProduct?.price *
                        (1 - (offer?.discount || 0) / 100)
                      : 0}
                  </span>
                </span>
              </div>
            </div>
            <div className='mt-2 contents lg:flex justify-between flex-wrap gap-3 items-center text-sm text-foreground-muted'>
              <div className='flex gap-2 items-center text-foreground'>
                <span>
                  <CartShippingIcon />
                </span>
                <div>Free shipping and 30 days return</div>
              </div>
              <div className='lg:flex sticky sm:bottom-4 bottom-16 top-[calc(var(--navbar-height)+0.5rem)] sm:top-[calc(var(--navbar-height)+2.5rem)] z-[5]'>
                <AddProductToCart
                  product={currentProduct}
                  color='primary'
                  fullWidth
                  startContent={<ShoppingCartIcon className='w-5 h-5' />}
                  className='text-white lg:rounded-full min-w-[200px] backdrop-blur-3xl bg-primary/80 w-full font-semibold flex-1 shadow-md'
                >
                  Add to Cart
                </AddProductToCart>
              </div>
            </div>
            <Divider className='mt-2'></Divider>
            <h2 className='text-foreground-strong text-lg lg:text-xl lg:mb-3 lg:mt-5'>
              About this product
            </h2>
            <table className='table border-spacing-x-5 border-separate divide-y divide-divider-strong'>
              <tbody>
                {Object.entries(currentProduct?.features ?? {}).map(
                  ([key, value], index) => (
                    <tr
                      key={index}
                      className='[&]:first-of-type:pb-3 [&:not(:first-of-type)]:py-3 [&:not(:first-of-type)]:sm:py-4 [&]:first-of-type:sm:pb-4 gap-2 items-center rtl:space-x-reverse'
                    >
                      <td className='py-3 flex-0 flex-shrink-0 space-x-4 min-w-0'>
                        <div className='text-sm font-medium truncate text-foreground-strong'>
                          {key}
                        </div>
                      </td>
                      <td
                        className='py-3 items-center text-sm pr-1'
                        title={value.toString()}
                      >
                        <div className='line-clamp-3 space-x-4'>{value}</div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className='main-padding'>
          <Divider className='lg:hidden mt-4 mb-8' />
        </div>
        <div className='lg:my-6 lg:mt-9'>
          <h2 className='main-padding text-lg lg:text-2xl lg:mt-18 mb-8'>
            Related Products
          </h2>
          <div className='relative overflow-x-visible main-padding '>
            <RelatedProducts categoryCode={categoryCode} />
          </div>
        </div>
      </div>
    </div>
  )
}
