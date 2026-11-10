import type { StrukturMapeltype } from "~/domain/trees-struktur-kurikulum";
import type { CollectionCpInAllPublikasiPaketType } from "./CollectionCpInAllPublikasiPaketType";

/** 
 * type ini berisikan struktur kurikulum dengan design composite;
 * tiap cabang memiliki properti `slotRow`;
 */
export type CollactionMapelInAllPublikasiPaketType = StrukturMapeltype & {
    // kodeMapel: string;
    // mapelName: string;
    dataCp: CollectionCpInAllPublikasiPaketType[];
    slotRow: number;
};
