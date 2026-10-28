import type { KategoriTagihanType } from "~/domain/kategori-tagihan/types/entities/KategoriTagihanType";
import type { StrukturKurikulumInKategoriAssesmenInterface } from "./StrukturKurikulumInKategoriAssesmenInterface";

export interface StrukturKurikulumInKategoriAssesmen{
    type:KategoriTagihanType,
    strukturKurikulum:StrukturKurikulumInKategoriAssesmenInterface[],
}

;