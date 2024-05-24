import { useRef } from 'react'
import {
  Button,
  Link,
  Navbar as NavbarNext,
  NavbarContent,
  NavbarItem
} from '@nextui-org/react'
import { NavbarMenu } from './navbar-menu'
import Spacer from '../../components/ui/spacer'
import useIsMobile from '../../hooks/use-is-mobile'
import { Link as RouterLink } from 'react-router-dom'
import { useLoginModalWrite, useShoppingCart } from '@/atoms'
import { ShoppingCartIcon } from 'lucide-react'
import UserAvatar from '../user-avatar'
import { useAuth } from '@/hooks/v2/use-auth'

export default function Navbar() {
  const ref = useRef<HTMLElement | null>(null)
  const isMobile = useIsMobile()
  const { openModal } = useLoginModalWrite()
  const { totalItems } = useShoppingCart()
  const { isAuthenticated } = useAuth()

  return (
    <NavbarNext
      ref={ref}
      shouldHideOnScroll={isMobile}
      classNames={{
        wrapper: 'main-padding'
      }}
      maxWidth='full'
      className='main-navbar ![--navbar-height:3rem] lg:![--navbar-height:4rem] fixed top-0 left-0 right-0 w-full border-b-2 p-0'
    >
      <div className='flex items-center gap-6 w-fit flex-grow-0 flex-shrink-0 mr-4'>
        <Link
          href='/'
          className='font-semibold text-inherit w-fit text-nowrap gap-1'
        >
          Extreme
          <span className='dark:text-rose-400 text-rose-700'>Tech</span>
        </Link>
      </div>
      <div className='hidden md:block'>
        <NavbarMenu />
      </div>
      <Spacer className='hidden sm:block' />
      <NavbarContent className='flex-0 !flex-grow-0 gap-2' justify='end'>
        <NavbarItem className='hidden sm:flex items-center'>
          {isAuthenticated && (
            <Button
              as={RouterLink}
              size='sm'
              variant='light'
              radius='full'
              to='/cart'
              className='text-sm text-foreground hover:text-foreground-strong items-center'
              startContent={<ShoppingCartIcon width={16} />}
            >
              <div className='flex items-center gap-2 leading-none'>
                Cart
                {totalItems > 0 && (
                  <span className='w-5 h-5 text-xs flex items-center justify-center leading-none bg-primary/40  rounded-full'>
                    {totalItems}
                  </span>
                )}
              </div>
            </Button>
          )}
          {!isAuthenticated && (
            <Button
              size='sm'
              variant='light'
              radius='full'
              className='text-sm text-foreground hover:text-foreground-strong'
              onClick={openModal}
              startContent={<ShoppingCartIcon width={16} />}
            >
              Cart
            </Button>
          )}
        </NavbarItem>
        {isAuthenticated && (
          <NavbarItem>
            <UserAvatar />
          </NavbarItem>
        )}
        {!isAuthenticated && (
          <NavbarItem>
            <Button
              color='primary'
              size='sm'
              radius='full'
              className='text-sm font-semibold'
              onClick={openModal}
            >
              Join
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </NavbarNext>
  )
}
