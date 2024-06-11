'use client'
import { useUrlState } from '@/hooks/use-url-state'
import { Search } from 'lucide-react'

export function SearchProducts() {
  const { setState, searchParams } = useUrlState()

  const query = searchParams.get('q') ?? ''

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const query = formData.get('q')

    if (typeof query === 'string') {
      setState('q', query)
    }

    setState('q', e.currentTarget.q.value)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex h-10 w-full rounded-lg border bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
    >
      <button>
        <Search className="w-5 h-5 flex-shrink-0 mr-2 text-primary" />
      </button>

      <input
        defaultValue={query}
        className="w-full bg-transparent text-sm placeholder:text-zinc-400 outline-none"
        type="text"
        placeholder="Search product"
        name="q"
      />
    </form>
  )
}
