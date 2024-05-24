import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselOptions,
  CarouselPrevious
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

export interface CarouselFluidProps {
  children: React.ReactNode
  className?: string
  classNames?: {
    content?: string
    next?: string
    nextIcon?: string
    previous?: string
    previousIcon?: string
  }
  opts?: CarouselOptions
}

export default function CarouselFluid({
  children,
  className,
  classNames = {},
  opts
}: CarouselFluidProps) {
  const _opts = opts ?? {
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 375px)': { slidesToScroll: 2 },
      '(min-width: 768px)': { slidesToScroll: 3 },
      '(min-width: 1024px)': { slidesToScroll: 5 }
    }
  }
  return (
    <Carousel
      className={cn('overflow-visible static group', className)}
      opts={_opts}
    >
      <CarouselContent
        className='overflow-visible'
        innerClassName={cn('ml-0', classNames.content)}
      >
        {children}
      </CarouselContent>
      <CarouselPrevious
        className={cn(
          'z-50 w-[calc(4%_-_0.2vw)] left-0 h-full bg-black/50 backdrop-blur-[1px] rounded-none rounded-tr-xl rounded-br-xl border-none disabled:opacity-0 group-hover:[&:not(:disabled)]:opacity-100 transition-opacity group-hover:[&:not(:disabled)_svg]:opacity-100 hover:bg-black/70 [&:hover_svg]:scale-[1.25] [&:hover_svg]:text-foreground hidden md:flex',
          classNames.previous
        )}
        classNames={{
          icon: cn(
            'opacity-0 dark:text-neutral-400  transition-opacity w-[2.5vw] h-[2.5vw]',
            classNames.previousIcon
          )
        }}
      />
      <CarouselNext
        className={cn(
          'z-50 w-[calc(4%_-_0.3vw)] right-0 h-full bg-black/50 backdrop-blur-[1px] rounded-none rounded-tl-xl rounded-bl-xl border-none disabled:opacity-0 group-hover:[&:not(:disabled)]:opacity-100 transition-opacity group-hover:[&:not(:disabled)_svg]:opacity-100 hover:bg-black/70 [&:hover_svg]:scale-[1.2] [&:hover_svg]:text-foreground hidden md:flex',
          classNames.next
        )}
        classNames={{
          icon: cn(
            'opacity-0 dark:text-neutral-400 transition-opacity w-[2.5vw] h-[2.5vw]',
            classNames.nextIcon
          )
        }}
      />
    </Carousel>
  )
}
