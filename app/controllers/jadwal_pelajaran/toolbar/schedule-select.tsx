import { type ScheduleOption } from './schedule-type'

type Props = {
  options: ScheduleOption[]
  value: string
  onChange: (value: string) => void
}

export default function ScheduleSelect({
  options,
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
    >
      <option value="">
        Pilih Mata Pelajaran
      </option>

      {options.map((item) => (
        <option
          key={item.id}
          value={item.id}
        >
          {item.label} ({item.jp} JP)
        </option>
      ))}
    </select>
  )
}