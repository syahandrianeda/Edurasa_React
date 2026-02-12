import * as XLSX from 'xlsx';
import { detectHeaderRow } from './detect-header-excel';
import {detectAndMapHeader, detectAndMapHeaderLama, type ExcelHeaderMap } from './excel-header-map';

import type { HeadingTableType, KeyModelTable } from '~/components/tabels/table-interface';


export type HeaderFileExcelToUI = {
  label:string,
  colSpan?:number,
  rowSpan?:number,
  column?:number
}
export type ExcelParseResult<T = Record<string, any>> = {
  sheetName: string;
  data: T[];
  property?:HeadingTableType<T>[],
  render?:KeyModelTable<T>[]
};

export function readExcelFileToJson<T = Record<string, any>>(
  file: File
): Promise<ExcelParseResult<T>> {
  return new Promise((resolve, reject) => {
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ];

    if (!allowedTypes.includes(file.type)) {
      reject(new Error('File harus berupa Excel (.xls atau .xlsx)'));
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const json = XLSX.utils.sheet_to_json<T>(worksheet, {
          defval: null, // cell kosong → null (penting!)
          raw: false,
        });
        
        resolve({
          sheetName,
          data: json,
        });
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Gagal membaca file'));
    };

    reader.readAsArrayBuffer(file);
  });
}

export function readExcelWithDynamicHeader<T = Record<string, any>>(
  file: File,
  expectedHeaders: string[]
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

        const { headerRowIndex, headers } = detectHeaderRow(
          rows,
          expectedHeaders
        );

        const dataRows = rows.slice(headerRowIndex + 1);

        const json = dataRows
          .filter((row) => row.some((cell) => cell !== null))
          .map((row) => {
            const obj: Record<string, any> = {};
            headers.forEach((header, idx) => {
              if (header) obj[header] = row[idx] ?? null;
            });
            return obj;
          });

        resolve(json as T[]);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = () => reject(new Error('Gagal membaca file Excel'));
    reader.readAsArrayBuffer(file);
  });
}


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
          detectAndMapHeaderLama(rows, headerMap);

        const dataRows = rows.slice(headerRowIndex + 2);

        const result = dataRows
            .filter(row => row.some(cell => cell !== null && String(cell).trim() !== ''))
            .map(row => {
                const obj: Record<string, any> = {};

                Object.entries(columnKeyMap).forEach(([colIndex, key]) => {
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

export async function readExcelWithMappedHeaderTwoHeader<T = Record<string, any>>(
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
          detectAndMapHeaderLama(rows, headerMap);

        const result = rows
          .map((row, index) => {
            // ⛔ skip header row
            if (index <= headerRowIndex) return null;

            // ⛔ skip empty row
            if (!row.some(cell => cell !== null && String(cell).trim() !== '')) {
              return null;
            }

            const obj: Record<string, any> = {};

            Object.entries(columnKeyMap).forEach(([colIndex, key]) => {
              obj[key] = row[Number(colIndex)] ?? null;
            });

            return obj;
          })
          .filter(Boolean);

        resolve(result as T[]);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = () => reject(new Error('Gagal membaca Excel'));
    reader.readAsArrayBuffer(file);
  });
}

