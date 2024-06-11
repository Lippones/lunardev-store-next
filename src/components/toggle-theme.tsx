'use client'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ToggleTheme() {
  const { setTheme, theme } = useTheme()

  return (
    <button
      onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
      }}
      className=""
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
      <span className="sr-only">{theme}</span>
    </button>
  )
}
