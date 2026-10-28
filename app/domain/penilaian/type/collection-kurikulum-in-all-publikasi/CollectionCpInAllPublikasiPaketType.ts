import type { StrukturCpType } from "~/domain/trees-struktur-kurikulum";
import type { CollectionTpInAllPublikasiPaketType } from "./CollectionTpInAllPublikasiPaketType";

export type CollectionCpInAllPublikasiPaketType = StrukturCpType & {
    // cp_id: number;
    // cp_description: string;
    dataTp: CollectionTpInAllPublikasiPaketType[];
    slotRow: number;

};
