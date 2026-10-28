import type { StrukturCpInterface } from "~/domain/trees-struktur-kurikulum";
import type { CollectionNilaiTp } from "./CollectionNilaiTp";

export interface CollectionNilaiCp extends StrukturCpInterface{
    totalCp: number|null;
    skorCp: number|null;
    countSoalCp: number|null;
    koleksiTp: CollectionNilaiTp[]
}

