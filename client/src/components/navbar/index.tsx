import { useJoinModalWrite } from '@/atoms'
import { useAuth } from '@/hooks/use-auth'
import {
  Button,
  Link,
  NavbarContent,
  NavbarItem,
  Navbar as NavbarNext
} from '@nextui-org/react'
import { useRef } from 'react'
import Spacer from '../../components/ui/spacer'
import useIsMobile from '../../hooks/use-is-mobile'
import UserAvatar from '../user-avatar'
import { CartDropdown } from './cart-dropdown'
import { NavbarMenu } from './navbar-menu'

export default function Navbar() {
  const ref = useRef<HTMLElement | null>(null)
  const isMobile = useIsMobile()
  const { openModal } = useJoinModalWrite()
  const { isAuthenticated, isClient } = useAuth()

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
        {isClient && (
          <NavbarItem className='hidden sm:flex items-center'>
            <CartDropdown />
          </NavbarItem>
        )}
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
              onKeyDown={(e) =>
                (e.key === 'Enter' || e.key === 'Space') && openModal()
              }
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
