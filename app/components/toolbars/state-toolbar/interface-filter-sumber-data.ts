
export interface FilterSumberData  {
    key: string,
    value:unknown,
    operator:'equal'|'except'|'includes'
    label?: string
}

export function  evaluateFilter<T>(
  row: T,
  filter: FilterSumberData,
): boolean {
    const keyResolve = filter.key === 'pd_nama'?'id':filter.key
    const fieldValue = (row as any)[keyResolve];//[filter.key];

    const { value, operator } = filter

    switch (operator) {
        case 'equal':
        return fieldValue === value

        case 'except':
        return fieldValue !== value

        case 'includes':
          if (Array.isArray(value)) {
              return value.includes(fieldValue)
          }
          return false

        default:
        return true
    }
}

export function applyFilters<T>(
  sourceData: T[],
  filters: FilterSumberData[]
): T[] {
  if (!filters.length) return []

  return sourceData.filter(row =>
    filters.every(filter => evaluateFilter(row, filter))
  )
}

