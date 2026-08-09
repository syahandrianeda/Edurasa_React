import type { SiswaType } from "~/types/siswa";
import type { SuratKeluarAppType } from "~/types/surat/surat-keluar-app-type";
import type { DataOrmSuratKeluarType } from "./surat-orm-type";

export interface TemplateSuratSiswa<T = SuratKeluarAppType>{
    data:SiswaType,
    surat_keluar:Partial<T>
}