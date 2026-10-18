import type { KategoriTagihanType } from "~/domain/penilaian/type/KategoriTagihanType";
import type { ValidatedResponseSiswa } from "~/types/penilaian/rekap_sementara_sheet_type";

export interface ParameterServiceSkorKdImport{
    data:ValidatedResponseSiswa[],
    jenjang:number,
    tab:KategoriTagihanType;
    keyNumeric:{[key:string]:number}
}