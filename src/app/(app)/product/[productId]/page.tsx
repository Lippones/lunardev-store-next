import { AddToCartButton } from '@/components/add-to-cart-button'
import { getProductById } from '@/services/products'
import { ConvertNumberToBRL } from '@/utils/convert-number-to-brl'
import Image from 'next/image'

export default async function Product({
  params: { productId },
}: {
  params: {
    productId: number
  }
}) {
  const product = await getProductById(productId)

  return (
    <div className="max-w-screen-2xl mx-auto flex items-center p-6 min-h-svh">
      <section className="grid grid-cols-3 items-center">
        <Image
          width={800}
          height={800}
          src={product.images[0]}
          alt={product.title}
          className="rounded-lg col-span-2"
        />
        <div className="flex flex-col gap-4 px-12">
          <h1 className="text-4xl font-bold">{product.title}</h1>
          <p className="font-semibold text-lg text-violet-600">
            {ConvertNumberToBRL(product.price)}
          </p>
          <p className="text-sm text-zinc-600 ">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-zinc-400">Categoria</span>
            <span className="text-sm text-zinc-400">
              {product.category.name}
            </span>
          </div>
          <AddToCartButton product={product} />
        </div>
      </section>
    </div>
  )
}
