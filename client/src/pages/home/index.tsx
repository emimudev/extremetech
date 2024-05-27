import Hero from '@/components/hero'
import Glow from '@/components/glow'
import FeaturedProducts from '@/components/featured-products'
import BestOffersProducts from '@/components/best-offers-products'

export default function HomePage() {
  return (
    /** overflow-hidden */
    <div className='flex flex-col relative z-0 -mt-[var(--navbar-height)] pt-[var(--navbar-height)]'>
      <Hero />
      <section className='mt-24 md:mt-40  relative z-0 flex flex-col'>
        <Glow className='max-w-[40rem] absolute top-0 left-1/2 -translate-y-[35%] -translate-x-1/2 -z-10 select-none pointer-events-none dark:text-rose-500/80 min-w-96' />
        <h2 className='text-lg xs:text-xl sm:text-3xl text-center '>
          <span className='text-foreground-strong'>Featured </span>
          <span className='font-bold dark:text-rose-400'>Products</span>
        </h2>
        <div className='mt-12 mb-12 p-[0_4%] relative overflow-x-hidden'>
          <FeaturedProducts />
        </div>
      </section>
      <section className='mt-20 md:mt-28  relative z-0 flex flex-col'>
        <Glow
          opacity={'0.26'}
          className='max-w-[40rem] absolute top-0 left-1/2 -translate-y-[35%] -translate-x-1/2 -z-10 select-none pointer-events-none dark:text-rose-500/80 min-w-96'
        />
        <h2 className='text-lg xs:text-xl sm:text-3xl text-center '>
          <span className='text-foreground-strong'>Best </span>
          <span className='font-bold dark:text-rose-400'>Offers</span>
        </h2>
        <div className='mt-12 mb-36 p-[0_4%] relative overflow-x-hidden'>
          <BestOffersProducts />
        </div>
      </section>
    </div>
  )
}
