import { Suspense } from 'react'
import { ProductsList } from './_components/products-list'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Produtos',
  description: 'Aqui estão todos os produtos disponíveis.',
}

export default async function ProductsPage() {
  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold">Produtos</h1>
        <p className="text-zinc-400 text-sm mt-2">
          Aqui estão todos os produtos disponíveis.
        </p>
      </div>
      <Suspense>
        <ProductsList />
      </Suspense>
    </div>
  )
}
