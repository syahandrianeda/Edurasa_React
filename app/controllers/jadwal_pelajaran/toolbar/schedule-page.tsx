import scheduleSelect from './schedule-select'
import ScheduleTable from './schedule-table'
import ScheduleSelect from './schedule-select'
import { useScheduleDistribution } from './hook-scheduleDistribution'
import type { ScheduleOption } from './schedule-type'
import { DAYS } from './schedule-type'  

// import ScheduleSelect from '../components/Schedule/ScheduleSelect'
// import ScheduleTable from '../components/Schedule/ScheduleTable'

// import { useScheduleDistribution } from '../hooks/useScheduleDistribution'

// import { ScheduleOption } from '../types/schedule'

const OPTIONS: ScheduleOption[] = [
  {
    id: 'mapel-1',
    label: 'Matematika',
    type: 'MAPEL',
    jp: 4,
  },

  {
    id: 'mapel-2',
    label: 'Bahasa Indonesia',
    type: 'MAPEL',
    jp: 3,
  },

  {
    id: 'kegiatan-1',
    label: 'Upacara',
    type: 'KEGIATAN',
    jp: 1,
  },
]

export default function SchedulePage() {
  const {
    selectedOptionId,
    setSelectedOptionId,

    selectedOption,

    totalSelected,

    getCell,

    handleToggleCell,
    isCheckboxDisabled,

    validateAllJP,
    generatePayload,
  } =
    useScheduleDistribution(
      OPTIONS,
    )

  function handleSubmit() {
    const isValid =
      validateAllJP()

    if (!isValid) {
      alert(
        'Masih ada JP yang belum terpenuhi',
      )

      return
    }

    console.log(
      generatePayload(),
    )

    alert('Submit berhasil')
  }

  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <h1>
        Distribusi Jadwal
      </h1>

      <ScheduleSelect
        options={OPTIONS}
        value={
          selectedOptionId
        }
        onChange={
          setSelectedOptionId
        }
      />

      {selectedOption && (
        <div
          style={{
            marginTop: 12,
            marginBottom: 12,
          }}
        >
          <strong>
            {
              selectedOption.label
            }
          </strong>

          <div>
            {totalSelected} /{' '}
            {selectedOption.jp} JP
          </div>
        </div>
      )}

      <ScheduleTable
        totalJam={8}
        options={OPTIONS}
        getCell={getCell}
        handleToggleCell={
          handleToggleCell
        }
        isCheckboxDisabled={
          isCheckboxDisabled
        }
        selectedOptionId={
          selectedOptionId
        }
      />

      <button
        onClick={
          handleSubmit
        }
        style={{
          marginTop: 20,
        }}
      >
        Submit
      </button>
    </div>
  )
}