'use client'
import { useCartStore } from '@/store/cart'
import { ShoppingBasket } from 'lucide-react'
import { CartSheet } from './cart-sheet'
import { useAnimate } from 'framer-motion'
import { useCallback, useEffect } from 'react'

export function CartButton() {
  const [scope, animate] = useAnimate()

  const { items } = useCartStore((state) => ({
    items: state.items,
  }))

  const handleStartAnimation = useCallback(async () => {
    await animate(scope.current, { scale: 1.2 })
    await animate(scope.current, { scale: 1 })
  }, [animate, scope])

  useEffect(() => {
    handleStartAnimation()
  }, [handleStartAnimation, items])

  return (
    <CartSheet>
      <button ref={scope} className="hover:text-primary relative">
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
