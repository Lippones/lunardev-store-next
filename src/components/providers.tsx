'use client'
import { queryClient } from '@/lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './theme-provider'
import { TransitionPage } from './transition-page'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        disableTransitionOnChange
        attribute="class"
        defaultTheme="system"
        enableSystem
      >
        <TransitionPage>{children}</TransitionPage>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
