import type { StrukturAtpType, StrukturTpType } from "~/domain/trees-struktur-kurikulum";

export type CollectionNilaiAtpSheet = StrukturAtpType & {
    skorAtp: number | null;
    totalAtp:number|null;
    countKeyAtp:number|null;

};
