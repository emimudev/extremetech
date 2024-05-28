import { useAuth } from '@/hooks/use-auth'
import { Avatar, Divider, Tab, Tabs } from '@nextui-org/react'
import { HeartIcon, ShoppingBag, UserIcon } from 'lucide-react'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'

export default function ClientSettingsPage() {
  const { user, isClient } = useAuth()
  const location = useLocation()
  const { pathname } = location

  if (!user) return null

  if (!isClient) return <Navigate to='/' />

  return (
    <div className='main-padding'>
      <header className='relative'>
        <div className='-mx-[4%] min-h-[120px] bg-red-200 bg-gradient-to-r from-fuchsia-600 to-pink-600 opacity-50' />
        <div className='absolute lg:p-0 left-1/2 -translate-x-1/2 rigt-0 max-w-screen-lg m-auto bottom-0 translate-y-1/2 md:translate-y-[70%] w-full '>
          <div className='flex gap-6'>
            <Avatar
              name={user.fullName}
              classNames={{
                name: 'uppercase md:text-5xl'
              }}
              icon={<UserIcon className='h-6 w-6 md:w-14 md:h-14' />}
              isBordered
              color='primary'
              size='lg'
              className='md:w-28 md:h-28'
            />
            <div className='hidden md:block pb-0 self-end'>
              <h1 className='text-2xl font-semibold text-foreground-strong'>
                {user.fullName}
              </h1>
              <div className='text-md text-foreground-secondary'>
                {user.email}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className='max-w-screen-lg lg:p-0 m-auto mt-10 md:mt-28'>
        <h1 className='md:hidden text-lg line-clamp-1 font-semibold mb-4'>
          {user.fullName}
        </h1>
        <div className='overflow-hidden'>
          <Tabs selectedKey={pathname} radius='full' variant='underlined'>
            <Tab
              as={Link}
              // @ts-expect-error href is not a valid prop
              to='/me'
              // href='/me'
              key='/me'
              title={
                <span className='flex gap-2 items-center'>
                  <UserIcon size={16} />
                  Profile
                </span>
              }
            />
            <Tab
              as={Link}
              // @ts-expect-error href is not a valid prop
              to='/me/wishlist'
              key='/me/wishlist'
              title={
                <span className='flex gap-2 items-center'>
                  <HeartIcon fill='currentColor' size={16} />
                  Wish List
                </span>
              }
            />
            <Tab
              as={Link}
              // @ts-expect-error href is not a valid prop
              to='/me/orders'
              key='/me/orders'
              title={
                <span className='flex gap-2 items-center'>
                  <ShoppingBag size={16} />
                  Purchases
                </span>
              }
            />
          </Tabs>
        </div>
        <Divider className='-mt-1 mb-6' />
        <Outlet></Outlet>
      </div>
    </div>
  )
}
