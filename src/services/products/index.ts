import { api } from '@/lib/axios'
import { Product } from './types'

interface getAllProductsProps {
  page: number
  title?: string
  priceMin?: number
  priceMax?: number
  category?: number
}

export async function getAllProducts({
  page,
  title,
  priceMin,
  priceMax,
  category,
}: getAllProductsProps) {
  const { data } = await api.get<Product[]>('/products', {
    params: {
      offset: (page - 1) * 10,
      limit: 10,
      title,
      price_min: priceMin,
      price_max: priceMax,
      category,
    },
  })

  return data
}
