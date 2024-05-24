import { useCartAtom } from '@/atoms/v2/cart-atom'
import { useCallback, useEffect } from 'react'
import { useAuth } from './use-auth'
import { Cart, CartItem, Product } from '@/types/v2'

const LOCAL_CART_KEY = 'local-cart'

export function useCart() {
  const [cart, setCart] = useCartAtom()
  const { isAuthenticated } = useAuth()

  // initialize cart
  useEffect(() => {
    // if user is not authenticated, load cart from local storage
    if (!isAuthenticated) {
      const localCart = localStorage.getItem(LOCAL_CART_KEY)
      if (localCart) {
        setCart(JSON.parse(localCart))
      } else {
        setCart({
          items: []
        })
      }
    }
  }, [isAuthenticated, setCart])

  const cleanCart = useCallback(() => {
    if (!isAuthenticated) {
      setCart({
        items: []
      })
    }
  }, [isAuthenticated, setCart])

  const addItem = useCallback(
    ({ product, quantity }: { product: Product; quantity: number }) => {
      if (!isAuthenticated) {
        setCart((prevCart) => {
          const cartItems = prevCart?.items ?? []
          const item: CartItem = {
            id: product.id,
            product,
            quantity,
            addedAt: new Date().toISOString()
          }
          const newCart = {
            ...prevCart,
            items: [...cartItems, item]
          } satisfies Partial<Cart>
          localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(newCart))
          return newCart
        })
      }
    },
    [isAuthenticated, setCart]
  )

  const removeItem = useCallback(
    (item: CartItem) => {
      if (!isAuthenticated) {
        setCart((prevCart) => {
          const cartItems = prevCart?.items ?? []
          const newCart = {
            ...prevCart,
            items: cartItems.filter(
              (cartItem) => cartItem.product.id !== item.product.id
            )
          }
          localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(newCart))
          return newCart
        })
      }
    },
    [isAuthenticated, setCart]
  )

  return {
    cart,
    cleanCart,
    addItem,
    removeItem
  }
}
