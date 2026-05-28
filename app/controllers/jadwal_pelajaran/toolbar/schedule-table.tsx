import ScheduleCell from './schedule-cell';
import ScheduleSelect from './schedule-select';
import { useScheduleDistribution } from './hook-scheduleDistribution';
import type { DayKey } from './schedule-type';
import type { ScheduleOption } from './schedule-type'
import { DAYS } from "./schedule-type"



type Props = {
  totalJam: number

  options: ScheduleOption[]

  getCell: (
    day: DayKey,
    jamKe: number,
  ) => any

  handleToggleCell: (
    payload: {
      day: DayKey
      jamKe: number
    },
  ) => void

  isCheckboxDisabled: (
    day: DayKey,
    jamKe: number,
  ) => boolean

  selectedOptionId: string
}

export default function ScheduleTable({
  totalJam,
  options,

  getCell,
  handleToggleCell,
  isCheckboxDisabled,

  selectedOptionId,
}: Props) {
  return (
    <table border={1}>
      <thead>
        <tr>
          <th>Jam Ke</th>

          {DAYS.map((day) => (
            <th key={day}>
              {day}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {Array.from({
          length: totalJam,
        }).map((_, index) => {
          const jamKe = index + 1

          return (
            <tr key={jamKe}>
              <td>{jamKe}</td>

              {DAYS.map((day) => {
                const cell = getCell(
                  day,
                  jamKe,
                )

                const option =
                  options.find(
                    (item) =>
                      item.id ===
                      cell?.selectedId,
                  )

                return (
                  <td
                    key={`${day}-${jamKe}`}
                  >
                    <ScheduleCell
                      checked={
                        !!cell &&
                        cell.selectedId ===
                          selectedOptionId
                      }
                      disabled={
                        isCheckboxDisabled(
                          day,
                          jamKe,
                        )
                      }
                      label={option?.label}
                      onChange={() =>
                        handleToggleCell({
                          day,
                          jamKe,
                        })
                      }
                    />
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}