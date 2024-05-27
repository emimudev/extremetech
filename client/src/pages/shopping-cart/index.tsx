import { useJoinModal } from '@/atoms'
import { useAuth } from '@/hooks/use-auth'
import { useCart } from '@/hooks/use-cart'
import { BreadcrumbItem, Breadcrumbs, Button, Divider } from '@nextui-org/react'
import { ShoppingCart, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ShoppingCartPage() {
  const { isAuthenticated } = useAuth()
  const { openModal } = useJoinModal()
  const { cart, cleanCart, addItem, removeItem } = useCart()
  const { items } = cart

  return (
    <div className='min-h-[calc(100vh-var(--navbar-height))] flex flex-col'>
      <div className='flex flex-[0_0_auto] items-center main-padding bg-content1 sm:sticky top-[var(--navbar-height)] z-10 border-b-2'>
        <Breadcrumbs className='flex items-center py-2'>
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
            Shopping Cart
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className='z-0 main-padding overflow-hidden relative min-h-24 flex flex-col justify-center border-b-1 border-rose-950/80 flex-[0_0_auto] bg-gradient-to-r from-indigo-800/10 via-rose-950/10 to-rose-950/10'>
        <h1 className='text-foreground-strong border-divider text-lg md:text-xl'>
          Shopping Cart
        </h1>
      </div>
      <div className='md:main-padding grid grid-cols-12 mt-8 gap-8'>
        {items.length > 0 && (
          <div className='col-span-12 lg:col-span-8 h-fit lg:mb-10'>
            <ul className='flex flex-col gap-4 border-accent/30 '>
              {items.map((item) => (
                <li
                  key={item.id}
                  className='bg-accent/20  flex gap-2 rounded-xl md:rounded-2xl items-center justify-between border-accent main-padding !py-3 md:py-3 md:px-4 max-h-[160px]'
                >
                  <div className='flex flex-1 gap-4 h-full'>
                    <div className='flex-[0_0_80px] h-fit md:flex-[0_0_120px] flex p-2 items-center bg-accent/40 rounded-xl overflow-hidden'>
                      <Link
                        className='w-auto'
                        to={`/products/${item.product.category.code}/${item.product.code}`}
                      >
                        <img
                          className='w-full h-full object-cover'
                          src={item.product.images?.[0]}
                          alt={item.product.name}
                        />
                      </Link>
                    </div>
                    <div className='flex-1 py-1 flex flex-col'>
                      <h2 className='flex-[0_0_auto] text-foreground-strong text-sm md:text-base'>
                        <Link
                          to={`/products/${item.product.category.code}/${item.product.code}`}
                          className='hover:underline'
                        >
                          {item.product.name}
                        </Link>
                      </h2>
                      <div className='text-xs text-foreground-secondary mt-1 mb-3'>
                        <div className='line-clamp-2'>
                          {Object.values(item.product.features || {})
                            .map((feature) => feature)
                            .join(' / ')}
                        </div>
                      </div>
                      <p className='text-foreground flex-[0_0_auto] text-sm flex items-center gap-2 mb-2'>
                        <span className='text-foreground-strong'>Price:</span> $
                        {item.product.price}
                      </p>
                      <div className='flex items-center justify-between'>
                        <div className='bg-accent flex gap-4 px-3  items-center rounded-full'>
                          <button
                            onClick={() => removeItem(item)}
                            className='text-foreground-strong text-lg'
                          >
                            -
                          </button>
                          <span className='text-foreground-strong text-base'>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => addItem({ ...item, quantity: 1 })}
                            className='text-foreground-strong text-lg'
                          >
                            +
                          </button>
                        </div>
                        <Button
                          isIconOnly
                          size='sm'
                          onClick={() => removeItem(item)}
                          startContent={
                            <Trash2Icon className='w-4 h-4'></Trash2Icon>
                          }
                          className='hover:bg-red-900'
                        />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {items.length === 0 && (
          <div className='col-span-12 lg:col-span-8 h-fit lg:mb-10'>
            <div className='main-padding flex flex-col my-10 items-center justify-center relative text-center'>
              <div className='max-w-[6vw] w-full min-w-[4rem] text-foreground-muted/70'>
                <ShoppingCart className='w-full h-full' />
              </div>
              <div className='text-foreground text-lg lg:text-2xl w-full text-center mt-6'>
                You have not added anything to your cart
              </div>
              <div className='mt-3 text-foreground-muted'>
                We have a wide variety of products, surely you will find what
                you are looking for.
              </div>
              <Button
                as={Link}
                to={'/products/laptop'}
                size='lg'
                radius='full'
                className='bg-primary/70 mt-6'
              >
                Let's go shopping
              </Button>
            </div>
          </div>
        )}
        <div className='col-span-12 lg:col-span-4 h-fit border-1 border-accent/20 bg-accent/20 rounded-xl md:rounded-2xl main-padding !py-6 md:!py-3 md:px-4 flex flex-col mb-10'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg lg:text-xl'>Cart Summary</h2>
            {cart.items.length > 0 && (
              <Button size='sm' variant='light' onClick={cleanCart}>
                Clear cart
              </Button>
            )}
          </div>
          <Divider className='mt-4 mb-4'></Divider>
          {cart.items.length > 0 && (
            <ul className='flex flex-col'>
              {items.map(({ product, quantity, id }) => (
                <li
                  key={id}
                  className='flex items-center truncate overflow-hidden justify-between pb-4 flex-wrap'
                >
                  <div className='flex items-center gap-2 flex-1 truncate flex-wrap min-w-[320px]'>
                    <span className='text-sm md:text-base truncate line-clamp-1 '>
                      {product.name}{' '}
                    </span>
                    <span className='flex-[0_0_auto] text-foreground-strong px-3 mr-2 text-xs bg-blue-500/40 rounded-full'>
                      {quantity}
                    </span>
                  </div>
                  <span className='flex-[0_0_auto] '>
                    ${product.price * quantity}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {items.length === 0 && (
            <div className='text-foreground-muted mb-3'>
              There is nothing to summarize as the shopping cart is empty.
            </div>
          )}
          <div className='flex gap-2 text-foreground-strong'>
            Total:
            <span className='text-foreground-muted'>
              $
              {items.reduce(
                (acc, { product, quantity }) => acc + product.price * quantity,
                0
              )}
            </span>
          </div>
          <Divider className='my-4'></Divider>
          {isAuthenticated && (
            <Button
              as={Link}
              disabled={!isAuthenticated}
              to={'/checkout'}
              color='primary'
              className='text-foreground-strong font-semibold bg-primary/70'
            >
              Go to Checkout
            </Button>
          )}
          {!isAuthenticated && (
            <Button
              isDisabled={cart.items.length === 0}
              onClick={openModal}
              color='primary'
              className='text-foreground-strong font-semibold bg-primary/70'
            >
              Go to Checkout
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
