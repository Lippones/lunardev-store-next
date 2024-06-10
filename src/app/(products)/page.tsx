import { SelectGrid } from './_components/select-grid'
import { ProductsList } from './_components/products-list'

export default async function ProductsPage() {
  return (
    <div>
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold">Produtos</h1>
          <p className="text-zinc-400 text-sm mt-2">
            Aqui estão todos os produtos disponíveis.
          </p>
        </div>
        <SelectGrid />
      </div>
      <ProductsList />
    </div>
  )
}
