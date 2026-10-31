import type { StrukturCpType, StrukturTpType } from "~/domain/trees-struktur-kurikulum";
import type { CollectionNilaiAtpSheet } from "./CollectionNilaiAtpSheet";

export type CollectionNilaiTpSheet = StrukturTpType & {
    totalTp:number|null;
    countKeyTp:number|null
    slotTp:number
    skorTp: number | null;
    koleksiAtp: CollectionNilaiAtpSheet[];
};

