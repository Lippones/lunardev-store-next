'use client'
import { useQuery } from '@tanstack/react-query'
import { ProductCard } from './product-card'
import { getAllProducts } from '@/services/products'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ProductsListSkeleton } from './products-list-skeleton'

export function ProductsList() {
  const searchParams = useSearchParams()

  const [priceMin, priceMax] = searchParams
    .get('priceRange')
    ?.split(',')
    .map((value) => Number(value)) || [0, 10000]

  const title = searchParams.get('q') ?? undefined

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products', priceMax, priceMin, title],
    queryFn: () =>
      getAllProducts({
        page: 1,
        category: 1,
        priceMax,
        priceMin,
        title,
      }),
  })

  console.log('products', products)

  return (
    <div>
      {isLoadingProducts ? (
        <ProductsListSkeleton />
      ) : (
        <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products?.map((product) => (
            <li key={product.id} className="">
              <Link href={`/product/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
