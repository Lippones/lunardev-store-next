import { AddToCartButton } from '@/components/add-to-cart-button'
import { getProductById } from '@/services/products'
import { ConvertNumberToBRL } from '@/utils/convert-number-to-brl'
import { Metadata } from 'next'
import Image from 'next/image'

interface ProductPage {
  params: {
    productId: number
  }
}

export async function generateMetadata({
  params: { productId },
}: ProductPage): Promise<Metadata> {
  const product = await getProductById(productId)

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      type: 'article',
      images: {
        alt: product.title,
        type: 'image/png',
        width: 1200,
        height: 1200,
        url: product.images[0],
      },
    },
  }
}

export default async function Product({ params: { productId } }: ProductPage) {
  const product = await getProductById(productId)

  return (
    <div className="max-w-screen-2xl mx-auto flex p-6">
      <section className="grid md:grid-cols-3 md:items-center gap-8 md:gap-12">
        <Image
          width={800}
          height={800}
          src={product.images[0]}
          alt={product.title}
          className="rounded-lg col-span-2 max-md:max-h-[500px] object-cover"
        />
        <div className="flex flex-col gap-y-4 max-md:col-span-2 min-w-full">
          <h1 className="text-4xl font-bold">{product.title}</h1>
          <p className="font-semibold text-lg text-primary">
            {ConvertNumberToBRL(product.price)}
          </p>
          <p className="text-sm text-zinc-600 ">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-zinc-400">Categoria</span>
            <span className="text-sm text-zinc-400">
              {product.category.name}
            </span>
          </div>
          <AddToCartButton className="w-full" product={product} />
        </div>
      </section>
    </div>
  )
}
