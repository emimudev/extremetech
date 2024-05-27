import { useAuthAtom } from '@/atoms/auth-atom'
import { LOCAL_CART_KEY, useCartSetAtom } from '@/atoms/cart-atom'
import { AuthService } from '@/services/auth-service'
import { CartService } from '@/services/cart-service'
import { Cart } from '@/types'
import { CartItemRequest } from '@/types/cart-item-request'
import { createContext, useEffect, useMemo, useState } from 'react'

export interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: false
})

export default function AuthContextProvider({
  children
}: {
  children?: React.ReactNode
}) {
  const [auth, setAuth] = useAuthAtom()
  const setCart = useCartSetAtom()
  const [isLoading, setIsLoading] = useState(() => !!auth)
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!auth)
  const [currentCart, setCurrentCart] = useState<Cart | null>(null)

  // console.log({ auth, isLoading, isAuthenticated })

  useEffect(() => {
    if (!auth) {
      return
    }
    AuthService.me()
      .then(() => {
        // console.log({ me: res })
      })
      .catch(() => {
        setIsAuthenticated(() => false)
        setAuth(null)
      })
      .finally(() => {
        setIsLoading(() => false)
      })
  }, [auth, setAuth])

  useEffect(() => {
    if (!auth) {
      return
    }
    CartService.getMyCart()
      .then((res) => {
        // console.log('MyCart', res)
        const cart = res.content!
        const localCartStr = localStorage.getItem(LOCAL_CART_KEY)
        const localCart = JSON.parse(localCartStr ?? 'null') as Cart | null
        if (!localCart) {
          setCart(cart)
          localStorage.removeItem(LOCAL_CART_KEY)
        } else {
          if (cart.items.length > 0 || localCart.items.length === 0) {
            setCart(cart)
            localStorage.removeItem(LOCAL_CART_KEY)
          } else {
            setCurrentCart(cart)
          }
        }
      })
      .catch(() => {
        console.log('Error fetching cart')
      })
  }, [auth, setCart])

  useEffect(() => {
    if (currentCart) {
      // console.log('MERGING')
      const localCartStr = localStorage.getItem(LOCAL_CART_KEY)
      const localCart = JSON.parse(localCartStr ?? 'null') as Cart | null
      if (!localCart) return
      const itemsRequest = localCart.items.map((item) => {
        return {
          product: {
            id: item.product.id
          },
          quantity: item.quantity
        } as CartItemRequest
      })
      CartService.add(itemsRequest)
        .then((res) => {
          // console.log('Merged', res)
          currentCart.items = res.content!
          setCart(currentCart)
        })
        .catch((err) => {
          console.log(err)
          console.log('Error merging cart')
        })
    }
  }, [currentCart, setCart])

  const value = useMemo(
    () => ({
      isAuthenticated,
      isLoading
    }),
    [isAuthenticated, isLoading]
  )

  return (
    <AuthContext.Provider value={value}>
      {/* {isLoading && <div>Loading...</div>} */}
      {!isLoading && children}
    </AuthContext.Provider>
  )
}
