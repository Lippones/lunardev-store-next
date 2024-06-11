'use client'

import React, { ReactElement, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useCartStore } from '@/store/cart'

interface CartSheetProps {
  children: ReactElement
}

export function CartSheet({ children }: CartSheetProps) {
  const [isOpen, setIsOpen] = useState(false)

  const { items } = useCartStore((state) => ({
    items: state.items,
  }))

  function handleOpenCart() {
    console.log('Open cart')
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
              className={`fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none rounded-l-2xl'}`}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="absolute bg-white shadow-lg top-0 right-0 w-[400px] h-full z-10"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
            >
              <div className="relative h-full w-full p-4 flex flex-col">
                <h3>Carrinho</h3>
                <ul>
                  {items.map((item) => (
                    <li key={item.product.id}>
                      {item.product.title} - {item.quantity}
                    </li>
                  ))}
                  <li>Product 1</li>
                  <li>Product 2</li>
                  <li>Product 3</li>
                </ul>
                <button
                  className="absolute right-4 top-4"
                  onClick={handleOpenCart}
                >
                  <X />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
