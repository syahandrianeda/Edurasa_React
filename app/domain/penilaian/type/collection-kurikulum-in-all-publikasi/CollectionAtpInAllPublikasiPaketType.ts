import type { StrukturAtpType } from "~/domain/trees-struktur-kurikulum";
import type { DataPublikasiPerTipeAssesmenType } from "./DataPublikasiPerTipeAssesmenType";

export type CollectionAtpInAllPublikasiPaketType = StrukturAtpType & {
    // atp_id: number;
    // atp_description: string;
    dataTipeAssesmen: DataPublikasiPerTipeAssesmenType[];
};
