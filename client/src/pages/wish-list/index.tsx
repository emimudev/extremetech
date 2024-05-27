// import Product from '@/components/product'
import { DelayedRender } from '@/components/delayed-render'
import Product from '@/components/product'
import { Skeleton } from '@/components/ui/skeleton'
import { useWishList } from '@/hooks/use-wish-list'

export default function WishListPage() {
  const { data, isLoading } = useWishList()

  return (
    <div className='flex flex-col pb-16'>
      <h1 className='text-xl mb-8'>My Favorites</h1>
      {!isLoading && data && data.items.length === 0 && (
        <div className='text-center w-full text-foreground-secondary'>
          You haven't added any products to your wish list yet.
        </div>
      )}
      <ul className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]'>
        {!isLoading &&
          data &&
          data.items.map((item) => <Product product={item} />)}
        {isLoading && !data && (
          <DelayedRender>
            {new Array(10).fill(null).map((_, index) => (
              <Skeleton key={index} className='rounded-2xl w-full h-40' />
            ))}
          </DelayedRender>
        )}
      </ul>
    </div>
  )
}
