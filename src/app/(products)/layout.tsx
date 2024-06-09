import { ProductsSidebar } from './_components/products-sidebar'

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-svh flex flex-col md:flex-row p-6">
      <ProductsSidebar />
      <div className="flex flex-1 flex-col gap-4 md:px-8 pt-6">{children}</div>
    </div>
  )
}
