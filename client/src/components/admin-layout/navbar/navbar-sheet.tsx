import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger
} from '@/components/ui/sheet'
import { Button } from '@nextui-org/react'
import { MenuIcon } from 'lucide-react'
import { AsideOptions } from '../aside-options'

export function NavbarSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size='sm' variant='light' isIconOnly>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'} className='w-48 p-0'>
        <SheetHeader className='pt-6 px-4 mb-3'>
          <div className='font-semibold text-inherit w-fit text-nowrap gap-1'>
            Extreme
            <span className='dark:text-rose-400 text-rose-700'>Tech</span>
          </div>
        </SheetHeader>
        <AsideOptions />
      </SheetContent>
    </Sheet>
  )
}
