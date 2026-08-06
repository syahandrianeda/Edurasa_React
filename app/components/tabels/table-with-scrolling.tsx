import { TableEdura, TdEdura, ThEdura, TRowEdura } from "./tabel-components";
import { useSyncedTableScroll } from "~/hooks/use-sync-table-sroll";
import type { HeadingTableType, KeyModelTable, SortState, ThType } from "./table-interface";
import { useMemo, useState, type ReactNode } from "react";
import ButtonTooltip from "../ui_edura/button-tooltip";
import { cn } from "~/lib/utils";
import { classNameStatus } from "~/lib/get-classname-status-siswa";

export default function TableWithScrolling({children, className}:{children:ReactNode,className?:string}){
    const { topScrollRef,
            bottomScrollRef,
            tableContainerRef,
            tableWidth
            } = useSyncedTableScroll()

    return (
        <div className="relative">
                <div ref={topScrollRef}
                    className="sticky top-13 z-10 overflow-x-auto scrol-h-custom print:hidden" >
                    <div style={{ width: tableWidth+'px', height: 1 }}className="cursor-move"/>
                </div>
                <div
                    ref={bottomScrollRef}
                    className="overflow-x-auto scrol-h-custom print:overflow-visible"
                >
                    <div ref={tableContainerRef} >
                        <TableEdura className={cn("text-xs w-full bg-white leading-normal select-none",className)}>
                            {children}
                        </TableEdura>
                    </div>
            </div>
        </div>
    )
}

export function HeadingTableEdura<T>({dataHead, }:{dataHead: HeadingTableType<T>[]}){
    
    return (
            <thead>
                {
                    dataHead.map(({columns}, index)=>(
                        <tr key={index}>
                            {
                                columns.map((m, i)=>(
                                    <ThEdura 
                                        key={i}
                                        colSpan={m.colSpan ?? 1}
                                        rowSpan={m.rowSpan ?? 1}
                                        className={m.className??""}
                                        >
                                            {m.label}
                                            
                                            
                                        </ThEdura>
                                ))
                            }
                        </tr>
                    ))
                }
            </thead>
        
    )
}

export function HeadingTableEduraWithSort<T >({
  dataHead,
  data,
  dataKey,
}: {
  dataHead: HeadingTableType<T>[]
  data: T[]
  dataKey: KeyModelTable<T>[]
}) {
  const [sortState, setSortState] = useState<SortState<T>>([])

  const handleSort = (key: keyof T, multi: boolean, resolver?: (row: T) => string | number) => {
    setSortState(prev => toggleSort(prev, key, multi,{resolver}))
  }

  return (
    <>
      <thead>
        {
          dataHead.map(({ columns }, rowIndex) => (
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
          ))
        }
      </thead>

      <BodyTableEdura<T>
        data={data}
        dataKey={dataKey}
        sortState={sortState}
      />
    </>
  )
}
export function BodyTableEdura<T>({
  data,
  dataKey,
  sortState,
}: {
  data: T[]
  dataKey: KeyModelTable<T>[]
  sortState?: SortState<T>
}) {
  const sortedData = useMemo(
    () => applySorting(data, sortState ?? []),
    [data, sortState]
  )
  
  return (
    <tbody>
      {sortedData.map((row:T, rowIndex) => (
        <TRowEdura key={rowIndex} className={classNameStatus((row as { aktif?: string })?.aktif)}>
          {dataKey.map((col, colIndex) => (
            <TdEdura key={colIndex} className={col.className ?? ""}>
              {col.render
                ? col.render(row)
                : col.type === 'index'
                ? rowIndex + 1
                : null}
            </TdEdura>
          ))}
        </TRowEdura>
      ))}
    </tbody>
  )
}

export type SortButtonProps<T> = {
    columnKey: keyof T
    sortState: SortState<T>
    label: string,
    onSort: (key: keyof T, multi: boolean) => void
}

export function SortButton<T>({
    columnKey,
    label,
    sortState,
    onSort
    }: SortButtonProps<T>) {
    const state = sortState.find(s => s.key === columnKey)

    return (
            <ButtonTooltip asChild tooltip={"Urutkan "} className="p-1 print:hidden rounded hover:bg-muted w-auto">
            <button
            type="button"
            
            onClick={(e) => onSort(columnKey, true)}
            aria-label={`Sort by ${String(columnKey)}`}
            >
            {!state && '⇅'}
            {state?.order === 'asc' && '↑'}
            {state?.order === 'desc' && '↓'}

            {state && (
                <sup className="ml-0.5 text-xs">
                    {sortState.findIndex(s => s.key === columnKey) + 1}
                </sup>
            )}
            </button>
            </ButtonTooltip>
            
    )
}


export function toggleSort<T>(
  prev: SortState<T>,
  key: keyof T,
  multi = false,
  options?: { resolver?: (row: T) => string | number }
): SortState<T> {
  const existing = prev.find(s => s.key === key)

  let next: SortState<T>

  if (!existing) {
    next = [...prev, {
      key,
      order: 'asc',
      resolver: options?.resolver
    }]
  } else if (existing.order === 'asc') {
    next = prev.map(s =>
      s.key === key
        ? { ...s, order: 'desc' }
        : s
    )
  } else {
    next = prev.filter(s => s.key !== key)
  }

  return multi ? next : next.slice(-1)
}
// return [...data].sort((a, b) => {
  //   for (const { key, order, resolver } of sortState) {
  //     const aVal = resolver ? resolver(a) : a[key]
  //     const bVal = resolver ? resolver(b) : b[key]

  //     if (aVal === bVal) continue

  //     if (aVal > bVal) return order === 'asc' ? 1 : -1
  //     if (aVal < bVal) return order === 'asc' ? -1 : 1
  //   }
  //   return 0})
export function applySorting<T>(
  data: T[],
  sortState: SortState<T>
): T[] {
  if (!sortState.length) return data

  
  return [...data].sort((a, b) => {
    for (const { key, order, resolver } of sortState) {
      const aVal = resolver ? resolver(a) : a[key]
      const bVal = resolver ? resolver(b) : b[key]

      const result = compareValues(aVal, bVal, order)
      if (result !== 0) return result
    }
    return 0
  })
}

export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime())
}

export function compareValues(
  a: unknown,
  b: unknown,
  order: 'asc' | 'desc'
): number {
  // =========================
  // NULL & UNDEFINED
  // =========================
  if (a == null && b == null) return 0
  if (a == null) return order === 'asc' ? 1 : -1
  if (b == null) return order === 'asc' ? -1 : 1

  // =========================
  // DATE
  // =========================
  if (isValidDate(a) && isValidDate(b)) {
    const diff = a.getTime() - b.getTime()
    return order === 'asc' ? diff : -diff
  }

  // =========================
  // NUMBER
  // =========================
  if (typeof a === 'number' && typeof b === 'number') {
    return order === 'asc' ? a - b : b - a
  }

  // =========================
  // STRING
  // =========================
  if (typeof a === 'string' && typeof b === 'string') {
    const result = a.localeCompare(b);
    // const result = a.localeCompare(b, 'id', {
    //   numeric: true,
    //   sensitivity: 'base',
    // })
    return order === 'asc' ? result : -result
  }

  // =========================
  // DATE STRING (OPTIONAL BONUS)
  // =========================
  if (typeof a === 'string' && typeof b === 'string') {
    const da = new Date(a)
    const db = new Date(b)
    if (isValidDate(da) && isValidDate(db)) {
      const diff = da.getTime() - db.getTime()
      return order === 'asc' ? diff : -diff
    }
  }

  // =========================
  // FALLBACK
  // =========================
  if (a > b) return order === 'asc' ? 1 : -1
  if (a < b) return order === 'asc' ? -1 : 1

  return 0
}



