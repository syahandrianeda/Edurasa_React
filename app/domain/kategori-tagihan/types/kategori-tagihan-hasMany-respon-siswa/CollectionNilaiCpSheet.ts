import type { StrukturMapeltype } from "~/domain/trees-struktur-kurikulum";
import type { CollectionNilaiTpSheet } from "./CollectionNilaiTpSheet";

export type CollectionNilaiCpSheet = StrukturMapeltype & {
    skorCp: number | null;
    koleksiTp: CollectionNilaiTpSheet[];
    totalCp:number|null;
    countKeyCp:number|null
};

