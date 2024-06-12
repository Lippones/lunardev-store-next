'use client'
import { PriceSlider } from '@/components/price-slider'
import {
  Sidebar,
  SidebarHeader,
  SidebarTitle,
  SidebarItem,
  SidebarMain,
  SidebarFooter,
} from '@/components/sidebar'
import { Button } from '@/components/ui/button'
import { useUrlState } from '@/hooks/use-url-state'
import { ListFilter, X } from 'lucide-react'
import { useState } from 'react'
import { SearchProducts } from './search-product'
import { CategoryList } from './category-list'
import { useRouter } from 'next/navigation'

export function ProductsSidebar() {
  const { searchParams, setState } = useUrlState()
  const router = useRouter()
  const [temporaryPriceRange, setTemporaryPriceRange] = useState<
    [number, number] | null
  >([0, 500])

  const [priceMin, priceMax] = searchParams
    .get('priceRange')
    ?.split(',')
    .map((value) => Number(value)) || [0, 500]

  const [open, setOpen] = useState(false)

  function handlePriceChange(value: [number, number]) {
    setState('priceRange', value.join(','))
    setTemporaryPriceRange(value)
  }

  function handleCleanFilters() {
    router.replace('/')
  }

  return (
    <>
      <div className="flex gap-2 items-center">
        <div className="lg:hidden w-full">
          <SearchProducts />
        </div>
        <Button
          onClick={() => setOpen(!open)}
          variant="outline"
          className="lg:hidden max-w-fit"
        >
          Filtros <ListFilter className="size-4 ml-2" />
        </Button>
      </div>
      <div
        className={`fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
      />
      <Sidebar
        className={`transform top-0 left-0 w-64 bg-card fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:w-auto`}
      >
        <SidebarHeader className="relative">
          <SidebarTitle>Categorias</SidebarTitle>
          <CategoryList />
          <button
            onClick={() => setOpen(false)}
            className="absolute right-0 top-0 lg:hidden"
          >
            <X />
          </button>
        </SidebarHeader>
        <SidebarMain className="space-y-4 h-full">
          <SidebarTitle>Preços</SidebarTitle>
          <SidebarItem className="max-lg:hidden">
            <SearchProducts />
          </SidebarItem>
          <SidebarItem>
            <button
              onClick={() => {
                handlePriceChange([0, 50])
              }}
            >
              De R$ 50 a R$ 100
            </button>
          </SidebarItem>
          <SidebarItem>
            <button
              onClick={() => {
                handlePriceChange([100, 150])
              }}
            >
              De R$ 100 a R$ 150
            </button>
          </SidebarItem>
          <SidebarItem>
            <button
              onClick={() => {
                handlePriceChange([150, 200])
              }}
            >
              De R$ 150 a R$ 200
            </button>
          </SidebarItem>
          <SidebarItem>
            <button
              onClick={() => {
                handlePriceChange([201, 500])
              }}
            >
              Acima de R$ 200
            </button>
          </SidebarItem>
          <SidebarItem className="mt-10">
            <div className="w-full flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span>
                  R$ {temporaryPriceRange ? temporaryPriceRange[0] : priceMin}
                </span>{' '}
                -{' '}
                <span>
                  R$ {temporaryPriceRange ? temporaryPriceRange[1] : priceMax}
                </span>
              </div>
              <PriceSlider
                max={500}
                setValue={handlePriceChange}
                onChange={setTemporaryPriceRange}
                value={[priceMin, priceMax]}
              />
            </div>
          </SidebarItem>
        </SidebarMain>
        <SidebarFooter>
          <Button onClick={handleCleanFilters} className="w-full">
            Limpar Filtros
          </Button>
        </SidebarFooter>
      </Sidebar>
    </>
  )
}
