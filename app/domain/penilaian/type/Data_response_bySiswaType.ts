import type { detailNilaiSiswaAppType } from "~/types/penilaian/nilai-siswa-app-type";
import type { SiswaType } from "~/types/siswa";

export interface Data_response_bySiswaType {
    siswa: SiswaType;
    data: detailNilaiSiswaAppType[];
}
