import type { StrukturTpInterface } from "~/domain/trees-struktur-kurikulum";
import type { CollectionNilaiAtp } from "./CollectionNilaiAtp";

export interface CollectionNilaiTp extends StrukturTpInterface {
    totalTp: number|null;
    skorTp: number|null;
    slotTp:number
    countSoalTp: number|null;
    koleksiAtp: CollectionNilaiAtp[]
}

