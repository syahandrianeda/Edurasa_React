import { MultiSelectFilterField, SingleValueFilterField } from "~/components/fields/kriteria-select";
import { applyFilters, type FilterSumberData } from "./interface-filter-sumber-data";
import { useFilterContext } from "./state-toolbar";
import { AgamaMeta } from "~/types/enums/agama";
import { GenderMeta } from "~/types/enums/gender";
import { DataRombelUI } from "~/domain/rombel/data-rombel";
import { useAppSelector } from "~/context-reduct/hook";
import { selectAllSiswaDTO } from "~/context-reduct/selectores/data-siswa-aktif";
import { useMemo } from "react";



const DataOpsiStatus = [
    {
        value: 'aktif',
        label: 'Aktif'
    },
    {
        value: 'non-aktif',
        label: 'Non Aktif'
    },
    {
        value: 'pindah',
        label: 'Pindah/Mutasi'
    },
    {
        value: 'lulus',
        label: 'Lulus'
    },
    {
        value: 'meninggal dunia',
        label: 'Meninggal Dunia'
    },
    
]

const DataOpsiAgama = Object.entries(AgamaMeta).map(([key,value])=>({
    value: key,
    label: value?.label
})) 
const GenderOption = Object.entries(GenderMeta).map(([key,value])=>({
    value: key,
    label: value?.label
})) 
const DataOpsiRombel = DataRombelUI.map(m=>({
    value:m.rombelName,
    label:m.rombelName
})) 

const DataOpsiRombelAktif = DataRombelUI.filter(s=>s.active).map(m=>({
    value:m.rombelName,
    label:m.rombelName
})) 


function getFilter(
  filters: FilterSumberData[] | undefined,
  key: string
) {
  return filters?.find(f => f.key === key)
}

function updateFilters(
  filters: FilterSumberData[] | undefined,
  key: string,
  next: FilterSumberData | null
): FilterSumberData[] | undefined {
  const base = filters ?? []
  const cleaned = base.filter(f => f.key !== key)

  if (!next) return cleaned.length ? cleaned : undefined
  return [...cleaned, next]
}
function splitFilters<T>(
  filters: FilterSumberData[] = [],
  siswaKey: keyof T
) {
  return {
    nonSiswa: filters.filter(f => f.key !== siswaKey),
    siswa: filters.find(f => f.key === siswaKey),
  }
}
export function KriteriaFilterToolbar() {
  const { value, setValue } = useFilterContext()
  const siswa = useAppSelector(selectAllSiswaDTO)

  const filters = value.filterSumberData

  const setFilter = (key: string, next: FilterSumberData | null) => {
    const updateFilter = updateFilters(filters, key, next);
    setValue({
      filterSumberData: updateFilter,//updateFilters(filters, key, next)
      dataFilterToolbar:updateFilter && applyFilters(siswa,updateFilter)
    })
  }

  const { nonSiswa, siswa: siswaFilter } = useMemo(
    () => splitFilters(filters, 'pd_nama'),
    [filters]
  )

  const siswaFilteredForOption = useMemo(
    () => applyFilters(siswa, nonSiswa),
    [siswa, nonSiswa]
  )
  
  const opsiSiswa = useMemo(
    () =>
      siswaFilteredForOption.map(s => ({
        label: s.pd_nama,
        value: s.id,
      })),
    [siswaFilteredForOption]
  );

  const userSelectOptionActif = value?.filterSumberData?.find(s=>s.key==='aktif' && s.value==='aktif');
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-8 w-full">

      <SingleValueFilterField
        label="Status"
        filterKey="aktif"
        options={DataOpsiStatus}
        filter={getFilter(filters, 'aktif')}
        onChange={f => setFilter('aktif', f)}
      />

      <SingleValueFilterField
        label="Agama"
        filterKey="pd_agama"
        options={DataOpsiAgama}
        filter={getFilter(filters, 'pd_agama')}
        onChange={f => setFilter('pd_agama', f)}
      />

      <SingleValueFilterField
        label="Gender"
        filterKey="pd_jk"
        options={GenderOption}
        filter={getFilter(filters, 'pd_jk')}
        onChange={f => setFilter('pd_jk', f)} 
        
      />

      <SingleValueFilterField
        label="Kelas"
        filterKey="nama_rombel"
        options={userSelectOptionActif ?DataOpsiRombelAktif : DataOpsiRombel}
        filter={getFilter(filters, 'nama_rombel')}
        onChange={f => setFilter('nama_rombel', f)}
      />

      <MultiSelectFilterField<number>
        label="Seleksi Beberapa Siswa"
        filterKey="pd_nama"
        filter={siswaFilter}
        options={opsiSiswa}
        onChange={f => setFilter('pd_nama', f)} 
      />
    </div>
  )
}

