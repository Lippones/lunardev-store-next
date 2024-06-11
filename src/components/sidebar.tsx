import { twMerge } from 'tailwind-merge'

export type SidebarGenericProps<T = unknown> = {
  children: React.ReactNode
  className?: string
} & T

export function Sidebar({ className, children }: SidebarGenericProps) {
  return (
    <aside
      className={twMerge(
        'border  flex bg-zinc-50 flex-col flex-shrink-0 space-y-6 shadow-sm rounded-r-lg p-6',
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

export function SidebarTitle({ children, className }: SidebarGenericProps) {
  return (
    <h2 className={twMerge('text-xl font-semibold', className)}>{children}</h2>
  )
}

export function SidebarItem({ children, className }: SidebarGenericProps) {
  return (
    <div
      className={twMerge(
        'flex items-center text-muted text-sm space-x-2',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function SidebarFooter({ className, children }: SidebarGenericProps) {
  return (
    <footer className={twMerge('p-6 mt-auto border-t ', className)}>
      {children}
    </footer>
  )
}
