import { Grid2x2, Grid3X3 } from 'lucide-react'

export function SelectGrid() {
  return (
    <div className="flex gap-2">
      <button>
        <Grid3X3 className="size-6 text-violet-600" />
      </button>
      <button>
        <Grid2x2 className="size-6" />
      </button>
    </div>
  )
}
