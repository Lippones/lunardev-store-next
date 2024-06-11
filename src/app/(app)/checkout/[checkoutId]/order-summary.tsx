'use client'

import { useCartStore } from '@/store/cart'
import { ConvertNumberToBRL } from '@/utils/convert-number-to-brl'
import { Trash2 } from 'lucide-react'

export function OrderSummary() {
  const { items, removeItem, calculateTotalPrice } = useCartStore((state) => ({
    items: state.items,
    removeItem: state.removeItem,
    calculateTotalPrice: state.calculateTotalPrice,
  }))

  const totalProductsPrice = calculateTotalPrice()
  const frete = Math.random() * 100

  return (
    <div className="col-span-1 p-4 bg-card rounded-lg border">
      <h2 className="text-lg font-semibold">Resumo do pedido</h2>
      <ul className="flex flex-col gap-2 mt-4">
        {items.map((item) => (
          <li key={item.product.id} className="flex justify-between">
            <span className="text-sm text-muted">
              {item.quantity} X {item.product.title}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted">
                {ConvertNumberToBRL(item.product.price * item.quantity)}
              </span>
              <button
                onClick={() => removeItem(item.product.id)}
                className="hover:text-primary text-muted"
              >
                <Trash2 className="size-4" />
                <span className="sr-only">Excluir</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <hr className="my-4 bg-border" />
      <ul className="flex flex-col gap-2">
        <li className="flex justify-between">
          <span className="text-sm text-muted">Subtotal</span>
          <span className="text-sm text-muted">
            {ConvertNumberToBRL(totalProductsPrice)}
          </span>
        </li>
        <li className="flex justify-between">
          <span className="text-sm text-muted">Frete</span>
          <span className="text-sm text-muted">
            {ConvertNumberToBRL(frete)}
          </span>
        </li>
        <li className="flex justify-between mt-2">
          <span className="font-bold">Total</span>
          <span className="font-bold">
            {ConvertNumberToBRL(totalProductsPrice + frete)}
          </span>
        </li>
      </ul>
    </div>
  )
}
