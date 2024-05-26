import {
  ComponentPropsWithoutRef,
  ElementRef,
  ReactNode,
  forwardRef
} from 'react'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
import { Link } from 'react-router-dom'
import { Divider } from '@nextui-org/react'
import Glow from '@/components/glow'
import { categoriesMenuItems } from '@/data/categories'

export function NavbarMenu() {
  return (
    <NavigationMenu className='relative'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className='relative'>
              <Glow className='absolute text-indigo-300 -top-[30%] -z-[1]' />
              <ul className='grid py-4 w-full z-0'>
                {Object.entries(categoriesMenuItems).map(([sectionTitle, menuItems], index) => {
                  return (
                    <li key={index}>
                      <div className='flex px-4 flex-col '>
                        <div className='text-xs text-foreground-muted mb-3'>
                          {sectionTitle.toLocaleUpperCase()}
                        </div>
                        <ul className='grid grid-cols-2'>
                          {menuItems.map((item) => {
                            return (
                              <ListItem
                                key={item.code}
                                title={item.name}
                                icon={<item.Icon></item.Icon>}
                                to={`/products/${item.code}`}
                              >
                                {item.description}
                              </ListItem>
                            )
                          })}
                        </ul>
                      </div>
                      {index < Object.entries(categoriesMenuItems).length - 1 && (
                        <Divider className='mb-4 mt-2' />
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = forwardRef<
  ElementRef<'a'>,
  ComponentPropsWithoutRef<'a'> & { to: string; icon: ReactNode }
>(({ className, to, icon, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          to={to}
          className={cn(
            'block select-none px-3 py-2.5 leading-none no-underline outline-none transition-colors duration-75 hover:bg-accent/40 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-2 ring-offset-2 rounded-lg',
            className
          )}
          {...props}
        >
          <div className='flex gap-3'>
            <div className='flex items-center justify-center flex-[0_0_auto] text-foreground-secondary w-5 h-5'>
              {icon}
            </div>
            <div className='flex flex-col flex-1'>
              <div className='text-sm font-medium leading-none'>{title}</div>
              <p className='line-clamp-1 text-sm leading-snug text-muted-cn-foreground'>
                {children}
              </p>
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
