import type { KeyModelTable } from "~/components/tabels/table-interface";

export type ExcelHeaderMap<T = Record<string, unknown>> = {
  key: keyof T | 'index' ;//| string;          // key JSON final
  aliases: string[];    // kemungkinan header di Excel
  configRender: KeyModelTable<T>
  groupColumn?:string
  
};

type HeaderDetectionResult = {
    headerRowIndex: number;
    columnKeyMap: Record<number, string>; // colIndex → key
};


/* =========================
 * Helper: normalize merge
 * ========================= */
export function normalizeMergedRow(row: any[]): string[] {
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
export function buildCompositeHeaders(
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
export function detectAndMapHeader(
  rows: any[][],
  headerMap: ExcelHeaderMap[]
) {
  for (let i = 0; i < rows.length - 1; i++) {
    const parentRow = rows[i];
    const childRow = rows[i + 1];

    if (!parentRow || !childRow) continue;

    const compositeHeaders = buildCompositeHeaders(parentRow, childRow);

    const columnKeyMap: Record<number, string> = {};

    compositeHeaders.forEach((header, colIndex) => {
      headerMap.forEach(({ key, aliases }) => {
        if (
          aliases.some(a =>
            header.includes(a.toLowerCase().trim())
          )
        ) {
          columnKeyMap[colIndex] = key;
        }
      });
    });

    if (Object.keys(columnKeyMap).length > 0) {
      return {
        headerRowIndex: i,
        columnKeyMap,
      };
    }
  }

  throw new Error('Header tidak ditemukan sesuai konfigurasi');
}

export function detectAndMapHeaderLama(
    rows: any[][],
    headerMap: ExcelHeaderMap[],
    maxScanRow = 10
    ): HeaderDetectionResult {
    for (let rowIndex = 0; rowIndex < Math.min(rows.length, maxScanRow); rowIndex++) {
        const row = rows[rowIndex];
        if (!row) continue;

        const normalized = row.map(cell =>
        String(cell ?? '').toLowerCase().trim()
        );

        const columnKeyMap: Record<number, string> = {};
        let matchCount = 0;

        normalized.forEach((cellValue, colIndex) => {
        const found = headerMap.find(h =>
            h.aliases.map(a => a.toLowerCase()).includes(cellValue)
        );

        if (found) {
            columnKeyMap[colIndex] = found.key;
            matchCount++;
        }
        });

        // minimal 2 kolom cocok → dianggap header
        if (matchCount >= 2) {
        return { headerRowIndex: rowIndex, columnKeyMap };
        }
    }

    throw new Error('Header Excel tidak dikenali');
}
