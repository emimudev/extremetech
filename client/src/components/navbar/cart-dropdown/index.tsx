import { Button, Divider } from '@nextui-org/react'
import { ShoppingCartIcon, TrashIcon } from 'lucide-react'
import { useCart } from '@/hooks/v2/use-cart'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'
import { Link as RouterLink } from 'react-router-dom'
import { ScrollArea } from '@/components/ui/scroll-area'

export function CartDropdown() {
  const { totalItems, cart, removeItem, totalPrice } = useCart()

  return (
    <HoverCard openDelay={100} closeDelay={250}>
      <HoverCardTrigger asChild>
        <Button
          as={RouterLink}
          size='sm'
          variant='light'
          radius='full'
          to={'/cart'}
          className='text-sm text-foreground hover:text-foreground-strong items-center'
          startContent={<ShoppingCartIcon width={16} />}
        >
          <div className='flex items-center gap-2 leading-none'>
            Cart
            {totalItems > 0 && (
              <span className='w-5 h-5 text-xs flex items-center justify-center leading-none bg-primary/40  rounded-full'>
                {totalItems}
              </span>
            )}
          </div>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent
        side='bottom'
        sideOffset={10}
        alignOffset={100}
        collisionPadding={10}
        className='bg-content1 min-w-[340px] rounded-2xl flex flex-col max-h-[320px] overflow-hidden p-0'
      >
        {/* eslint-disable-next-line */}
        {cart.items.length > 0 ? (
          <>
            <ScrollArea className='h-[200px] flex flex-1 flex-col '>
              {cart.items.map((item) => (
                <div
                  key={item.product.id}
                  className='relative group flex items-center hover:bg-content2/60'
                >
                  <RouterLink
                    className='flex flex-1 p-2.5 px-3'
                    to={`/products/${item.product.category.code}/${item.product.code}`}
                  >
                    <div className='flex-[0_0_auto] bg-content2/60 group-hover:bg-content3/50 rounded-md p-0.5'>
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className='w-12 h-12 object-cover rounded-lg'
                      />
                    </div>
                    <div className='flex-1 flex flex-col ml-2'>
                      <span color='foreground' className='text-sm '>
                        {item.product.name}
                      </span>
                      <span className='text-sm text-foreground-muted'>
                        {item.quantity} x ${item.product.price}
                      </span>
                    </div>
                  </RouterLink>
                  <div className='flex-[0_0_auto] hidden group-hover:flex absolute right-3 top-1/2 -translate-y-1/2 '>
                    <Button
                      isIconOnly
                      variant='light'
                      size='sm'
                      onClick={() => removeItem(item)}
                      className='text-foreground-secondary hover:text-primary-600'
                    >
                      <TrashIcon className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              ))}
            </ScrollArea>
            <Divider />
            <div className='flex-[0_0_auto] flex justify-between items-center p-2.5 pb-3'>
              <Button
                as={RouterLink}
                to='/cart'
                color='primary'
                size='sm'
                variant='light'
                className='text-primary-700'
              >
                View Cart
              </Button>
              <span className='text-sm text-foreground-secondary'>
                Total: ${totalPrice.toFixed(2)}
              </span>
            </div>
          </>
        ) : (
          <div className='flex flex-col items-center justify-center p-2.5 px-3 h-[220px]'>
            <span className='text-foreground-muted text-lg mb-3'>
              Your cart is empty
            </span>
            <Button
              as={RouterLink}
              to='/products/laptop'
              tabIndex={0}
              radius='full'
              color='primary'
              variant='flat'
              className='text-primary-700'
            >
              Let's go shopping
            </Button>
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  )
}
