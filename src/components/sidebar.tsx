import { twMerge } from 'tailwind-merge'

export type SidebarGenericProps<T = unknown> = {
  children: React.ReactNode
  className?: string
} & T

export function Sidebar({ className, children }: SidebarGenericProps) {
  return (
    <aside
      className={twMerge(
        'border border-zinc-200 flex bg-zinc-50 flex-col space-y-6 shadow-sm rounded-lg p-6',
        className,
      )}
    >
      {children}
    </aside>
  )
}

export function SidebarHeader({ className, children }: SidebarGenericProps) {
  return <header className={twMerge('', className)}>{children}</header>
}

export function SidebarMain({ className, children }: SidebarGenericProps) {
  return <main className={twMerge('', className)}>{children}</main>
}

export function SidebarTitle({ children }: SidebarGenericProps) {
  return <h2 className="text-zinc-900 text-xl font-semibold">{children}</h2>
}

export function SidebarItem({ children }: SidebarGenericProps) {
  return (
    <div className="flex items-center text-zinc-500 text-sm space-x-2">
      {children}
    </div>
  )
}

export function SidebarFooter({ className, children }: SidebarGenericProps) {
  return (
    <footer
      className={twMerge('p-6 mt-auto border-t border-zinc-200', className)}
    >
      {children}
    </footer>
  )
}
