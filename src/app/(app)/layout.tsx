import { Header } from '@/components/header'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">{children}</main>
    </>
  )
}
