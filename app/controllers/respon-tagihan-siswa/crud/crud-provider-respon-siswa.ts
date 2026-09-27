import { createCrudProvider } from "~/crud/crud-template-provider";
import type { ResponNilaiSiswaServiceInterface } from "~/domain/interfaces/respon-nilai-siswa-service-interface";
import type AbsensiServiceImplements from "~/infrastructures/services/absensi-service-implements";
import type { AbsensiSiswaSheetType } from "~/types/absensi-siswa";
import type { NilaiSiswaSheetType } from "~/types/penilaian/nilai-siswa-sheet-type";

export const {
    CrudProvider:CrudResponTagihanSiswa,
    useCrud:useCrudResponTagihanSiswa
}=createCrudProvider<NilaiSiswaSheetType, ResponNilaiSiswaServiceInterface>()