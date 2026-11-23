import type { StrukturAtpType, StrukturTpType, StrukturCpType } from "~/domain/trees-struktur-kurikulum";
import type { TypeStrukturRefrenceDescription } from "../../types/RaportIntarface";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";
import type { DataKdSheetApp } from "~/types/penilaian/DataKdSheetAppType";

export type KoleksiSourceSkor = {
    totalSkor: number | null;
    countInstrumen: number;
    skor: number | null;
};
export type DataCurrentInstrumen = {
    atp_id:number,
    no_soal: number,
    skor:number|null,
    skorSheetKd:number|null;
    bentuk_soal:ListBentukSoalType['name'],
    tagihan:TagihanHasDataResponse
}
export type SourceInstrumenSkor={
    tagihan:TagihanHasDataResponse,
    soalSkor:DataCurrentInstrumen[]
}
export type KoleksiStrukturWithSourceSkor = KoleksiSourceSkor & {
    type: TypeStrukturRefrenceDescription;
    struktur: StrukturAtpType | StrukturTpType | StrukturCpType;
    sourceInstrumenSkor: SourceInstrumenSkor[],//TagihanInstrumenSoalCurrentAtp[];
    sourceKoleksiSkorTiapInstrumen:(number|null)[]
    sourceItemInstrumenSkor: DataCurrentInstrumen[],
    sourceRespon:RisponsePenilaianSiswa[],
    sourceSheetKd:DataKdSheetApp[]
};

export type KoleksiSktrukturWithSourceSkorAndStateMaxMin= KoleksiStrukturWithSourceSkor & {
    isMax:boolean, 
    isMin:boolean
}

export type KoleksiStrukturInstrumenSkorUI = Omit<KoleksiSktrukturWithSourceSkorAndStateMaxMin,'strukture'> & {
    idType:number, 
    description: string
}