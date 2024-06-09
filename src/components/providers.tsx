'use client'
import { queryClient } from '@/lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
