import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const fontSans = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Lunar Store',
    default: 'Lunar Store',
  },
  description: 'Teste técnico para a vaga de desenvolvedor front-end na Lunar',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={fontSans.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
