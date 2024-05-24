import { cn } from '@/lib/utils'
import type { HTMLAttributes, ReactNode } from 'react'

export interface CarouselItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  rootClassName?: string
  innerClassName?: string
}

export default function CarouselItem({
  children,
  className,
  rootClassName,
  innerClassName,
  ...rest
}: CarouselItemProps) {
  const _rootClassName = cn(className, rootClassName)
  return (
    <div
      className={cn(
        'flex-grow-0 flex-shrink-0 basis-[25%] min-w-0 px-2',
        _rootClassName
      )}
      {...rest}
    >
      <div
        className={cn(
          'bg-white/[5%] backdrop-saturate-200 backdrop-blur-3xl w-full h-full rounded-lg border-white/[6%] border flex items-center justify-center px-1 py-1 text-foreground-600 hover:text-rose-300 transition-colors',
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  )
}
