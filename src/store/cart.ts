import { Product } from '@/services/products/types'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface CartStore {
  items: {
    product: Product
    quantity: number
  }[]
  addItem: (productId: Product) => void
}

export const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
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
