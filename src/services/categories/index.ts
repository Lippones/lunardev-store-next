import { api } from '@/lib/axios'
import { Category } from './types'

export async function getAllCategories() {
  const { data } = await api.get<Category[]>('/categories')

  return data
}
