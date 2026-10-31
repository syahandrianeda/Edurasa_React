import type { StrukturCpType, StrukturMapeltype } from "~/domain/trees-struktur-kurikulum";
import type { CollectionNilaiTpSheet } from "./CollectionNilaiTpSheet";

export type CollectionNilaiCpSheet = StrukturCpType & {
    skorCp: number | null;
    koleksiTp: CollectionNilaiTpSheet[];
    slotCp:number
    totalCp:number|null;
    countKeyCp:number|null
};

