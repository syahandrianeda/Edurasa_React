import type { StrukturCpType } from "~/domain/trees-struktur-kurikulum";
import type { CollectionNilaiAtpSheet } from "./CollectionNilaiAtpSheet";

export type CollectionNilaiTpSheet = StrukturCpType & {
    totalTp:number|null;
    countKeyTp:number|null
    skorTp: number | null;
    koleksiTp: CollectionNilaiAtpSheet[];
};

