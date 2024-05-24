import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'

export type MaskShadowProps = {
  placement?: 'left' | 'right' | 'left-right' | null
} & ComponentPropsWithoutRef<'div'>

function MaskShadowComponent(
  { children, placement = 'left-right', className, ...rest }: MaskShadowProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const restProps = {
    ...rest,
    [`data-${placement}-scroll`]: true
  }
  return (
    <div
      ref={ref}
      className={cn(
        'scroll-shadow-size-[2rem] overflow-hidden data-[left-scroll=true]:[mask-image:linear-gradient(270deg,#000_calc(100%_-_var(--scroll-shadow-size)),transparent)] data-[right-scroll=true]:[mask-image:linear-gradient(90deg,#000_calc(100%_-_var(--scroll-shadow-size)),transparent)] data-[left-right-scroll=true]:[mask-image:linear-gradient(to_right,#000,#000,transparent_0,#000_var(--scroll-shadow-size),#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]',
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  )
}

const MaskShadow = forwardRef(MaskShadowComponent)
export default MaskShadow
