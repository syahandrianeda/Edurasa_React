import { createCrudProvider } from "~/crud/crud-template-provider";
import type AbsensiServiceImplements from "~/infrastructures/services/absensi-service-implements";
import type { AbsensiSiswaSheetType, AbsensiSiswaType } from "~/types/absensi-siswa";

export const {
    CrudProvider:AbsensiCrudProvider,
    useCrud:useCrudAbsensi
}=createCrudProvider<AbsensiSiswaSheetType, AbsensiServiceImplements>()