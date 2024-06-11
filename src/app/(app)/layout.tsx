import { Header } from '@/components/header'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="w-screen overflow-x-hidden">{children}</main>
    </>
  )
}
