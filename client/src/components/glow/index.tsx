import type { ComponentPropsWithoutRef } from 'react'

export interface GlowProps extends ComponentPropsWithoutRef<'svg'> {
  glowColor?: string
}

export default function Glow({ opacity = '0.16', glowColor = 'currentColor', ...props }: GlowProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 1070 850'
      fill='none'
      {...props}
    >
      <g filter='url(#filter0_f_71_105)'>
        <rect
          x='300'
          y='300'
          width='470'
          height='250'
          fill={glowColor}
          fillOpacity={opacity}
        />
      </g>
      <defs>
        <filter
          id='filter0_f_71_105'
          x='0'
          y='0'
          width='1070'
          height='850'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='BackgroundImageFix'
            result='shape'
          />
          <feGaussianBlur
            stdDeviation='150'
            result='effect1_foregroundBlur_71_105'
          />
        </filter>
      </defs>
    </svg>
  )
}
