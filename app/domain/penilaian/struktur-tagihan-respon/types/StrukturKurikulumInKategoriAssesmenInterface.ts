import type { KategoriTagihanType } from "~/domain/kategori-tagihan/types/entities/KategoriTagihanType";
import type { StrukturAtpInterface, StrukturCpInterface, StrukturMapelInterface, StrukturTpInterface } from "~/domain/trees-struktur-kurikulum";
import type { TagihanHasDataResponse } from "../../type/tagihan-assesmen-type";



// export interface StrukturKurikulumInKategoriAssesmenInterface extends SebaranTagihanAssesmenKurikulumType { }
export interface StrukturKurikulumInKategoriAssesmenInterface extends StrukturMapelInterface{
    slotMapel:number,
    dataCp: StrukturCpInKategoriAssesmenAssesmenInterface[]
}

export interface StrukturCpInKategoriAssesmenAssesmenInterface extends StrukturCpInterface{
    slotCp              : number,
    dataTp              : StrukturTpInKategoriAssesmenInterface[]
}
export interface StrukturTpInKategoriAssesmenInterface extends StrukturTpInterface{
    slotTp              : number,
    dataAtp             : StrukturAtpInKategoriAssesmenInterface[];
}
export interface StrukturAtpInKategoriAssesmenInterface extends StrukturAtpInterface{
    slotAtp             : number,
    dataTagihan         : DataInstrumenPerKategoriAssesmen[]
}
export interface DataInstrumenPerKategoriAssesmen{
    kategori            : KategoriTagihanType
    dataInstrumen       : dataInstrumen[]
    // dataInstrumen       : TagihanHasDataResponse[]
}
interface dataTagihanMap{
    kategori            : KategoriTagihanType
    // dataInstrumen       : dataInstrumen[]
    dataInstrumen       : TagihanHasDataResponse[]
}
interface dataInstrumen{
    identitas           : string
    countInstrumen      : number
    // indexInstrumen      : number[]
    skor                : number
}

