import type { StrukturMapeltype } from "~/domain/trees-struktur-kurikulum";
import type { CollectionCpInAllPublikasiPaketType } from "./CollectionCpInAllPublikasiPaketType";

export type CollactionMapelInAllPublikasiPaketType = StrukturMapeltype & {
    // kodeMapel: string;
    // mapelName: string;
    dataCp: CollectionCpInAllPublikasiPaketType[];
    slotRow: number;
};
