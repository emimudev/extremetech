import UserAvatar from '@/components/user-avatar'
import { Link } from '@nextui-org/react'
import { NavbarSheet } from './navbar-sheet'

export default function Navbar() {
  return (
    <div className='px-3 main-padding lg:px-4 w-full flex justify-between'>
      <div className='flex items-center gap-2 w-fit flex-grow-0 flex-shrink-0 mr-4'>
        <div className='lg:hidden'>
          <NavbarSheet />
        </div>
        <Link
          href='/'
          className='font-semibold text-inherit w-fit text-nowrap gap-1'
        >
          Extreme
          <span className='dark:text-rose-400 text-rose-700'>Tech</span>
        </Link>
      </div>
      <div>
        <UserAvatar />
      </div>
    </div>
  )
}
