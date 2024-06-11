'use client'
import { ComponentProps } from 'react'
import { Button } from './ui/button'
import { twMerge } from 'tailwind-merge'

interface AddToCartButtonProps extends ComponentProps<'button'> {
  productId: number
}

export function AddToCartButton({
  productId,
  className,
  ...rest
}: AddToCartButtonProps) {
  function handleAddToCart() {
    console.log(`Product with id ${productId} added to cart`)
  }

  return (
    <Button
      onClick={handleAddToCart}
      {...rest}
      className={twMerge('', className)}
      size="lg"
    >
      Add to Cart
    </Button>
  )
}
