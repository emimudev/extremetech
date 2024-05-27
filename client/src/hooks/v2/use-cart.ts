import {
  LOCAL_CART_KEY,
  defaultAnonymousCart,
  useCartAtom
} from '@/atoms/v2/cart-atom'
import { useCallback, useEffect } from 'react'
import { useAuth } from './use-auth'
import { Cart, CartItem, Product } from '@/types/v2'
import useSWR from 'swr'
import { CartService } from '@/services/cart-service'

export function useCart() {
  const [cart, setCart] = useCartAtom()
  const { isAuthenticated, user } = useAuth()

  const {
    data: userCart,
    isLoading,
    isValidating,
    mutate
  } = useSWR(
    () => {
      // if user is authenticated and user is owner of cart, fetch user cart
      if (isAuthenticated && user && user.id === cart.owner.id) {
        console.log('hereeeeeeeeeeeeeeeeeeeeeeeeeee')
        return 'api/v1/cart'
      }
      return null
    },
    () =>
      CartService.getMyCart()
        .then((res) => res.content)
        .catch((err) => {
          console.log('Error fetching cart')
          console.error(err)
        })
  )

  // Update cart when user cart changes

  useEffect(() => {
    if (userCart) {
      setCart(userCart)
    }
  }, [userCart, setCart])

  // Load local storage cart if user is not authenticated
  useEffect(() => {
    if (isAuthenticated) {
      return
    }
    const localCartStr = localStorage.getItem(LOCAL_CART_KEY)
    const localCart = JSON.parse(localCartStr ?? 'null') as Cart | null
    if (localCart) {
      setCart(localCart)
    }
  }, [isAuthenticated, setCart])

  const searchProduct = useCallback(
    (product: Product | string) => {
      const productId = typeof product === 'string' ? product : product.id
      if (!cart) return null
      return cart.items.find((item) => item.product.id === productId)
    },
    [cart]
  )

  const cleanCart = useCallback(() => {
    if (!isAuthenticated) {
      setCart(defaultAnonymousCart)
      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(defaultAnonymousCart))
      return Promise.resolve()
    } else {
      return CartService.clear()
        .then(() => {
          return mutate().then((data) => {
            setCart(data!)
            return Promise.resolve(data)
          })
        })
        .catch((err) => {
          console.error(err)
          return Promise.reject(err)
        })
    }
  }, [isAuthenticated, setCart, mutate])

  const removeItem = useCallback(
    async (item: CartItem) => {
      const existingItem = searchProduct(item.product)
      // if user is not authenticated, remove item from local storage cart
      if (!isAuthenticated) {
        if (!existingItem) return Promise.reject(new Error('Item not found'))
        const newQuantity = existingItem.quantity - 1
        // if quantity is greater than 0, update quantity
        if (newQuantity > 0) {
          setCart((prevCart) => {
            const cartItems = prevCart?.items ?? []
            const newCart = {
              ...prevCart,
              items: cartItems.map((cartItem) =>
                cartItem.product.id === item.product.id
                  ? { ...cartItem, quantity: newQuantity }
                  : cartItem
              )
            } satisfies Cart
            localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(newCart))
            return newCart
          })
          return Promise.resolve({
            ...existingItem,
            quantity: newQuantity
          } as CartItem)
        } else {
          // if quantity is 0, remove item
          setCart((prevCart) => {
            const cartItems = prevCart?.items ?? []
            const newCart = {
              ...prevCart,
              items: cartItems.filter(
                (cartItem) => cartItem.product.id !== item.product.id
              )
            } satisfies Cart
            localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(newCart))
            return newCart
          })
          return Promise.resolve(item)
        }
      } else {
        return CartService.removeOne(item)
          .then(() => {
            mutate().then((data) => {
              setCart(data!)
            })
            return Promise.resolve(item)
          })
          .catch((err) => {
            console.error(err)
            return Promise.reject(err)
          })
      }
    },
    [isAuthenticated, setCart, searchProduct, mutate]
  )

  const addItem = useCallback(
    async ({
      product,
      quantity = 1
    }: {
      product: Product
      quantity: number
    }) => {
      const existingItem = searchProduct(product)
      // if user is not authenticated, add item to local storage cart
      if (!isAuthenticated) {
        // if item already exists in cart, update quantity
        if (existingItem) {
          const newQuantity = existingItem.quantity + quantity
          setCart((prevCart) => {
            const cartItems = prevCart?.items ?? []
            const newCart = {
              ...prevCart,
              items: cartItems.map((cartItem) =>
                cartItem.product.id === product.id
                  ? { ...cartItem, quantity: newQuantity }
                  : cartItem
              )
            } satisfies Cart
            localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(newCart))
            return newCart
          })
          return Promise.resolve({ ...existingItem, quantity: newQuantity })
        } else {
          // if item does not exist in cart, add item
          const item: CartItem = {
            id: product.id,
            product,
            quantity,
            addedAt: new Date().toISOString()
          }
          setCart((prevCart) => {
            const cartItems = prevCart?.items ?? []
            const newCart = {
              ...prevCart,
              items: [...cartItems, item]
            } satisfies Cart
            localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(newCart))
            return newCart
          })
          return Promise.resolve(item)
        }
      } else {
        return CartService.addOne({
          product,
          quantity
        })
          .then((res) => {
            mutate().then((data) => {
              setCart(data!)
            })
            return Promise.resolve(res.content!)
          })
          .catch((err) => {
            console.error(err)
            return Promise.reject(err)
          })
      }
    },
    [isAuthenticated, searchProduct, setCart, mutate]
  )

  const totalItems =
    cart?.items.reduce((acc, item) => acc + item.quantity, 0) ?? 0
  const totalPrice =
    cart?.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    ) ?? 0

  return {
    cart,
    cleanCart,
    addItem,
    removeItem,
    searchProduct,
    totalItems,
    totalPrice,
    isLoadingCart: isLoading,
    isValidatingCart: isValidating
  }
}
