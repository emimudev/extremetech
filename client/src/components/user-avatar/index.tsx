import { useAuth } from '@/hooks/use-auth'
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import { HeartIcon, LogOutIcon, ShoppingBag, UserIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function UserAvatar() {
  const { user, isClient, logout } = useAuth()
  const navigate = useNavigate()

  const navigateToProfile = () => navigate('/me')
  const navigateWishList = () => navigate('/me/wishlist')
  const navigateOrders = () => navigate('/me/orders')

  return (
    <Dropdown>
      <DropdownTrigger>
        <button className='bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 focus:outline-none focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 group flex items-center gap-2 hover:bg-accent/60 pl-2 py-0 rounded-full'>
          <span className='max-w-20 w-full text-xs truncate text-foreground-strong'>
            {user?.fullName}
          </span>
          <Avatar
            size='sm'
            name={user?.fullName}
            children={user?.fullName}
            className='bg-primary/80 group-hover:bg-primary flex-shrink-0'
            icon={<UserIcon className='w-4 h-4' />}
          />
        </button>
      </DropdownTrigger>
      {isClient && (
        <DropdownMenu aria-label='User settings'>
          <DropdownItem key='my-profile' onClick={navigateToProfile}>
            <div className='flex items-center gap-3'>
              <UserIcon className='w-4 h-4' />
              Profile
            </div>
          </DropdownItem>
          <DropdownItem key='wishlist' onClick={navigateWishList}>
            <div className='flex items-center gap-3'>
              <HeartIcon fill='currentColor' className='w-4 h-4' />
              WishList
            </div>
          </DropdownItem>
          <DropdownItem key='orders' onClick={navigateOrders}>
            <div className='flex items-center gap-3'>
              <ShoppingBag className='w-4 h-4' />
              My Orders
            </div>
          </DropdownItem>
          <DropdownItem key='logout' onClick={logout}>
            <div className='flex items-center gap-3'>
              <LogOutIcon className='w-4 h-4' />
              Logout
            </div>
          </DropdownItem>
        </DropdownMenu>
      )}
      {!isClient && (
        <DropdownMenu aria-label='User settings'>
          <DropdownItem key='logout-admin' onClick={logout}>
            <div className='flex items-center gap-3'>
              <LogOutIcon className='w-4 h-4' />
              Logout
            </div>
          </DropdownItem>
        </DropdownMenu>
      )}
    </Dropdown>
  )
}
