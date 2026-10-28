import type { StrukturTpType } from "~/domain/trees-struktur-kurikulum";

export type CollectionNilaiAtpSheet = StrukturTpType & {
    skorAtp: number | null;
    totalAtp:number|null;
    countKeyAtp:number|null;

};
