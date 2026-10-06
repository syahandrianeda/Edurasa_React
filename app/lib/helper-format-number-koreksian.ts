import type { NilaiSiswaSheetType } from "~/types/penilaian/nilai-siswa-sheet-type";

export function helperFormatNumberInResponTagihan(param: NilaiSiswaSheetType) {
        const result: Record<string, string> = {};

        for (const key in param) {
            if (/^skor_\d+$/.test(key)) {
                result[key] = 'number'//Number(param[key]);
            }
        }

        return result;
    }

export function helperFormatNumberInKategoriTagihan( param: Record<string, any> ) {
            const result: Record<string, 'number'> = {};

            for (const key in param) {
                if (/^.+_.+_\d+_\d+$/.test(key)) {
                    result[key] = 'number';
                }
            }

            return result;
        }