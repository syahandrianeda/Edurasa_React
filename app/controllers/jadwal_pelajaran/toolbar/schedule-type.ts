export type DayKey =
  | 'senin'
  | 'selasa'
  | 'rabu'
  | 'kamis'
  | 'jumat'
  | 'sabtu'

export type ScheduleOption = {
  id: string
  label: string
  type: 'MAPEL' | 'KEGIATAN'
  jp: number
}

export type ScheduleCellData = {
  day: DayKey
  jamKe: number
  selectedId: string
}

export const DAYS: DayKey[] = [
  'senin',
  'selasa',
  'rabu',
  'kamis',
  'jumat',
]