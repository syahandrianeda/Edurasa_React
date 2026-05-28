type Props = {
  checked: boolean
  disabled: boolean
  label?: string

  onChange: () => void
}

export default function ScheduleCell({
  checked,
  disabled,
  label,
  onChange,
}: Props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />

      {label && (
        <small>
          {label}
        </small>
      )}
    </div>
  )
}