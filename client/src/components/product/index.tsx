import { useCart } from '@/hooks/use-cart'
import { Product as ProductType } from '@/types'
import { Button, Chip, Divider } from '@nextui-org/react'
import { LucideHeart, ShoppingCartIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import AddProductToCart from '../add-product-cart'
import { useWishList } from '@/hooks/use-wish-list'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'

export interface ProductProps {
  product: ProductType
}

export default function Product({ product }: ProductProps) {
  const { category, offer, images, price, name } = product
  const { searchProduct } = useCart()
  const { isClient } = useAuth()
  const {
    isProductInWishList: searchProductInWishList,
    addToWishList,
    removeFromWishList
  } = useWishList()
  const productInCart = searchProduct(product)

  const isProductInWishList = searchProductInWishList(product.id)

  const toggleWishListItem = (product: ProductType) => {
    if (isProductInWishList) {
      removeFromWishList(product)
    } else {
      addToWishList(product)
    }
  }

  return (
    <div className='product-item bg-white/[5%] backdrop-saturate-200 backdrop-blur-3xl flex flex-col rounded-xl border-white/[6%] border [&:hover_img]:scale-[1.02] [&:_.price]:shadow-black overflow-hidden flex-auto'>
      <Link to={`/products/${category.code}/${product.code}`}>
        <header className='flex-[0_0_auto] hover:bg-black/[40%] cursor-pointer aspect-video flex justify-center items-center relative bg-black/[60%] overflow-hidden p-4'>
          {productInCart && (
            <div className='absolute bottom-3 left-0 text-xs font-semibold dark:text-white px-3 py-0.5 rounded-tr-xl rounded-br-xl z-10 bg-gradient-to-br bg-accent'>
              <div className='flex gap-2 items-center py-0.5'>
                <ShoppingCartIcon className='w-4 h-4'></ShoppingCartIcon>
                {productInCart.quantity}
              </div>
            </div>
          )}
          {offer && (
            <div className='absolute top-0 left-1/2 -translate-x-1/2 text-xs font-semibold dark:text-white px-3 py-0.5 rounded-bl-xl rounded-br-xl z-10 bg-gradient-to-br from-rose-700 to-pink-500'>
              {offer.discount}% OFF
            </div>
          )}
          <img
            className='object-contain h-full max-w-full transition-transform rounded-xl'
            src={images?.[0] ?? ''}
            alt=''
          />
          <div className='price absolute bottom-3 right-3 text-sm border backdrop-blur-xl border-white/20 px-4 py-1.5 leading-none font-semibold bg-black/60 rounded-full shadow-lg z-10'>
            {offer && (
              <span className='line-through mr-2 text-foreground-secondary'>
                ${price}
              </span>
            )}
            <span className='text-foreground-strong'>
              ${price ? (price * (1 - (offer?.discount || 0) / 100)).toFixed(2) : 0}
            </span>
          </div>
        </header>
      </Link>
      <div className='flex flex-col flex-auto'>
        <div className='flex flex-col px-4 py-3 text-sm flex-auto'>
          <div className='flex gap-1.5'>
            <h2 className='flex-1 line-clamp-2 text-sm min-h-10'>{name}</h2>
            <Chip
              size='sm'
              color='secondary'
              variant='flat'
              className='px-1 py-[2px] h-fit bg-neutral-500/20 leading-none'
              classNames={{
                content: 'text-xs text-white leading-none font-normal'
              }}
            >
              {category.name}
            </Chip>
            <Chip
              size='sm'
              color='secondary'
              variant='flat'
              className='px-1 py-[2px] h-fit bg-neutral-500/20 leading-none'
              classNames={{
                content: 'text-xs text-white leading-none font-normal'
              }}
            >
              {product.brand.name}
            </Chip>
          </div>
        </div>
        <Divider />
        {isClient && (
          <div className='flex items-center gap-2 px-4 py-3 flex-[0_0_auto]'>
            <AddProductToCart
              type='submit'
              size='sm'
              radius='sm'
              variant='flat'
              product={product as ProductType}
              fullWidth
              className='dark:bg-[#71717A]/25 text-sm'
            >
              Add to Cart
            </AddProductToCart>
            <div className='flex items-center gap-1.5'>
              <Button
                type='submit'
                size='sm'
                radius='sm'
                isIconOnly
                variant='flat'
                className='dark:bg-[#71717A]/40 p-1.5 text-sm'
                aria-label='Add to wishlist'
                onClick={() => toggleWishListItem(product)}
              >
                <LucideHeart
                  fill={isProductInWishList ? 'currentColor' : 'transparent'}
                  className={cn(isProductInWishList && 'text-primary-500')}
                />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
