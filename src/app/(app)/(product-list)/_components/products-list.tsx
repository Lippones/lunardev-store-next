'use client'
import { useInfiniteQuery } from '@tanstack/react-query'
import { ProductCard } from './product-card'
import { getAllProducts } from '@/services/products'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ProductsListSkeleton } from './products-list-skeleton'
import { useCallback, useMemo, useRef } from 'react'
import { Loader2 } from 'lucide-react'
import { Product } from '@/services/products/types'

export function ProductsList() {
  const searchParams = useSearchParams()
  const observer = useRef<IntersectionObserver>()

  const categoryId = Number(searchParams.get('category')) ?? undefined

  const [priceMin, priceMax] = searchParams
    .get('priceRange')
    ?.split(',')
    .map((value) => Number(value)) || [0, 10000]

  const title = searchParams.get('q') ?? undefined

  const {
    data: products,
    isLoading: isLoadingProducts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery<Product[], Error>({
    queryKey: ['products', priceMax, priceMin, title, categoryId],
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined
    },
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getAllProducts({
        page: (pageParam as number) ?? 1,
        category: 1,
        categoryId,
        priceMax,
        priceMin,
        title,
      }),
  })

  const elementRef = useCallback(
    (element: HTMLDivElement) => {
      if (isLoadingProducts) return

      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage()
        }
      })

      if (element) observer.current.observe(element)
    },
    [fetchNextPage, hasNextPage, isFetching, isLoadingProducts],
  )

  const formattedProducts = useMemo(() => {
    return products?.pages.reduce((acc, page) => {
      return [...acc, ...page]
    }, [])
  }, [products])

  return (
    <div>
      {isLoadingProducts ? (
        <ProductsListSkeleton />
      ) : (
        <>
          <ul className="flex flex-wrap gap-4 justify-center sm:justify-start">
            {formattedProducts?.map((product) => (
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
            <div ref={elementRef} />
          </ul>
          {isFetchingNextPage && (
            <div className="mx-auto max-w-fit mt-6">
              <Loader2 className="text-primary size-8 animate-spin" />
            </div>
          )}
        </>
      )}
    </div>
  )
}
