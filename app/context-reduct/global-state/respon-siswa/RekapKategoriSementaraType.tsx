import type { ValidatedResponseSiswa } from "~/types/penilaian/rekap_sementara_sheet_type";


export type RekapKategoriSementaraType<T extends ValidatedResponseSiswa> = {
    data: T[];
    jenjang: number;
};
