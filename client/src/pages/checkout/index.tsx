import { CheckoutForm } from '@/components/checkout-form'
import { useAuth } from '@/hooks/use-auth'
import { useCart } from '@/hooks/use-cart'
import { BreadcrumbItem, Breadcrumbs, Button, Divider } from '@nextui-org/react'
import { ShoppingCart } from 'lucide-react'
import { Link, Navigate } from 'react-router-dom'

export default function CheckoutPage() {
  const { isAuthenticated } = useAuth()
  const { cart } = useCart()

  if (!isAuthenticated) {
    return <Navigate to='/' />
  }

  if (!cart.items.length) {
    return <Navigate to='/' />
  }

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
          <BreadcrumbItem as='li'>
            <Link
              to='/cart'
              className='text-foreground-strong/50 text-xs hover:text-foreground-strong transition-colors rounded-lg'
            >
              Shopping Cart
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem
            classNames={{
              item: 'text-rose-200 text-xs select-auto pointer-events-auto cursor-text !select-auto'
            }}
          >
            Checkout
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className='z-0 main-padding overflow-hidden relative min-h-24 flex flex-col justify-center border-b-1 border-rose-950/80 flex-[0_0_auto] bg-gradient-to-r from-indigo-800/10 via-rose-950/10 to-rose-950/10'>
        <h1 className='text-foreground-strong border-divider text-lg md:text-xl'>
          Checkout
        </h1>
      </div>
      {items.length > 0 && (
        <div className='md:main-padding grid grid-cols-12 mt-8 mb-10 gap-4'>
          <div className='relative overflow-hidden z-0 col-span-12 lg:col-span-7 h-fit border-1 border-accent/20 bg-accent/20 rounded-xl md:rounded-2xl main-padding !py-6 md:px-6 flex flex-col lg:mb-10'>
            <h2 className='text-lg lg:text-2xl relative z-0'>
              Payment Details
            </h2>
            <p className='text-sm mt-2 text-foreground-secondary relative z-0'>
              Enter your payment details below to purchase
            </p>
            <Divider className='mt-2 mb-4' />
            <CheckoutForm />
          </div>
          <div className='sticky top-[calc(var(--navbar-height))] col-span-12 lg:col-span-5 h-fit lg:mb-10'>
            <h2 className='mb-4 text-lg lg:text-2xl'>Products</h2>
            <ul className='flex flex-col gap-4 border-accent/30 '>
              {items.map(({ product, quantity, id }) => (
                <li
                  key={id}
                  className='bg-accent/20  flex gap-2 rounded-xl md:rounded-2xl aspect-video items-center justify-between border-accent main-padding !py-3 md:py-3 md:px-6 max-h-[120px] overflow-hidden'
                >
                  <div className='flex flex-1 gap-4 h-full'>
                    <div className='flex p-2 max-h-[80px] md:max-h-full items-center bg-accent/40 rounded-xl overflow-hidden'>
                      <Link
                        className='aspect-square w-full h-full'
                        to={`/products/${product.category}/${product.id}`}
                      >
                        <img
                          className='w-full h-full object-cover'
                          src={product.images?.[0]}
                          alt={product.name}
                        />
                      </Link>
                    </div>
                    <div className='flex-1 py-1 flex flex-col'>
                      <h2 className='flex-[0_0_auto] flex items-center gap-3 text-foreground-strong text-sm md:text-base'>
                        <Link
                          to={`/products/${product.category}/${product.id}`}
                          className='hover:underline'
                        >
                          {product.name}
                        </Link>
                        <span className='flex-[0_0_auto] text-foreground-strong px-3 mr-2 text-xs bg-blue-500/40 rounded-full'>
                          {quantity}
                        </span>
                      </h2>
                      <div className='text-xs text-foreground-secondary mt-1 mb-3'>
                        <div className='line-clamp-2'>
                          {Object.values(product.features || {})
                            .map((feature) => feature)
                            .join(' / ')}
                        </div>
                      </div>
                      <p className='text-foreground flex-[0_0_auto] text-sm flex items-center gap-2 mb-2'>
                        <span className='text-foreground-strong'>Price:</span> $
                        {product.price}
                      </p>
                      <div className='flex items-center justify-between'></div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {items.length === 0 && (
        <div className='main-padding flex flex-col my-10 items-center justify-center relative text-center'>
          <div className='max-w-[8vw] w-full min-w-[4rem] text-foreground-muted'>
            <ShoppingCart className='w-full h-full' />
          </div>
          <div className='text-foreground text-lg lg:text-3xl w-full text-center mt-6'>
            Your cart seems to be empty
          </div>
          <Button
            as={Link}
            to={'/products'}
            size='lg'
            radius='full'
            className='bg-primary/70 mt-6'
          >
            Go back to the store
          </Button>
        </div>
      )}
    </div>
  )
}
