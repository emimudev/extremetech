import { memo } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import { carouselBrands } from './carousel-brands'
import { carouselCategories } from './carousel-categories'
import heroGlows from '@/assets/hero-glows-2.svg'
import CarouselItem from './carousel-item'
import MaskShadow from '../mask-shadow'

function HeroComponent() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    AutoScroll({
      playOnInit: true,
      stopOnInteraction: false,
      startDelay: 0,
      delay: 0,
      speed: 0.7,
      stopOnFocusIn: false
    })
  ])
  const [emblaRef2] = useEmblaCarousel({ loop: true }, [
    AutoScroll({
      playOnInit: true,
      stopOnInteraction: false,
      startDelay: 0,
      delay: 0,
      speed: 1,
      direction: 'backward',
      stopOnFocusIn: false
    })
  ])

  return (
    <section className='relative z-0 mt-8 md:mt-20 overflow-y-visible text-foreground-strong'>
      <h1 className='z-0 relative text-center px-4 leading-snug'>
        <span className='relative [font-size:_clamp(1rem,5vw,2.7rem)] '>
          Live on the <span className='font-semibold'>edge</span> of technology
          with
        </span>
        <br />
        <span className='relative z-0 [font-size:_clamp(1.5rem,7vw,3.75rem)] font-bold tracking-tight '>
          extreme
          <span className='text-primary underline-offset-8'>tech</span>
        </span>
        <div className=''></div>
      </h1>
      <div className='object-cover min-w-[53rem] absolute w-full flex justify-center  left-1/2 -translate-x-1/2 top-0 -z-[1] lg:max-w-[100rem] -translate-y-[30%] lg:-translate-y-[35%] select-none pointer-events-none'>
        <img
          draggable='false'
          aria-hidden='true'
          src={heroGlows}
          alt=''
          width='100%'
          height='100%'
          className='h-full pointer-events-none'
        />
      </div>

      <div className='relative z-0 mt-10'>
        <MaskShadow
          className='scroll-shadow-size-[6rem] xs:scroll-shadow-size-[12rem] md:scroll-shadow-size-[20rem]'
          ref={emblaRef}
        >
          <div className='flex py-1'>
            {carouselBrands.map(({ Logo }, i) => (
              <CarouselItem
                key={i}
                innerClassName='py-3 px-3 md:px-[1.25rem] lg:px-5'
                className='h-10 md:h-14 px-1 md:px-1.5  basis-[33.33333%] sm:basis-[25%] md:basis-[20%] lg:basis-[14.2857142857%] '
              >
                <Logo className='object-contain h-full w-full max-w-[90px]' />
              </CarouselItem>
            ))}
          </div>
        </MaskShadow>
        <MaskShadow
          ref={emblaRef2}
          className='mt-1 scroll-shadow-size-[6rem] xs:scroll-shadow-size-[12rem] md:scroll-shadow-size-[20rem]'
        >
          <div ref={emblaRef2} className='flex py-1'>
            {carouselCategories.map((category, i) => (
              <CarouselItem
                innerClassName='p-3 md:p-[1.25rem] '
                key={i}
                className='h-10 px-1 md:px-1.5 basis-[33.33333%] sm:basis-[25%] md:basis-[20%] lg:basis-[10%] '
              >
                {category}
              </CarouselItem>
            ))}
          </div>
        </MaskShadow>
      </div>
    </section>
  )
}

const Hero = memo(HeroComponent)

export default Hero
