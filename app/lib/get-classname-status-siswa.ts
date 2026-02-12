export const classNameStatus = (aktif?: string): string => {
    
    switch (aktif) {
        case 'lulus':
        return 'text-green-900 print:text-inherit'
        case 'pindah':
        return 'text-red-500 print:text-inherit'
        case 'meninggal dunia':
        return 'text-yellow-500 print:text-inherit'
        case 'non-aktif':
        return 'text-red-500 print:text-inherit'
        default:
        return 'text-inherit'
    }
};
// utils/row.helper.ts
export function getAktif(row: unknown): string | undefined {
  if (typeof row === 'object' && row !== null && 'aktif' in row) {
    return (row as { aktif?: string }).aktif
  }
  return undefined
}

