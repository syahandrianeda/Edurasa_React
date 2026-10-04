import type { SiswaType } from "~/types/siswa";

export interface DetailTarget {
    rombel: string;
    data_siswa: SiswaType[];
    count: number;
    current_rombel: boolean;
}
