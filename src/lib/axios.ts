import { env } from '@/env'
import axios from 'axios'

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
})
