import { nextui } from '@nextui-org/react'
import plugin from 'tailwindcss/plugin'
import { screens } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  prefix: '',
  theme: {
    scrollShadowSize: {
      sm: '5rem',
      md: '8rem',
      lg: '12rem',
      xl: '16rem'
    },
    screens: {
      xs: '375px',
      ...screens
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '0'
        // DEFAULT: '0.75rem',
        // lg: '1.5rem'
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px'
      }
    },
    extend: {
      fontSize: {
        'hero-title': 'clamp(2rem, 10vw, 4rem)'
      },
      colors: {
        border: 'hsl(var(--shadcn-border))',
        input: 'hsl(var(--shadcn-input))',
        ring: 'hsl(var(--shadcn-ring))',
        background: 'hsl(var(--shadcn-background))',
        foreground: 'hsl(var(--shadcn-foreground))',
        'foreground-strong': 'hsl(var(--shadcn-foreground-strong))',
        'foreground-secondary': 'hsl(var(--shadcn-foreground-secondary))',
        'foreground-muted': 'hsl(var(--shadcn-foreground-muted))',
        'primary-cn': {
          DEFAULT: 'hsl(var(--shadcn-primary))',
          foreground: 'hsl(var(--shadcn-primary-foreground))'
        },
        'secondary-cn': {
          DEFAULT: 'hsl(var(--shadcn-secondary))',
          foreground: 'hsl(var(--shadcn-secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--shadcn-destructive))',
          foreground: 'hsl(var(--shadcn-destructive-foreground))'
        },
        'muted-cn': {
          DEFAULT: 'hsl(var(--shadcn-muted))',
          foreground: 'hsl(var(--shadcn-muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--shadcn-accent))',
          foreground: 'hsl(var(--shadcn-accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--shadcn-popover))',
          foreground: 'hsl(var(--shadcn-popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--shadcn-card))',
          foreground: 'hsl(var(--shadcn-card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--shadcn-radius)',
        md: 'calc(var(--shadcn-radius) - 2px)',
        sm: 'calc(var(--shadcn-radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'navigation-menu-scaleIn': {
          from: { transform: 'rotateX(-30deg) scale(0.9)', opacity: 0 },
          to: { transform: 'rotate(0deg) scale(1)', opacity: 1 }
        },
        'navigation-menu-scaleOut': {
          from: { transform: 'rotate(0deg) scale(1)', opacity: 1 },
          to: { transform: 'rotateX(-10deg) scale(0.95)', opacity: 0 }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'navigation-menu-scaleIn': 'navigation-menu-scaleIn 0.2s ease',
        'navigation-menu-scaleOut': 'navigation-menu-scaleOut 0.2s ease'
      }
    }
  },
  plugins: [
    require('tailwindcss-animate'),
    nextui({
      themes: {
        light: {
          extend: 'light',
          colors: {
            focus: 'hsl(var(--shadcn-primary))',
            primary: {
              50: '#fdf2f7',
              100: '#fce7f1',
              200: '#fad0e3',
              300: '#f8a9cb',
              400: '#f274a8',
              500: '#ea4c89',
              600: '#d92964',
              700: '#bc1a4c',
              800: '#9b193f',
              900: '#821938',
              950: '#4f081c',
              DEFAULT: '#db2470',
              foreground: 'white'
            },
            danger: {
              50: '#fdf2f8',
              100: '#fce7f3',
              200: '#fbcfe8',
              300: '#f9a8d4',
              400: '#f472b6',
              500: '#ec4899',
              600: '#db2777', // general foreground
              700: '#be185d',
              800: '#9d174d',
              900: '#831843',
              950: '#500724',
              DEFAULT: '#be185d',
              foreground: 'white'
            }
          }
        },
        dark: {
          extend: 'dark',
          colors: {
            focus: '#d92964',
            primary: {
              50: '#4f081c',
              100: '#821938',
              200: '#9b193f',
              300: '#bc1a4c',
              400: '#d92964',
              500: '#ea4c89',
              600: '#f274a8',
              700: '#f8a9cb',
              800: '#fad0e3',
              900: '#fce7f1',
              950: '#fdf2f7',
              DEFAULT: '#d92964',
              foreground: 'white'
            },
            danger: {
              50: '#500724',
              100: '#831843',
              200: '#9d174d',
              300: '#be185d',
              400: '#db2777',
              500: '#ec4899',
              600: '#f472b6',
              700: '#f9a8d4',
              800: '#fbcfe8',
              900: '#fce7f3',
              950: '#fdf2f8',
              DEFAULT: '#be185d',
              foreground: 'white'
            }
          }
        }
      }
    }),
    plugin(({ matchUtilities, addUtilities }) => {
      addUtilities({
        '.scroll-shadow-size': {
          '--scroll-shadow-size': '8rem'
        },
        '.main-padding': {
          padding: '0 4%'
        },
        '.smart-padding': {
          padding: '0 0.75rem',
          '@screen md': {
            padding: '0 1.5rem'
          }
        }
      })
      matchUtilities({
        perspective: (value) => ({
          perspective: value
        }),
        'scroll-shadow-size': (value) => ({
          '--scroll-shadow-size': value
        })
      })
    })
  ]
}
