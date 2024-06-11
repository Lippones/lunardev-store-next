'use client'

import React, { ReactElement, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus, X } from 'lucide-react'
import { type CartItem, useCartStore } from '@/store/cart'
import Image from 'next/image'
import { ConvertNumberToBRL } from '@/utils/convert-number-to-brl'
import { Button } from './ui/button'
import { Product } from '@/services/products/types'

interface CartSheetProps {
  children: ReactElement
}

export function CartSheet({ children }: CartSheetProps) {
  const [isOpen, setIsOpen] = useState(false)

  const { items, addItem, subtractItemQuantity, calculateTotalPrice } =
    useCartStore((state) => ({
      items: state.items,
      addItem: state.addItem,
      subtractItemQuantity: state.subtractItemQuantity,
      calculateTotalPrice: state.calculateTotalPrice,
    }))

  const addProductToCart = useCallback(
    (product: Product) => {
      addItem(product)
    },
    [addItem],
  )
  const subtractQuantityToCart = useCallback(
    (product: number) => {
      subtractItemQuantity(product)
    },
    [subtractItemQuantity],
  )

  function handleOpenCart() {
    setIsOpen((prev) => !prev)
  }

  return (
    <>
      {React.cloneElement(children, {
        onClick: handleOpenCart,
      })}
      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className={`fixed inset-0 bg-gray-600 bg-opacity-50 z-40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none rounded-l-2xl'}`}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed bg-card shadow-lg top-0 right-0 w-full md:w-[400px] h-full z-50"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                bounce: 0,
                duration: 0.2,
                ease: 'easeInOut',
              }}
            >
              <div className="relative h-full w-full p-6 flex flex-col">
                <h3 className="text-2xl font-bold">Carrinho</h3>
                <ul className="flex flex-col divide-y">
                  {items.map((item) => (
                    <li
                      key={item.product.id}
                      className="flex w-full gap-4 py-6"
                    >
                      <CardItem
                        subtractQuantityToCart={subtractQuantityToCart}
                        addToCart={addProductToCart}
                        item={item}
                      />
                    </li>
                  ))}
                </ul>
                <div>
                  <p>
                    Total:{' '}
                    <span className="text-lg font-bold text-primary">
                      {ConvertNumberToBRL(calculateTotalPrice())}
                    </span>{' '}
                  </p>
                </div>
                <Button className="mt-6">Finalizar compra</Button>
                <button
                  className="absolute right-6 top-6"
                  onClick={handleOpenCart}
                >
                  <X className="text-muted" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

interface CardItemProps {
  item: CartItem
  addToCart: (product: Product) => void
  subtractQuantityToCart: (productId: number) => void
}

export function CardItem({
  item,
  addToCart,
  subtractQuantityToCart,
}: CardItemProps) {
  return (
    <div className="w-full">
      <header className="flex gap-4">
        <Image
          src={item.product.images[0]}
          width={100}
          height={100}
          alt={item.product.title}
          className="rounded-lg"
        />
        <div className="flex flex-col">
          <h4 className="font-bold">{item.product.title}</h4>
          <p className="text-sm text-zinc-500">{item.product.category.name}</p>
          <p className="mt-auto font-medium">
            {ConvertNumberToBRL(item.product.price)}
          </p>
        </div>
      </header>
      <footer className="flex items-center justify-between mt-4">
        <div>
          <span className="text-sm text-zinc-500">Quantidade</span>
          <div className="flex gap-2 items-center mt-2">
            <Button
              onClick={() => subtractQuantityToCart(item.product.id)}
              size="icon"
              className="size-6 rounded-md"
            >
              <Minus className="size-4" />
              <span className="sr-only">Subtrair quantidade</span>
            </Button>
            {item.quantity}
            <Button
              onClick={() => addToCart(item.product)}
              size="icon"
              className="size-6 rounded-md"
            >
              <Plus className="size-4" />
              <span className="sr-only">Somar quantidade</span>
            </Button>
          </div>
        </div>
        <div>
          <p className="text-sm text-zinc-500">Subtotal</p>
          <p className="font-medium text-primary">
            {ConvertNumberToBRL(item.product.price * item.quantity)}
          </p>
        </div>
      </footer>
    </div>
  )
}
