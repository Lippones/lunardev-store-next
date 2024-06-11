import { api } from '@/lib/axios'
import { Product } from './types'

interface getAllProductsProps {
  page: number
  title?: string
  priceMin?: number
  priceMax?: number
  category?: number
  categoryId?: number | undefined
}

export async function getAllProducts({
  page,
  title,
  priceMin,
  priceMax,
  category,
  categoryId,
}: getAllProductsProps) {
  const { data } = await api.get<Product[]>('/products', {
    params: {
      offset: (page - 1) * 10,
      limit: 10,
      title,
      price_min: priceMin,
      price_max: priceMax,
      category,
      categoryId,
    },
  })

  return data
}

export async function getProductById(id: number) {
  const { data } = await api.get<Product>(`/products/${id}`)

  return data
}
