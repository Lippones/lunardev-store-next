import Slider from 'react-slider'

interface PriceSliderProps {
  value: [number, number]
  setValue: (value: [number, number]) => void
  onChange?: (value: [number, number]) => void
  min?: number
  max?: number
}

export function PriceSlider({
  setValue,
  value,
  max = 10000,
  min = 0,
  onChange,
}: PriceSliderProps) {
  return (
    <Slider
      className="w-full h-1 bg-zinc-200 rounded [&>*:nth-child(2)]:bg-primary" // Selects the second element, which is the active bar
      value={value}
      min={min}
      max={max}
      onAfterChange={setValue}
      onChange={onChange}
      thumbClassName="size-4 -top-1.5 bg-primary rounded-full focus:outline-none focus:ring ring-violet-300"
      trackClassName="h-1 rounded-full"
    />
  )
}
