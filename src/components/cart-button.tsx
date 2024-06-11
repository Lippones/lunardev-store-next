'use client'
import { useCartStore } from '@/store/cart'
import { ShoppingBasket } from 'lucide-react'
import { CartSheet } from './cart-sheet'

export function CartButton() {
  const { items } = useCartStore((state) => ({
    items: state.items,
  }))

  return (
    <CartSheet>
      <button className="hover:text-primary relative">
        <ShoppingBasket className="size-5" />
        <span className="sr-only">Cart</span>
        {items.length > 0 && (
          <span className="absolute size-4 -top-1.5 -right-1.5 bg-primary text-white text-xs font-medium rounded-full">
            {items.length}
          </span>
        )}
      </button>
    </CartSheet>
  )
}
