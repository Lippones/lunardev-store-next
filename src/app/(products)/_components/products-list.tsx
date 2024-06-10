'use client'
import { useQuery } from '@tanstack/react-query'
import { ProductCard } from './product-card'
import { getAllProducts } from '@/services/products'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ProductsListSkeleton } from './products-list-skeleton'

export function ProductsList() {
  const searchParams = useSearchParams()

  const categoryId = Number(searchParams.get('category')) ?? undefined

  const [priceMin, priceMax] = searchParams
    .get('priceRange')
    ?.split(',')
    .map((value) => Number(value)) || [0, 10000]

  const title = searchParams.get('q') ?? undefined

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products', priceMax, priceMin, title, categoryId],
    queryFn: () =>
      getAllProducts({
        page: 1,
        category: 1,
        categoryId,
        priceMax,
        priceMin,
        title,
      }),
  })

  return (
    <div>
      {isLoadingProducts ? (
        <ProductsListSkeleton />
      ) : (
        <ul className="flex flex-wrap gap-4 justify-center sm:justify-start">
          {products?.map((product) => (
            <li
              key={product.id}
              // I used flex instead of grid because it looks better when there are less than 4 products
              className="flex-1 min-w-full sm:min-w-[calc(50%-1rem)] md:min-w-[calc(33%-1rem)] xl:min-w-[calc(25%-1rem)] max-w-[358px] max-sm:mx-auto"
            >
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
