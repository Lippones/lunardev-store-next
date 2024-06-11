import { User2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { CartButton } from './cart-button'

export function Header() {
  return (
    <header className="border-b border-zinc-200">
      <div className="py-2 bg-violet-600 flex items-center justify-center w-full">
        <span className="font-medium text-sm text-white">
          Feito com ❤️ por Filipe Vieira da Silva
        </span>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link
            href="/"
            className="text-xl font-bold inline-flex items-center gap-2"
          >
            <Image width={40} height={40} src={'/icon.svg'} alt="Lunar Store" />
            Lunar Store
          </Link>
          <div className="flex items-center gap-4">
            <CartButton />
            <button className="hover:text-violet-600">
              <User2 className="size-5" />
              <span className="sr-only">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
