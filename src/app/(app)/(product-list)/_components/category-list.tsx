'use client'

import { SidebarItem } from '@/components/sidebar'
import { useUrlState } from '@/hooks/use-url-state'
import { getAllCategories } from '@/services/categories'
import { useQuery } from '@tanstack/react-query'

export function CategoryList() {
  const { setState, searchParams } = useUrlState()

  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  })

  const currentCategory = searchParams.get('category')?.toString() ?? '1'

  return (
    <ul className="flex gap-2 flex-col mt-2">
      {data?.map((category) => (
        <li key={category.id}>
          <SidebarItem>
            <button
              className={`${currentCategory === category.id.toString() ? 'text-primary' : ''}`}
              onClick={() => {
                setState('category', category.id.toString())
              }}
            >
              {category.name}
            </button>
          </SidebarItem>
        </li>
      ))}
    </ul>
  )
}
