import { IProduct } from '@/types'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { currentUserAtom } from './user-atom'

export interface ShoppingCartElement {
  id: string
  quantity: number
  product: IProduct
  addedAt?: string
}

export interface ShoppingCartDB {
  [key: string]: ShoppingCartElement[]
}

export interface ShoppingCartSetAtomAction {
  type: 'add' | 'remove' | 'clear' | 'remove-one'
  value?: IProduct
}

const shoppingCartDB = atomWithStorage<ShoppingCartDB>(
  'shopping-cart-db',
  {},
  undefined,
  { getOnInit: true }
)

export const shoppingCartAtom = atom(
  (get) => {
    const db = get(shoppingCartDB)
    const user = get(currentUserAtom)
    if (!user) return []
    return db[user.email] || []
  },
  (get, set, action: ShoppingCartSetAtomAction) => {
    const db = get(shoppingCartDB)
    const user = get(currentUserAtom)
    if (!user) return
    if (action.type === 'add') {
      const cart = db[user.email] || []
      const productToAdd = action.value
      if (!productToAdd) return
      const productInDb = cart.find(
        (item) => item.product.id === productToAdd?.id
      )
      const productToAddIndex = cart.findIndex(
        (item) => item.product.id === productToAdd?.id
      )
      if (productInDb) {
        const newCart = [
          ...cart.slice(0, productToAddIndex),
          {
            ...cart[productToAddIndex],
            quantity: cart[productToAddIndex].quantity + 1,
            addedAt: new Date().toISOString()
          },
          ...cart.slice(productToAddIndex + 1)
        ]
        set(shoppingCartDB, { ...db, [user.email]: newCart })
      } else {
        const newProduct: ShoppingCartElement = {
          id: Math.random().toString(36).substr(2, 9),
          quantity: 1,
          product: productToAdd,
          addedAt: new Date().toISOString()
        }
        set(shoppingCartDB, { ...db, [user.email]: [...cart, newProduct] })
      }
    }
    if (action.type === 'remove-one') {
      const cart = db[user.email] || []
      const productToRemove = action.value
      if (!productToRemove) return
      const productInDb = cart.find(
        (item) => item.product.id === productToRemove.id
      )
      const productInDbIndex = cart.findIndex(
        (item) => item.product.id === productToRemove.id
      )
      if (productInDb) {
        if (productInDb.quantity === 1) {
          const newCart = cart.filter(
            (item) => item.product.id !== productToRemove.id
          )
          set(shoppingCartDB, { ...db, [user.email]: newCart })
        } else {
          const newCart = [
            ...cart.slice(0, productInDbIndex),
            {
              ...cart[productInDbIndex],
              quantity: cart[productInDbIndex].quantity - 1
            },
            ...cart.slice(productInDbIndex + 1)
          ]
          set(shoppingCartDB, { ...db, [user.email]: newCart })
        }
      }
    }
    if (action.type === 'remove') {
      const cart = db[user.email] || []
      const newCart = cart.filter(
        (item) => item.product.id !== action.value?.id
      )
      set(shoppingCartDB, { ...db, [user.email]: newCart })
    }
    if (action.type === 'clear') {
      set(shoppingCartDB, { ...db, [user.email]: [] })
    }
  }
)

export const useShoppingCartWrite = () => {
  const setShoppingCart = useSetAtom(shoppingCartAtom)
  return {
    setShoppingCart
  }
}
export const useShoppingCartRead = () => {
  const state = useAtomValue(shoppingCartAtom)
  return {
    items: state
  }
}
export const useShoppingCart = () => {
  const { items } = useShoppingCartRead()
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)

  const isProductAlreadyInCart = (product: IProduct) =>
    items.some((item) => item.product.id === product?.id)

  const searchProductInCart = (product: IProduct) =>
    items.find((item) => item.product.id === product?.id)

  return {
    ...useShoppingCartWrite(),
    items,
    totalItems,
    isProductAlreadyInCart,
    searchProductInCart
  }
}
