import { Suspense } from 'react'
import { ProductsSidebar } from './_components/products-sidebar'

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-svh flex flex-col lg:flex-row p-6">
      <Suspense fallback={null}>
        <ProductsSidebar />
      </Suspense>
      <div className="flex flex-1 flex-col gap-4 max-lg:mt-6 lg:px-8">
        {children}
      </div>
    </div>
  )
}
