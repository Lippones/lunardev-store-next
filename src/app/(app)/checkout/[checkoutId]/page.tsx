import { OrderSummary } from './order-summary'
import { OrderForm } from './order-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Finalizar compra | Lunar Store',
}

export default function Checkout() {
  return (
    <section className="flex flex-col-reverse md:grid grid-cols-3 gap-6 max-w-screen-2xl mx-auto p-6 mt-10">
      <OrderForm />
      <OrderSummary />
    </section>
  )
}
