import Image from 'next/image'
import { Product } from '@/services/products/types'
import { ConvertNumberToBRL } from '@/utils/convert-number-to-brl'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="shadow-sm border  rounded-lg overflow-hidden h-full w-full">
      <Image
        width={400}
        height={400}
        className="w-full object-cover"
        src={product.images[0]}
        alt={product.title}
      />
      <div className="p-4 flex flex-col gap-2">
        <span className="uppercase text-muted text-sm">
          {product.category.name}
        </span>
        <h2 className="font-semibold">{product.title}</h2>
        <p className="line-clamp-2 text-sm text-muted">{product.description}</p>
        <span className="font-semibold mt-auto text-primary">
          {ConvertNumberToBRL(product.price)}
        </span>
      </div>
    </div>
  )
}
