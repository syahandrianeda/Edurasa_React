import type { KategoriTagihanType } from "~/domain/kategori-tagihan/types/entities/KategoriTagihanType";
import type { TagihanHasDataResponse } from "../../type/tagihan-assesmen-type";
import type { DataInstrumenPerKategoriAssesmen } from "./StrukturKurikulumInKategoriAssesmenInterface";

export type StrukturKurikulumInKategoriAssesmenMapperInterface      = Map<KategoriTagihanType,{strukturKurikulumMapper:StrukturMapelInKategoriAssesmenMapperInterface}>;
export type StrukturMapelInKategoriAssesmenMapperInterface          = Map<string,{mapelName:string, kodeMapel:string, dataCpMapper: StrukturCpInKategoriAssesmenAssesmenMapperInterface}>;
export type StrukturCpInKategoriAssesmenAssesmenMapperInterface     = Map<number,{cp_id:number, cp_description:string, dataTpMapper: StrukturTpInKategoriAssesmenMapperInterface}>;
export type StrukturTpInKategoriAssesmenMapperInterface             = Map<number,{tp_id:number, tp_description:string, dataAtpMapper: StrukturAtpInKategoriAssesmenMapperInterface}>;
export type StrukturAtpInKategoriAssesmenMapperInterface            = Map<number,{atp_id:number, atp_description:string, dataTagihan: DataInstrumenPerKategoriAssesmen[]}>
// export type DataTagihanInKategoriAssesmenMapperInterface            = Map<KategoriTagihanType, {dataInstrumen: TagihanHasDataResponse[]}>
// interface dataTagihan{
//     kategori            : KategoriTagihanType
//     dataInstrumen       : dataInstrumen[]
//     // dataInstrumen       : TagihanHasDataResponse[]
// }
// interface dataTagihanMap{
//     kategori            : KategoriTagihanType
//     // dataInstrumen       : dataInstrumen[]
//     dataInstrumen       : TagihanHasDataResponse[]
// }
// interface dataInstrumen{
//     identitas           : string
//     countInstrumen      : number
//     // indexInstrumen      : number[]
//     skor                : number
// }

