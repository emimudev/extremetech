import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      toastOptions={{
        classNames: {
          success: 'group toast group-[.toaster]:bg-emerald-900/70 group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          error: 'group toast group-[.toaster]:bg-rose-900/70 group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          toast:
            'group toast group-[.toaster]:bg-content2 group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground'
        }
      }}
      {...props}
    />
  )
}

export { Toaster }
