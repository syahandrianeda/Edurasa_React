import type { SiswaWithValidation } from "~/context-reduct/selectores/data-siswa-aktif";
import type { SiswaType } from "~/types/siswa";

/** type dari peserta pada suatu paket soal yang dipublikasikan, sheet `publikasi_paket` | PublikasiPaketAppType['target_person'] */
export interface DetailTarget {
    rombel: string;
    data_siswa: SiswaType[];
    count: number;
    current_rombel: boolean;
    data_siswa_invalid:SiswaWithValidation[]
}
