import type { KategoriTagihanType } from "~/domain/kategori-tagihan/types/entities/KategoriTagihanType";
import type { ValidatedResponseSiswa } from "~/types/penilaian/rekap_sementara_sheet_type";

export interface ParameterServiceSkorKdImport{
    data:ValidatedResponseSiswa[],
    jenjang:number,
    tab:KategoriTagihanType;
    keyNumeric:{[key:string]:number}
}