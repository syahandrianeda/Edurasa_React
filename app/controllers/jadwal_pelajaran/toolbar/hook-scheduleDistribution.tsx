import { useMemo, useState } from 'react'
import type {
  DayKey,
  ScheduleCellData,
  ScheduleOption,
} from './schedule-type'

type TogglePayload = {
  day: DayKey
  jamKe: number
}

export function useScheduleDistribution(
  options: ScheduleOption[],
) {
  const [selectedOptionId, setSelectedOptionId] =
    useState<string>('')

  const [scheduleCells, setScheduleCells] = useState<
    ScheduleCellData[]
  >([])

  const selectedOption = useMemo(() => {
    return options.find(
      (item) => item.id === selectedOptionId,
    )
  }, [options, selectedOptionId])

  const selectedCells = useMemo(() => {
    return scheduleCells.filter(
      (item) => item.selectedId === selectedOptionId,
    )
  }, [scheduleCells, selectedOptionId])

  const totalSelected = selectedCells.length

  function getCell(day: DayKey, jamKe: number) {
    return scheduleCells.find(
      (item) =>
        item.day === day && item.jamKe === jamKe,
    )
  }

  function isCellUsed(day: DayKey, jamKe: number) {
    return !!getCell(day, jamKe)
  }

  function canSelectMore() {
    if (!selectedOption) return false

    return totalSelected < selectedOption.jp
  }

  function handleToggleCell({
    day,
    jamKe,
  }: TogglePayload) {
    if (!selectedOptionId) return

    const existingCell = getCell(day, jamKe)

    // hapus jika cell milik selected saat ini 
    if (
      existingCell &&
      existingCell.selectedId === selectedOptionId
    ) {
      setScheduleCells((prev) =>
        prev.filter(
          (item) =>
            !(
              item.day === day &&
              item.jamKe === jamKe
            ),
        ),
      )

      return
    }

    // cell sudah dipakai mapel lain
    if (existingCell) return

    // validasi jp
    if (!canSelectMore()) return

    setScheduleCells((prev) => [
      ...prev,
      {
        day,
        jamKe,
        selectedId: selectedOptionId,
      },
    ])
  }

  function isCheckboxDisabled(
    day: DayKey,
    jamKe: number,
  ) {
    if (!selectedOption) return true

    const cell = getCell(day, jamKe)

    // jika dipakai mapel lain
    if (
      cell &&
      cell.selectedId !== selectedOptionId
    ) {
      return true
    }

    // jika jp penuh
    if (
      totalSelected >= selectedOption.jp &&
      !cell
    ) {
      return true
    }

    return false
  }

  function validateAllJP() {
    return options.every((option) => {
      const total = scheduleCells.filter(
        (item) => item.selectedId === option.id,
      ).length

      return total === option.jp
    })
  }

  function generatePayload() {
    return scheduleCells.map((item) => ({
      option_id: item.selectedId,
      day: item.day,
      jam_ke: item.jamKe,
    }))
  }

  return {
    selectedOptionId,
    setSelectedOptionId,

    scheduleCells,

    selectedOption,
    selectedCells,

    totalSelected,

    getCell,
    isCellUsed,

    handleToggleCell,
    isCheckboxDisabled,

    validateAllJP,
    generatePayload,
  }
}