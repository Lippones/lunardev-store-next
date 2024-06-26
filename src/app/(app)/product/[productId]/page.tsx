import { AddToCartButton } from '@/components/add-to-cart-button'
import { FadeIn } from '@/components/fade-in'
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
        <FadeIn
          to="top"
          startOnScrollIntersect
          className="w-full h-full col-span-2 max-md:max-h-[500px]"
          delay={0.2}
        >
          <Image
            width={800}
            height={800}
            src={product.images[0]}
            alt={product.title}
            className="rounded-lg object-cover"
          />
        </FadeIn>
        <div className="flex flex-col gap-y-4 max-md:col-span-2 min-w-full">
          <FadeIn
            to="top"
            startOnScrollIntersect
            className="w-full h-full col-span-2 max-md:max-h-[500px]"
            delay={0.2}
          >
            <h1 className="text-4xl font-bold">{product.title}</h1>
          </FadeIn>
          <FadeIn
            to="top"
            startOnScrollIntersect
            className="w-full h-full col-span-2 max-md:max-h-[500px]"
            delay={0.3}
          >
            <p className="font-semibold text-lg text-primary">
              {ConvertNumberToBRL(product.price)}
            </p>
          </FadeIn>
          <FadeIn
            to="top"
            startOnScrollIntersect
            className="w-full h-full col-span-2 max-md:max-h-[500px]"
            delay={0.4}
          >
            <p className="text-sm text-muted">{product.description}</p>
          </FadeIn>
          <FadeIn
            to="top"
            startOnScrollIntersect
            className="w-full h-full col-span-2 max-md:max-h-[500px]"
            delay={0.5}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-500">Categoria</span>
              <span className="text-sm text-zinc-500">
                {product.category.name}
              </span>
            </div>
          </FadeIn>
          <FadeIn
            to="top"
            startOnScrollIntersect
            className="w-full h-full col-span-2 max-md:max-h-[500px]"
            delay={0.6}
          >
            <AddToCartButton className="w-full" product={product} />
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
