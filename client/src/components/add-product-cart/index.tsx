import { Button, ButtonProps } from '@nextui-org/react'
import { CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { useCart } from '@/hooks/v2/use-cart'
import { Product } from '@/types/v2'

// export interface AddProductToCartProps extends ButtonProps {
//   product: IProduct
// }

export interface AddProductToCartProps extends ButtonProps {
  product: Product
}

export default function AddProductToCart({
  product,
  children,
  ...buttonProps
}: AddProductToCartProps) {
  const { addItem } = useCart()
  // const { setShoppingCart } = useShoppingCartWrite()
  // const handleAddToCart = useAuthenticatedAction({
  //   action: () => {
  //     setShoppingCart({ type: 'add', value: product })
  //     toast.success(
  //       <span className='flex items-center gap-2'>
  //         <CheckCircle2 className='w-4 h-4'></CheckCircle2>
  //         <span className='font-bold'>{product.name}</span> has been added to
  //         cart
  //       </span>
  //     )
  //   }
  // })

  const addToCart = () => {
    addItem({ product, quantity: 1 })
    toast.success(
      <span className='flex items-center gap-2'>
        <CheckCircle2 className='w-4 h-4'></CheckCircle2>
        <span className='font-bold'>{product.name}</span> has been added to cart
      </span>
    )
  }

  return (
    <Button onClick={addToCart} {...buttonProps}>
      {children}
    </Button>
  )
}
