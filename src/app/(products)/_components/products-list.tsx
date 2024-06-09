'use client'
import { useQuery } from '@tanstack/react-query'
import { ProductCard } from './product-card'
import { getAllProducts } from '@/services/products'
import Link from 'next/link'

export function ProductsList() {
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () =>
      getAllProducts({
        page: 1,
        category: 1,
      }),
  })

  return (
    <div>
      <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products?.map((product) => (
          <li key={product.id} className="">
            <Link href={`/product/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
