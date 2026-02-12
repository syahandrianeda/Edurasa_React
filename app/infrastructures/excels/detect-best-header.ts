import type { ExcelHeaderMap } from "./excel-header-map";

export function detectBestHeaderRow(
    rows: any[][],
    headerMap: ExcelHeaderMap[],
    maxScan = 10
    ) {
    let best = { rowIndex: -1, matchCount: 0, columnKeyMap: {} };

    rows.slice(0, maxScan).forEach((row, rowIndex) => {
        const normalized = row.map(c =>
        String(c ?? '').toLowerCase().trim()
        );

        const columnKeyMap: Record<number, string> = {};
        let matchCount = 0;

        normalized.forEach((cell, colIndex) => {
        const found = headerMap.find(h =>
            h.aliases.includes(cell)
        );
        if (found) {
            columnKeyMap[colIndex] = found.key;
            matchCount++;
        }
        });

        if (matchCount > best.matchCount) {
        best = { rowIndex, matchCount, columnKeyMap };
        }
    });

    if (best.matchCount < 2) {
        throw new Error('Header final tidak ditemukan');
    }

    return best;
}

function buildCompositeHeaders(rows: any[][], headerRows: number[]) {
    const headers: string[] = [];

    headerRows.forEach(rowIndex => {
        rows[rowIndex].forEach((cell, colIndex) => {
        const value = String(cell ?? '').trim();
        if (value) {
            headers[colIndex] = headers[colIndex]
            ? `${headers[colIndex]} ${value}`
            : value;
        }
        });
    });

    return headers.map(h => h?.toLowerCase());
}
