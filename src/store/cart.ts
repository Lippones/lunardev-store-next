import { Product } from '@/services/products/types'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type CartItem = {
  product: Product
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (productId: Product) => void
  removeItem: (productId: number) => void
  removeAllItem: () => void
  calculateTotalPrice: () => number
  subtractItemQuantity: (productId: number) => void
}

export const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      removeAllItem: () => {
        set({
          items: [],
        })
      },
      calculateTotalPrice: () => {
        return get().items.reduce(
          (acc, { product, quantity }) => acc + product.price * quantity,
          0,
        )
      },
      addItem: (newProduct: Product) => {
        const items = get().items

        const productInCart = items.find(
          ({ product }) => product.id === newProduct.id,
        )

        if (productInCart) {
          const newItems = items.map((item) => {
            if (item.product.id === newProduct.id) {
              return { ...item, quantity: item.quantity + 1 }
            } else {
              return item
            }
          })

          set({ items: [...newItems] })
        } else {
          set({
            items: [...items, { product: newProduct, quantity: 1 }],
          })
        }
      },
      subtractItemQuantity: (productId: number) => {
        const productOnCart = get()
          .items.map(({ product, quantity }) =>
            product.id === productId
              ? {
                  product,
                  quantity: quantity - 1, //
                }
              : { product, quantity },
          )
          .filter((item) => {
            return item.quantity // Remove the item if it reaches zero
          })

        set({
          items: [...productOnCart],
        })
      },
      removeItem: (productId: number) => {
        const items = get().items

        const newItems = items.filter(({ product }) => product.id !== productId)

        set({ items: [...newItems] })
      },
    }),
    {
      name: 'cart',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
