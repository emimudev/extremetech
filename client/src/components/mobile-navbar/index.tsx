import { Button } from '@nextui-org/react'
import { HomeIcon, ShoppingCartIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function MobileNavbar() {
  return (
    <div className='fixed grid grid-cols-3 bottom-0 left-0 right-0 bg-background/90 z-50 md:hidden py-3 border-t border-accent'>
      <div className='grid-cols-1 flex items-center justify-center'>
        <Link to='/' className='w-full h-full flex items-center justify-center'>
          <HomeIcon />
        </Link>
      </div>
      <div className='grid-cols-1 flex items-center justify-center'>
        <Button as='span' size='sm' radius='full' color='primary' className='bg-primary/40'>
          <Link
            to='/products'
            className='w-full h-full flex items-center justify-center'
          >
            All Products
          </Link>
        </Button>
      </div>
      <div className='grid-cols-1 flex items-center  justify-center'>
        <Link
          to='/cart'
          className='w-full h-full flex items-center justify-center'
        >
          <ShoppingCartIcon />
        </Link>
      </div>
    </div>
  )
}
