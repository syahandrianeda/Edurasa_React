import type { FormatKategoriAssesmenTable } from "../toolbar/FormatKategoriAssesmenTable";

export function namaSumber(source: FormatKategoriAssesmenTable): string {
    switch (source) {
        case 'decision':
            return 'Default';
        case 'dataServer':
            return 'Server Rekap';
        case 'responSiswa':
            return 'Respon Siswa';
        default:
            return '';

    }
}
