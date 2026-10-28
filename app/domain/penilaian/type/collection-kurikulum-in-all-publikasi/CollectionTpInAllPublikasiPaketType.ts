import type { StrukturTpType } from "~/domain/trees-struktur-kurikulum";
import type { CollectionAtpInAllPublikasiPaketType } from "./CollectionAtpInAllPublikasiPaketType";

export type CollectionTpInAllPublikasiPaketType = StrukturTpType & {
    // tp_id: number;
    // tp_description: string;
    dataAtp: CollectionAtpInAllPublikasiPaketType[];
    slotRow: number;
};
