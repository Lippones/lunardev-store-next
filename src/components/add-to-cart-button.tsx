'use client'
import { ComponentProps } from 'react'
import { Button } from './ui/button'
import { twMerge } from 'tailwind-merge'
import { useCartStore } from '@/store/cart'
import { Product } from '@/services/products/types'
import { ShoppingCart } from 'lucide-react'

interface AddToCartButtonProps extends ComponentProps<'button'> {
  product: Product
}

export function AddToCartButton({
  product,
  className,
  ...rest
}: AddToCartButtonProps) {
  const { addItem } = useCartStore((state) => ({
    addItem: state.addItem,
  }))

  function handleAddToCart() {
    addItem(product)
  }

  return (
    <Button
      onClick={handleAddToCart}
      {...rest}
      className={twMerge('', className)}
      size="lg"
    >
      <ShoppingCart className="size-4 mr-2" /> Add to Cart
    </Button>
  )
}
