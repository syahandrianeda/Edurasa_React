import { useMemo, useState } from "react"
import type { HeadingTableType, KeyModelTable, SortOrder } from "./table-interface"
import { compareValues, SortButton,  toggleSort } from "./table-with-scrolling"
import { TdEdura, ThEdura, TRowEdura } from "./tabel-components"
import type { SiswaWithValidation } from "~/context-reduct/selectores/data-siswa-aktif"
import type { SiswaType } from "~/types/siswa"
import TooltipComp from "../ui_edura/tooltip-comp"

export function HeadingTableWithSortValidation({
  dataHead,
  data,
  
  dataKey,
}: {
  dataHead: HeadingTableType<SiswaType>[]
  data: SiswaWithValidation[]
  
  dataKey: KeyModelTable<SiswaType>[]
}) {
  const [sortState, setSortState] = useState<SortStateSiswa>([])

  const handleSort = (
      key: keyof SiswaType,
      multi: boolean,
      resolver?: (row: SiswaType) => string | number
    ) => {
      setSortState(prev =>
        toggleSort(prev, key, multi, { resolver })
      )
    }

  // const dataRombel = useMemo(()=>{
  //   return data.filter((s:any)=>s.data.nama_rombel === rombel)
  // },[data,rombel]);
  // console.log("dataRombel",dataRombel);
  return (
        <>
        <thead>
            {dataHead.map(({ columns }, rowIndex) => (
                <tr key={rowIndex}>
                    {columns
                    // .filter((col): col is ThType<T> => Boolean(col))
                    .map((col, colIndex) => {
                        const canSort = Boolean(col.sortable && col.key);
                    const style =
                        col.width?.mode === "fixed"
                            ? { width: `${col.width.value}px` }
                            : { width: "auto" }
                        return (
                        <ThEdura
                            key={colIndex}
                            colSpan={col.colSpan ?? 1}
                            rowSpan={col.rowSpan ?? 1}
                            className={col.className ?? ''}
                            style={style}
                        >
                            <div className="flex items-center gap-1 justify-around">
                            <span>{col.label}</span>

                            {canSort && (
                                <SortButton
                                  columnKey={col.key!}
                                  label={col.label}
                                  sortState={sortState}
                                  onSort={handleSort}
                                  />
                            )}
                            </div>
                        </ThEdura>
                        );
                    })}
                </tr>
                ))}
            </thead>

            <BodyTableValidation
                data={data}
                dataKey={dataKey}
                sortState={sortState}
            />
        </>
    )
}
export function BodyTableValidation({
    data,
    dataKey,
    sortState,
}: {
    data: SiswaWithValidation[]
    dataKey: KeyModelTable<SiswaType>[]
    sortState?: SortStateSiswa
}) {
  
  const sortedData = useMemo(
    () => applySortingSiswa(data, sortState ?? []),
    [data, sortState]
  )
  
  return (
    <tbody>
      {
        sortedData.map((row:SiswaWithValidation, rowIndex) => {
          if(!row.validation.isValid){
            return (
              <TRowEdura key={rowIndex} >
                {dataKey.map((col, colIndex) => (
                  <SelTdValidation key={colIndex} row={row} rowIndex={rowIndex} col={col} />
                  
                ))} 
              </TRowEdura>
            )
          }
          return (
            <TRowEdura key={rowIndex} className={ rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50' }>
              {dataKey.map((col, colIndex) => (
                
                <TdEdura key={colIndex} className={col.className ?? ""}>
                  {col.render
                    ? col.render(row.data)
                    : col.type === 'index'
                    ? rowIndex + 1
                    : null}
                  </TdEdura>
              ))}
            </TRowEdura>
          )}
        )
      }
    </tbody>
  )
}

function SelTdValidation({row, rowIndex, col}:{
  row: SiswaWithValidation,
  rowIndex: number,
  col: KeyModelTable<SiswaType>
}) {
  const key = col?.key??"";
  function getErrorMessage():string{
    if(row.validation.errors){
      if(key === "nis" && row.validation.errors.nis){
        return row.validation.errors.nis;
      }
      if(key === "nisn" && row.validation.errors.nisn){
        return row.validation.errors.nisn;
      }
    }

    if(row.validation.duplicate?.nis || row.validation.duplicate?.nisn){
      
      if(key === "nis" && row.validation.duplicate.nis){  
        return `Duplikat dengan: ${row.validation.duplicate.nis.withNames.join(", ")}`;
      }

      if(key === "nisn" && row.validation.duplicate.nisn){
        return `Duplikat dengan: ${row.validation.duplicate.nisn.withNames.join(", ")}`;
      }

    }
    return "";
  }
  
  function getClassNameValidation():string{
    if(row.validation.errors){
      if(key === "nis" && row.validation.errors.nis){ 
        return col.className + " bg-rose-500 text-white font-bold print:bg-transparent print:font-normal";
      }
      if(key === "nisn" && row.validation.errors.nisn){
        return col.className + " bg-rose-500 text-white font-bold print:bg-transparent print:font-normal"; 

      }
    }
    if(row.validation.duplicate?.nis || row.validation.duplicate?.nisn){  
      if(key === "nis" && row.validation.duplicate.nis){ 
        return col.className + " bg-yellow-500 text-white font-bold print:bg-transparent print:font-normal";
      }
      if(key === "nisn" && row.validation.duplicate.nisn){
        return col.className + " bg-yellow-500 text-white font-bold print:bg-transparent print:font-normal";
      }
    }
    return col.className ?? "";
  }
  

  return (
    <TooltipComp content={getErrorMessage()}>
      <TdEdura className={getClassNameValidation()}>
        {
          col.render
            ? col.render(row.data)  
            : col.type === 'index'

            ? rowIndex + 1
            : null
        } 
      </TdEdura>

    </TooltipComp>
  )
}

export type SortStateSiswa = {
  key: keyof SiswaType
  order: SortOrder
  resolver?: (row: SiswaType) => string | number
}[]

export function applySortingSiswa(
  data: SiswaWithValidation[],
  sortState: SortStateSiswa
): SiswaWithValidation[] {
  if (!sortState.length) return data

  return [...data].sort((a, b) => {
    for (const { key, order, resolver } of sortState) {
      const aVal = resolver
        ? resolver(a.data)
        : a.data[key]

      const bVal = resolver
        ? resolver(b.data)
        : b.data[key]

      const result = compareValues(aVal, bVal, order)
      if (result !== 0) return result
    }
    return 0
  })
}


