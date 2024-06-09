'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function useUrlState() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  function setState(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams)
    console.log('params', params.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  return {
    setState,
    searchParams,
  }
}
