import { useEffect, useState } from "react";
import type { FilterSumberData } from "../toolbars/state-toolbar/interface-filter-sumber-data";

interface SingleValueFilterFieldProps<T> {
  label: string
  filterKey: string
  options: readonly { value: T; label: string }[]
  filter?: FilterSumberData
  onChange: (filter: FilterSumberData | null) => void
}

export function SingleValueFilterField<T>({
  label,
  filterKey,
  options,
  filter,
  onChange
}: SingleValueFilterFieldProps<T>) {

  const enabled = !!filter
  const isExcept = filter?.operator === 'except'
  const value = filter?.value ?? ''

  return (
    <div className="relative">
      {/* enable */}
      <div className="absolute top-0 left-0 ps-2 pe-4 py-1 -translate-y-6 bg-linear-to-tl bg-sky-600 to-sky-300 has-checked:to-amber-200 rounded-t-xl">
        <label className="flex gap-2 text-xs items-center">
          <input
            type="checkbox"
            checked={enabled}
            onChange={e =>
              onChange(
                e.target.checked
                  ? {
                      key: filterKey,
                      value: '',
                      operator: 'equal',
                      label
                    }
                  : null
              )
            }
          />
          {label}
        </label>
      </div>

      {/* except */}
      <div className="absolute top-0 right-0 ps-4 pe-2 py-1 -translate-y-6 bg-linear-to-tl bg-sky-600 to-sky-300 has-checked:to-amber-200 rounded-t-xl">
        <label className="flex gap-2 text-xs items-center">
          Kecuali
          <input
            type="checkbox"
            disabled={!enabled}
            checked={isExcept}
            onChange={e =>
              filter &&
              onChange({
                ...filter,
                operator: e.target.checked ? 'except' : 'equal'
              })
            }
          />
        </label>
      </div>

      <select
        disabled={!enabled}
        value={value as any}
        onChange={e =>
          filter &&
          onChange({
            ...filter,
            value: e.target.value as T
          })
        }
        className="bg-white text-black p-2 rounded-b-sm text-center w-full disabled:opacity-50"
      >
        <option value="">Pilih {label}</option>
        {options.map(o => (
          <option key={String(o.value)} value={o.value as any}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

interface MultiSelectFilterFieldProps<T> {
  label: string
  filterKey: string
  options: readonly { value: T; label: string }[]
  filter?: FilterSumberData
  onChange: (filter: FilterSumberData | null) => void
}
export function MultiSelectFilterField<T>({
  label,
  filterKey,
  options,
  filter,
  onChange
}: MultiSelectFilterFieldProps<T>) {

  // 🔑 enabled = NIAT USER (UI state)
  const [enabled, setEnabled] = useState<boolean>(() => !!filter)
  const open = enabled?'open':'close';
  // 🔒 hanya sync saat filter benar-benar dihapus dari luar
  useEffect(() => {
    if (!filter) {
      setEnabled(false)
    }
  }, [filter])

  const values = Array.isArray(filter?.value) ? filter.value : []

  const toggleValue = (v: T) => {
    if (!enabled || !filter) return

    const nextValues = values.includes(v)
      ? values.filter(x => x !== v)
      : [...values, v]

    onChange({
      ...filter,
      value: nextValues
    })
  }

  return (
    <div className="relative">
      {/* Header checkbox */}
      <div className="absolute top-0 left-0 ps-2 pe-4 py-1 -translate-y-6 bg-linear-to-tl bg-sky-600 to-sky-300 has-checked:to-amber-200 rounded-t-xl">
        <label className="flex gap-2 text-xs items-center">
          <input
            type="checkbox"
            checked={enabled}
            onChange={e => {
              const checked = e.target.checked
              setEnabled(checked)

              onChange(
                checked
                  ? {
                      key: filterKey,
                      operator: 'includes',
                      value: [],
                      label
                    }
                  : null
              )
            }}
          />
          {label}
        </label>
      </div>

      {/* Options */}
      <div 
          data-select={open}
          className="border rounded-b-sm p-2 bg-white text-black data-[select=close]:h-8 data-[select=open]:max-h-52 overflow-auto scrol-h-custom">
        {options.map(o => (
          <label
            key={String(o.value)}
            className="flex items-start justify-start gap-2 text-sm cursor-pointer"
          >
            <input
              type="checkbox"
              disabled={!enabled}   
              className="self-center"
              checked={values.includes(o.value)}
              onChange={() => toggleValue(o.value)}
            />
            <span className="truncate">
                {o.label}
                </span>
          </label>
        ))}
      </div>
    </div>
  )
}
