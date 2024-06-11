import { User2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { CartButton } from './cart-button'
import { ToggleTheme } from './toggle-theme'

export function Header() {
  return (
    <header className="border-b  overflow-x-hidden">
      <div className="py-2 bg-primary flex items-center justify-center w-full">
        <span className="font-medium text-sm text-white">
          Feito com ❤️ por Filipe Vieira da Silva
        </span>
      </div>
      <div className="mx-auto px-6">
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
            <button className="hover:text-primary">
              <User2 className="size-5" />
              <span className="sr-only">Profile</span>
            </button>
            <ToggleTheme />
          </div>
        </div>
      </div>
    </header>
  )
}
