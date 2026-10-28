import type { DataSkorSiswaByInstrumenType } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/DataSkorSiswaByInstrumenType";
import type { StrukturAtpInterface } from "~/domain/trees-struktur-kurikulum";

export interface CollectionNilaiAtp extends StrukturAtpInterface {
    totalAtp: number|null
    skorAtp: number|null
    countSoalAtp: number|null
    detail: DataSkorSiswaByInstrumenType[]
}
