import { CarouselItem } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

export interface CarouselFluidItemProps {
  children: React.ReactNode
  className?: string
}

export default function CarouselFluidItem({
  children,
  className
}: CarouselFluidItemProps) {
  return (
    <CarouselItem
      className={cn(
        'basis-[calc(100%-1vw)] flex flex-col xs:basis-[calc(50%-0.3vw)] md:basis-[33.333%] lg:basis-[20%] px-[0.3vw] ',
        className
      )}
    >
      {children}
    </CarouselItem>
  )
}
