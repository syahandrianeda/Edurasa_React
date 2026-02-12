import { useEffect, useRef, useState } from "react"
import type { HeaderColumnOption, HeaderGeneratorOption } from "./header-column-option"


export type HeaderOption =
  | HeaderColumnOption
  | HeaderGeneratorOption

type MultipleSelectProps = {
  multiple: true
  value: HeaderColumnOption[]
  onChange: (value: HeaderColumnOption[]) => void
}

type SingleSelectProps = {
  multiple?: false
  value?: HeaderColumnOption
  onChange: (value: HeaderColumnOption | undefined) => void
}

type SelectProps = {
  options: HeaderOption[]
} & (SingleSelectProps | MultipleSelectProps)

export function WDSSelect({
  multiple,
  value,
  onChange,
  options,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  /* ------------------ CLICK OUTSIDE (KUNCI UTAMA) ------------------ */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () =>
      document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  /* ------------------ SELECT COLUMN ------------------ */
  const selectColumn = (option: HeaderColumnOption) => {
    if (multiple) {
      onChange(
        value.some(v => v.value === option.value)
          ? value.filter(v => v.value !== option.value)
          : [...value, option]
      )
    } else {
      onChange(option)
      setIsOpen(false)
    }
  }

  /* ------------------ GENERATE COLUMNS ------------------ */
  const generateColumns = (count: number) => {
    if (!multiple || count < 1) return

    const generated: HeaderColumnOption[] = Array.from(
      { length: count },
      (_, i) => ({
        type: 'column',
        label: `Kolom ${value.length + i + 1}`,
        value: `custom_${value.length + i + 1}`,
      })
    )

    onChange([...value, ...generated])
    setIsOpen(false)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full flex items-center gap-2 p-2 border rounded"
      onClick={() => setIsOpen(true)}
    >
      {/* VALUE */}
      <div className="flex flex-wrap gap-2 flex-1">
        {multiple
          ? value.map(v => (
              <span
                key={v.value}
                className="px-2 py-0.5 border rounded text-sm"
              >
                {v.label}
              </span>
            ))
          : value?.label}
      </div>

      <button
        className="text-xl text-gray-500"
        onClick={e => {
          e.stopPropagation()
          multiple ? onChange([]) : onChange(undefined)
        }}
      >
        &times;
      </button>

      {/* OPTIONS */}
      {isOpen && (
        <ul className="absolute left-0 top-full mt-1 w-full bg-white border rounded z-50">
          {options.map(option =>
            option.type === 'generator' ? (
              <GeneratorOption
                key={option.label}
                label={option.label}
                onGenerate={generateColumns}
              />
            ) : (
              <li
                key={option.value}
                onClick={e => {
                  e.stopPropagation()
                  selectColumn(option)
                }}
                className="px-2 py-1 cursor-pointer hover:bg-sky-100"
              >
                {option.label}
              </li>
            )
          )}
        </ul>
      )}
    </div>
  )
}

function GeneratorOption({
  label,
  onGenerate,
}: {
  label: string
  onGenerate: (count: number) => void
}) {
  const [count, setCount] = useState<number>(1)

  return (
    <li
      className="px-2 py-2"
      onClick={e => e.stopPropagation()}
    >
      <div className="flex items-center gap-2">
        <span className="text-sm">{label}</span>
        <input
          type="number"
          min={1}
          value={count}
          className="w-16 border rounded px-1 py-0.5"
          onClick={e => e.stopPropagation()}
          onChange={e => setCount(Number(e.target.value))}
        />
        <button
          className="text-sm px-2 py-0.5 border rounded"
          onClick={() => onGenerate(count)}
        >
          OK
        </button>
      </div>
    </li>
  )
}
