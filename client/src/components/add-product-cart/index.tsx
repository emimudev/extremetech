import { useCart } from '@/hooks/use-cart'
import { Product } from '@/types'
import { Button, ButtonProps, Spinner } from '@nextui-org/react'
import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { DelayedRender } from '../delayed-render'

export interface AddProductToCartProps extends ButtonProps {
  product: Product
}

export default function AddProductToCart({
  product,
  children,
  ...buttonProps
}: AddProductToCartProps) {
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const addToCart = () => {
    if (!product.isOnSale) {
      toast.error(
        <span className='flex items-center gap-2'>
          <CheckCircle2 className='w-4 h-4'></CheckCircle2>
          <span className='font-bold'>{product.name}</span> is not available
        </span>
      )
      return
    }
    setIsAdding(true)
    addItem({ product, quantity: 1 })
      .then(() => {
        toast.success(
          <span className='flex items-center gap-2'>
            <CheckCircle2 className='w-4 h-4'></CheckCircle2>
            <span className='font-bold'>{product.name}</span> has been added to
            cart
          </span>
        )
      })
      .finally(() => {
        setIsAdding(false)
      })
  }

  return (
    <Button
      isLoading={isAdding}
      spinner={
        <DelayedRender>
          <Spinner size='sm' color='current'></Spinner>
        </DelayedRender>
      }
      onClick={addToCart}
      {...buttonProps}
    >
      {children}
    </Button>
  )
}
