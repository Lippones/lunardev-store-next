export function ProductsListSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="w-full h-80 bg-gray-200 animate-pulse"></div>
      <div className="w-full h-80 bg-gray-200 animate-pulse"></div>
      <div className="w-full h-80 bg-gray-200 animate-pulse"></div>
      <div className="w-full h-80 bg-gray-200 animate-pulse"></div>
    </div>
  )
}
