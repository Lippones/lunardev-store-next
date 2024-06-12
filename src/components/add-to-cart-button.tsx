'use client'
import { ComponentProps, useState } from 'react'
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
  const [added, setAdded] = useState(false)

  const { addItem, items } = useCartStore((state) => ({
    addItem: state.addItem,
    items: state.items,
  }))

  function handleAddToCart() {
    addItem(product)
    setAdded(true)

    setTimeout(() => {
      setAdded(false)
    }, 2000)
  }

  return (
    <Button
      onClick={handleAddToCart}
      {...rest}
      className={twMerge('', className)}
      size="lg"
    >
      <ShoppingCart className="size-4 mr-2" />{' '}
      {added ? 'Adicionado com sucesso!' : 'Adicionar ao carrinho'}{' '}
      {items.find((item) => item.product.id === product.id) && !added && (
        <span>
          ({items.find((item) => item.product.id === product.id)?.quantity})
        </span>
      )}
    </Button>
  )
}
