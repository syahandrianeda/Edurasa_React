import * as XLSX from 'xlsx';
import type { ExcelHeaderMap } from './excel-header-map';

/* =========================
 * Helper: normalize merge
 * ========================= */
function normalizeMergedRow(row: any[]): string[] {
  let lastValue: string | null = null;

  return row.map(cell => {
    if (cell !== null && cell !== undefined && String(cell).trim() !== '') {
      lastValue = String(cell).toLowerCase().trim();
      return lastValue;
    }
    return lastValue ?? '';
  });
}

/* =========================
 * Helper: build composite header
 * ========================= */
function buildCompositeHeaders(
  parentRow: any[],
  childRow: any[]
): string[] {
  const normalizedParent = normalizeMergedRow(parentRow);

  return childRow.map((child, i) => {
    const parent = normalizedParent[i];
    const c = child ? String(child).toLowerCase().trim() : '';
    return [parent, c].filter(Boolean).join(' ');
  });
}

/* =========================
 * Header detection + mapping
 * ========================= */
function detectAndMapHeader(
  rows: any[][],
  headerMap: ExcelHeaderMap[]
) {
  let bestMatch = {
    rowIndex: -1,
    matchCount: 0,
    columnKeyMap: {} as Record<number, string>,
  };

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!row) continue;

    const columnKeyMap: Record<number, string> = {};

    row.forEach((cell, colIndex) => {
      if (!cell) return;

      const cellText = String(cell).toLowerCase().trim();

      headerMap.forEach(({ key, aliases }) => {
        if (aliases.some(a => cellText === a.toLowerCase().trim())) {
          columnKeyMap[colIndex] = key;
        }
      });
    });

    const count = Object.keys(columnKeyMap).length;

    if (count > bestMatch.matchCount) {
      bestMatch = {
        rowIndex: i,
        matchCount: count,
        columnKeyMap,
      };
    }
  }

  if (bestMatch.matchCount === 0) {
    throw new Error('Header tidak ditemukan');
  }

  return {
    headerRowIndex: bestMatch.rowIndex,
    columnKeyMap: bestMatch.columnKeyMap,
  };
}


/* =========================
 * MAIN FUNCTION
 * ========================= */
export async function readExcelWithMappedHeader<T = Record<string, any>>(
  file: File,
  headerMap: ExcelHeaderMap[]
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const workbook = XLSX.read(e.target?.result, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        const rows: any[][] = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
          defval: null,
        });

        const { headerRowIndex, columnKeyMap } =
          detectAndMapHeader(rows, headerMap);

        // ⬇️ data mulai SETELAH 2 BARIS HEADER
        const dataRows = rows.slice(headerRowIndex + 2);

        const result = dataRows
          .filter(row =>
            row.some(cell => cell !== null && String(cell).trim() !== '')
          )
          .map(row => {
            const obj: Record<string, any> = {};

            Object.entries(columnKeyMap).forEach(([colIndex, key]) => {
                console.log(key);
              obj[key] = row[Number(colIndex)] ?? null;
            });

            return obj;
          });

        resolve(result as T[]);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = () => reject(new Error('Gagal membaca Excel'));
    reader.readAsArrayBuffer(file);
  });
}
