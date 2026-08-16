import type { InfoPersonalPtk } from "~/types/akun-sheet";
import type { SerahTerimaDokumenAppType } from "~/types/galleries/serah-terima-dokumen-app-type";
import type { TransaksiSerahTerimaDokumenAppType } from "~/types/galleries/transaksi-serah-terima-dokumen";
import type { InfoPersonalSiswa } from "~/types/siswa";

export interface TransaksiEventType{
    person:InfoPersonalPtk|InfoPersonalSiswa,
    transaksi:TransaksiSerahTerimaDokumenAppType[]
    event:SerahTerimaDokumenAppType
}