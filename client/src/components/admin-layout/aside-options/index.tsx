import { cn } from '@/lib/utils'
import { TruckIcon, WalletCardsIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export function AsideOptions() {
  const location = useLocation()
  const { pathname } = location

  const isSelected = (path: string) => {
    return pathname === path
  }

  return (
    <ul className='flex flex-col gap-2'>
      <li className='relative flex items-center w-full hover:bg-accent/40'>
        <Link
          to='/'
          className='h-full w-full py-4 px-4 flex items-center gap-3.5'
        >
          <WalletCardsIcon className='w-5 h-5'></WalletCardsIcon>
          Products
        </Link>
        <div
          className={cn(
            'absolute hidden bg-primary top-2 bottom-2 rounded-xl left-0 -translate-x-0.5 w-1.5',
            isSelected('/') && 'flex'
          )}
        ></div>
      </li>
      <li className='relative flex items-center w-full hover:bg-accent/40'>
        <Link
          to='/manage/orders'
          className='h-full w-full py-4 px-4 flex items-center gap-3.5'
        >
          <TruckIcon className='w-5 h-5'></TruckIcon>
          Orders
        </Link>
        <div
          className={cn(
            'absolute hidden bg-primary top-2 bottom-2 rounded-xl left-0 -translate-x-0.5 w-1.5',
            isSelected('/manage/orders') && 'flex'
          )}
        ></div>
      </li>
      {/* <MenuItem>
        <a href="/manage/category">Schemas</a>
      </MenuItem> */}
    </ul>
  )
}
